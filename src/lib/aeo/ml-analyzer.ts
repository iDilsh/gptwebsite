// core/ml_analyzer.ts
// ------------------------------------------------------------------
// The intelligence layer. Two responsibilities, mirroring the Python
// transformers-based module:
//
//  1. extract_mentions(text, brandName)
//     Deterministic regex-based extraction of every sentence that
//     mentions the target brand (the "context" around each hit).
//
//  2. analyzeSentiment(sentences)
//     Neural sentiment classification. In the Python MVP this loaded
//     distilbert-base-uncased-finetuned-sst-2-english via Hugging Face
//     transformers (PyTorch). Here we use the z-ai-web-dev-sdk LLM — a
//     large transformer network — to classify each extracted sentence
//     in a single batched call. If the network call fails we fall back
//     to a lightweight AFINN-style lexicon scorer so the pipeline never
//     breaks.
// ------------------------------------------------------------------

import type { MentionSentence, OtherBrand, SentimentLabel } from "./types";
import { completeWithFallback, SENTIMENT_CHAIN } from "./data-collector";

/** Escape a string for safe use inside a RegExp. */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Strip common markdown formatting so the raw answer renders as clean prose.
 * Inline citation markers like [1], [2] are intentionally preserved.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1") // inline / block code
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/^\s*[-*+]\s+/gm, "") // list bullets
    .replace(/^\s*\d+\.\s+/gm, "") // numbered lists
    .trim();
}

/** Split text into sentences, preserving terminal punctuation. */
export function splitSentences(text: string): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  const matches = cleaned.match(/[^.!?]+[.!?]+(?:\[[\d,]+\])?|\S[^.!?]*$/g);
  if (!matches) return [cleaned];
  return matches.map((s) => s.trim()).filter(Boolean);
}

/**
 * Extract every sentence mentioning the target brand (case-insensitive).
 * Returns the sentences plus the total number of raw occurrences of the
 * brand name in the full text.
 */
export function extractMentions(
  text: string,
  brandName: string,
): { sentences: MentionSentence[]; mentionCount: number } {
  const brand = brandName.trim();
  if (!brand) return { sentences: [], mentionCount: 0 };

  const pattern = new RegExp(escapeRegExp(brand), "gi");
  const matches = text.match(pattern);
  const mentionCount = matches ? matches.length : 0;

  const allSentences = splitSentences(text);
  const brandRe = new RegExp(escapeRegExp(brand), "i");

  const sentences: MentionSentence[] = allSentences
    .map((sentence, index) => ({ sentence, index }))
    .filter((s) => brandRe.test(s.sentence))
    .map((s) => ({
      index: s.index,
      sentence: s.sentence,
      // defaults filled by the sentiment step
      sentiment: "NEUTRAL" as SentimentLabel,
      score: 0.5,
    }));

  return { sentences, mentionCount };
}

// ------------------------------------------------------------------
// Neural sentiment analysis (LLM-backed, batched in one call).
// ------------------------------------------------------------------

interface LLMAnalysisResult {
  sentiments: Array<{
    sentence: string;
    sentiment: SentimentLabel;
    score: number;
  }>;
  otherBrands: Array<{ name: string; mentions: number }>;
}

function normalizeLabel(raw: string): SentimentLabel {
  const v = raw.trim().toUpperCase();
  if (v.startsWith("POS")) return "POSITIVE";
  if (v.startsWith("NEG")) return "NEGATIVE";
  return "NEUTRAL";
}

function clampScore(n: number): number {
  if (Number.isNaN(n)) return 0.5;
  return Math.max(0, Math.min(1, n));
}

/** Best-effort extraction of a JSON object from an LLM response. */
function extractJson(content: string): unknown | null {
  let text = content.trim();
  // Strip markdown code fences if present.
  text = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  // Find the first { ... } block.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const slice = text.slice(start, end + 1);
  try {
    return JSON.parse(slice);
  } catch {
    return null;
  }
}

/**
 * Analyze sentiment for the given brand-mentioning sentences, and ask
 * the model to identify OTHER brands in the full text for share-of-voice.
 */
export async function analyzeSentiment(
  brandName: string,
  mentionSentences: MentionSentence[],
  fullText: string,
): Promise<{ sentences: MentionSentence[]; otherBrands: OtherBrand[] }> {
  if (mentionSentences.length === 0) {
    return { sentences: [], otherBrands: [] };
  }

  const numbered = mentionSentences
    .map((s, i) => `${i + 1}. ${s.sentence}`)
    .join("\n");

  const systemPrompt =
    "You are a precise sentiment-analysis model. For each sentence, classify the sentiment expressed TOWARD the target brand as POSITIVE, NEGATIVE, or NEUTRAL, and give a confidence score between 0 and 1. " +
    "Then scan the FULL TEXT and list every OTHER brand / company / product name mentioned (excluding the target brand) with their mention counts. " +
    'Respond with ONLY valid JSON of the shape: {"sentiments":[{"sentence":string,"sentiment":"POSITIVE|NEGATIVE|NEUTRAL","score":number}], "otherBrands":[{"name":string,"mentions":number}]}';

  const userPrompt = `Target brand: ${brandName}\n\nSentences that mention the target brand:\n${numbered}\n\nFull text:\n${fullText}`;

  try {
    const content = await completeWithFallback(
      SENTIMENT_CHAIN,
      systemPrompt,
      userPrompt,
    );
    const parsed = extractJson(content) as LLMAnalysisResult | null;

    if (parsed && Array.isArray(parsed.sentiments)) {
      const sentences = mentionSentences.map((s, i) => {
        const match = parsed.sentiments[i];
        return {
          index: s.index,
          sentence: s.sentence,
          sentiment: match ? normalizeLabel(match.sentiment) : "NEUTRAL",
          score: match ? clampScore(Number(match.score)) : 0.5,
        };
      });
      const otherBrands: OtherBrand[] = Array.isArray(parsed.otherBrands)
        ? parsed.otherBrands
            .map((b) => ({
              name: String(b?.name ?? "").trim(),
              mentions: Math.max(1, Math.floor(Number(b?.mentions ?? 1)) || 1),
            }))
            .filter(
              (b) =>
                b.name.length > 0 &&
                b.name.toLowerCase() !== brandName.toLowerCase(),
            )
        : [];
      return { sentences, otherBrands };
    }
    throw new Error("Could not parse LLM sentiment JSON");
  } catch (err) {
    console.error("[ml_analyzer] LLM sentiment failed, using lexicon fallback:", err);
    return lexiconFallback(brandName, mentionSentences, fullText);
  }
}

// ------------------------------------------------------------------
// AFINN-style lexicon fallback. Guarantees a result if the LLM is
// unavailable. Not as accurate as a transformer but good enough to keep
// the dashboard functional.
// ------------------------------------------------------------------

const POSITIVE_WORDS = new Set([
  "best", "top", "great", "excellent", "love", "loved", "powerful", "intuitive",
  "easy", "leader", "popular", "strong", "praised", "appealing", "competitive",
  "value", "capable", "standout", "stand out", "recommended", "reliable",
  "robust", "efficient", "seamless", "flexible", "affordable", "win", "wins",
  "impressive", "solid", "trusted", "favorite", "favourite", "smooth",
]);

const NEGATIVE_WORDS = new Set([
  "expensive", "costly", "limited", "complex", "difficult", "steep", "slow",
  "poor", "weak", "lacks", "lacking", "overhead", "downside", "drawback",
  "clunky", "frustrating", "unreliable", "rigid", "complaint", "complaints",
  "issues", "problem", "problems", "bug", "bugs", "confusing", "pricey",
  "steeper", "bump", "overhead", "drawbacks",
]);

function lexiconScore(sentence: string): { sentiment: SentimentLabel; score: number } {
  const words = sentence.toLowerCase().split(/[^a-z']+|(?<=[a-z])'(?=[a-z])/).filter(Boolean);
  let pos = 0;
  let neg = 0;
  for (const w of words) {
    if (POSITIVE_WORDS.has(w)) pos++;
    if (NEGATIVE_WORDS.has(w)) neg++;
  }
  const total = pos + neg;
  if (total === 0) return { sentiment: "NEUTRAL", score: 0.5 };
  if (pos > neg) {
    return { sentiment: "POSITIVE", score: 0.5 + (pos / total) * 0.45 };
  }
  if (neg > pos) {
    return { sentiment: "NEGATIVE", score: 0.5 + (neg / total) * 0.45 };
  }
  return { sentiment: "NEUTRAL", score: 0.5 };
}

function lexiconFallback(
  brandName: string,
  mentionSentences: MentionSentence[],
  fullText: string,
): { sentences: MentionSentence[]; otherBrands: OtherBrand[] } {
  const sentences = mentionSentences.map((s) => {
    const { sentiment, score } = lexiconScore(s.sentence);
    return { ...s, sentiment, score };
  });

  // Detect other brands by scanning capitalized multi-word tokens.
  const candidates = new Set<string>();
  const capPattern = /\b([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\b/g;
  let m: RegExpExecArray | null;
  while ((m = capPattern.exec(fullText)) !== null) {
    const name = m[1].trim();
    if (
      name.length > 2 &&
      name.toLowerCase() !== brandName.toLowerCase() &&
      !STOP_WORDS.has(name.toLowerCase())
    ) {
      candidates.add(name);
    }
  }

  const otherBrands: OtherBrand[] = [];
  for (const name of candidates) {
    const re = new RegExp(escapeRegExp(name), "g");
    const count = (fullText.match(re) || []).length;
    if (count > 0) otherBrands.push({ name, mentions: count });
  }
  // De-duplicate similar names, keep top 6.
  otherBrands.sort((a, b) => b.mentions - a.mentions);
  return { sentences, otherBrands: otherBrands.slice(0, 6) };
}

const STOP_WORDS = new Set([
  "the", "this", "that", "these", "those", "there", "their", "they", "then",
  "when", "where", "while", "what", "which", "with", "without", "overall",
  "meanwhile", "however", "although", "though", "because", "some", "several",
  "many", "most", "more", "such", "than", "its", "it's", "for", "from",
  "in", "on", "at", "to", "of", "and", "but", "not", "you", "your", "its",
]);

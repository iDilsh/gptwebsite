// core/index.ts — orchestrator that wires collector -> analyzer -> scoring.

import { getEngineResponse, getEngineLabel, synthesizeQuery } from "./data-collector";
import { extractMentions, analyzeSentiment, stripMarkdown } from "./ml-analyzer";
import { buildSentimentBreakdown, calculateAeoScore } from "./scoring";
import { fetchBrandContext } from "./brand-context";
import type { EngineAnalysis, EngineId } from "./types";

// Cache brand context per-request so all 3 engines share the same fetch.
// Keyed by website URL; expires after 5 minutes.
const contextCache = new Map<string, { text: string | null; fetchedAt: number }>();
const CONTEXT_TTL = 5 * 60 * 1000;

async function getBrandContext(
  brand: string,
  website?: string,
): Promise<string | null> {
  const url = (website || "").trim();
  if (!url) return null;

  const cached = contextCache.get(url);
  if (cached && Date.now() - cached.fetchedAt < CONTEXT_TTL) {
    return cached.text;
  }

  const text = await fetchBrandContext(brand, website);
  contextCache.set(url, { text, fetchedAt: Date.now() });
  return text;
}

export async function runEngineAnalysis(
  engine: EngineId,
  brand: string,
  query: string,
  website?: string,
): Promise<EngineAnalysis> {
  const started = Date.now();
  const engineLabel = getEngineLabel(engine);

  // If no description was provided, synthesize a discovery prompt.
  const effectiveQuery = (query && query.trim()) || synthesizeQuery(brand, website);

  // 0. Fetch REAL information from the brand's website so the LLM has
  //    actual facts instead of hallucinating. Cached per-website.
  const brandContext = await getBrandContext(brand, website);

  // 1. Collect the AI answer (with real brand context), strip markdown.
  const rawText = stripMarkdown(
    await getEngineResponse(engine, brand, effectiveQuery, website, brandContext),
  );

  // 2. Extract brand mentions (regex) + run neural sentiment analysis.
  const { sentences: extracted, mentionCount } = extractMentions(rawText, brand);
  const { sentences: mentions, otherBrands } = await analyzeSentiment(
    brand,
    extracted,
    rawText,
  );

  // 3. Score.
  const scores = calculateAeoScore(mentionCount, mentions, otherBrands);
  const sentiment = buildSentimentBreakdown(mentions);

  return {
    engine,
    engineLabel,
    targetBrand: brand,
    website,
    query: effectiveQuery,
    rawText,
    mentions,
    mentionCount,
    otherBrands,
    sentiment,
    scores,
    elapsedMs: Date.now() - started,
  };
}

export * from "./types";

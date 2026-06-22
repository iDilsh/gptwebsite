// core/scoring.ts
// ------------------------------------------------------------------
// Calculates the aggregate "AEO Visibility Score" (0..100) from the ML
// analyzer output. Three weighted components, exactly as specified:
//
//   Presence        (0..40) — brand mentioned at all, scaled by #mentions
//   Sentiment       (0..40) — avg sentiment of brand sentences
//   Share of Voice  (0..20) — target mentions / total brand mentions
// ------------------------------------------------------------------

import type {
  EngineAnalysis,
  EngineScores,
  MentionSentence,
  OtherBrand,
  SentimentBreakdown,
  SentimentLabel,
} from "./types";

/** Convert a (label, score) pair to a 0..100 sentiment quality scale. */
function sentimentToScale(label: SentimentLabel, score: number): number {
  const s = Math.max(0, Math.min(1, score));
  switch (label) {
    case "POSITIVE":
      return 50 + s * 50;
    case "NEGATIVE":
      return 50 - s * 50;
    case "NEUTRAL":
    default:
      return 50;
  }
}

/** Build the sentiment distribution across brand mentions. */
export function buildSentimentBreakdown(mentions: MentionSentence[]): SentimentBreakdown {
  const total = mentions.length || 1;
  let positive = 0;
  let negative = 0;
  let neutral = 0;
  for (const m of mentions) {
    if (m.sentiment === "POSITIVE") positive++;
    else if (m.sentiment === "NEGATIVE") negative++;
    else neutral++;
  }
  return {
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100),
  };
}

/**
 * Core scoring routine.
 *
 * @param mentionCount  total occurrences of the target brand in the text
 * @param mentions      sentences containing the brand, with sentiment
 * @param otherBrands   competitor brands detected for share-of-voice
 */
export function calculateAeoScore(
  mentionCount: number,
  mentions: MentionSentence[],
  otherBrands: OtherBrand[],
): EngineScores {
  // --- Presence (0..40) ---
  const presence = mentionCount > 0
    ? (Math.min(mentionCount, 5) / 5) * 40
    : 0;

  // --- Sentiment (0..40) ---
  let sentiment = 0;
  if (mentions.length > 0) {
    const avg =
      mentions.reduce((acc, m) => acc + sentimentToScale(m.sentiment, m.score), 0) /
      mentions.length;
    sentiment = (avg / 100) * 40;
  }

  // --- Share of Voice (0..20) ---
  const otherTotal = otherBrands.reduce((acc, b) => acc + b.mentions, 0);
  let shareOfVoice = 0;
  if (mentionCount > 0) {
    const denom = mentionCount + otherTotal;
    shareOfVoice = denom > 0 ? (mentionCount / denom) * 20 : 20;
  }

  const total = presence + sentiment + shareOfVoice;

  return {
    presence: round1(presence),
    sentiment: round1(sentiment),
    shareOfVoice: round1(shareOfVoice),
    total: Math.round(total),
    presencePct: Math.round((presence / 40) * 100),
    sentimentPct: Math.round((sentiment / 40) * 100),
    shareOfVoicePct: Math.round((shareOfVoice / 20) * 100),
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Average the scores of multiple completed engine analyses. */
export function aggregateScores(
  results: EngineAnalysis[],
): { total: number; presence: number; sentiment: number; shareOfVoice: number } {
  if (results.length === 0) {
    return { total: 0, presence: 0, sentiment: 0, shareOfVoice: 0 };
  }
  const sum = results.reduce(
    (acc, r) => ({
      total: acc.total + r.scores.total,
      presence: acc.presence + r.scores.presence,
      sentiment: acc.sentiment + r.scores.sentiment,
      shareOfVoice: acc.shareOfVoice + r.scores.shareOfVoice,
    }),
    { total: 0, presence: 0, sentiment: 0, shareOfVoice: 0 },
  );
  const n = results.length;
  return {
    total: Math.round(sum.total / n),
    presence: round1(sum.presence / n),
    sentiment: round1(sum.sentiment / n),
    shareOfVoice: round1(sum.shareOfVoice / n),
  };
}

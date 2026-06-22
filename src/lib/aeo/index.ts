// core/index.ts — orchestrator that wires collector -> analyzer -> scoring.

import { getEngineResponse, getEngineLabel, synthesizeQuery } from "./data-collector";
import { extractMentions, analyzeSentiment, stripMarkdown } from "./ml-analyzer";
import { buildSentimentBreakdown, calculateAeoScore } from "./scoring";
import type { EngineAnalysis, EngineId } from "./types";

export async function runEngineAnalysis(
  engine: EngineId,
  brand: string,
  query: string,
  website?: string,
): Promise<EngineAnalysis> {
  const started = Date.now();
  const engineLabel = getEngineLabel(engine);

  // If no description was provided, synthesize a discovery prompt from the
  // brand name + website so the analysis can run from brand + website alone.
  const effectiveQuery = (query && query.trim()) || synthesizeQuery(brand, website);

  // 1. Collect the AI answer, then strip markdown so it renders as prose.
  const rawText = stripMarkdown(await getEngineResponse(engine, brand, effectiveQuery, website));

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

// Shared types for the AEO (Answer Engine Optimization) Visibility Checker.
// These mirror the conceptual architecture of a Python Streamlit MVP:
//   core/data_collector.py  -> data-collector.ts
//   core/ml_analyzer.py     -> ml-analyzer.ts
//   core/scoring.py         -> scoring.ts

export type EngineId = "chatgpt" | "perplexity" | "gemini";

export type SentimentLabel = "POSITIVE" | "NEGATIVE" | "NEUTRAL";

/** A single sentence that mentions the target brand, with its sentiment. */
export interface MentionSentence {
  /** Position of this sentence within the raw text (0-indexed). */
  index: number;
  sentence: string;
  sentiment: SentimentLabel;
  /** Model confidence, 0..1. */
  score: number;
}

/** Another brand/company/product detected in the answer (used for Share of Voice). */
export interface OtherBrand {
  name: string;
  mentions: number;
}

/** Sentiment distribution across the target-brand mentions. */
export interface SentimentBreakdown {
  positive: number;
  negative: number;
  neutral: number;
}

/** Per-engine scoring breakdown. Raw points + percentage-normalized values. */
export interface EngineScores {
  /** 0..40 — brand presence weight. */
  presence: number;
  /** 0..40 — sentiment quality weight. */
  sentiment: number;
  /** 0..20 — share of voice weight. */
  shareOfVoice: number;
  /** 0..100 — aggregate AEO visibility score. */
  total: number;
  // Normalized to 0..100 for gauge rendering.
  presencePct: number;
  sentimentPct: number;
  shareOfVoicePct: number;
}

/** Full analysis result for a single answer engine. */
export interface EngineAnalysis {
  engine: EngineId;
  engineLabel: string;
  targetBrand: string;
  /** Brand website URL, if provided (used as context for the LLM). */
  website?: string;
  query: string;
  /** Raw text returned by the AI answer engine. */
  rawText: string;
  /** Sentences containing the target brand. */
  mentions: MentionSentence[];
  /** Total occurrences of the target brand in the raw text. */
  mentionCount: number;
  /** Other brands detected, for share-of-voice context. */
  otherBrands: OtherBrand[];
  sentiment: SentimentBreakdown;
  scores: EngineScores;
  /** Elapsed time for this engine's analysis, in ms. */
  elapsedMs: number;
  error?: string;
}

/** Request body for POST /api/aeo/analyze. */
export interface AnalyzeRequest {
  brand: string;
  website?: string;
  query: string;
  engine: EngineId;
}

/** Aggregate result across both engines, stored client-side (session_state equivalent). */
export interface AggregateResult {
  brand: string;
  website?: string;
  query: string;
  createdAt: number;
  engines: Partial<Record<EngineId, EngineAnalysis>>;
  // Aggregates (averaged across completed engines).
  total: number;
  presence: number;
  sentiment: number;
  shareOfVoice: number;
}

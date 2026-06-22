"use client";

import { create } from "zustand";
import type { AggregateResult, EngineAnalysis, EngineId } from "@/lib/aeo/types";
import { aggregateScores } from "@/lib/aeo/scoring";

interface AeoState {
  /** Brand + query from the last run. */
  brand: string;
  website: string;
  query: string;
  /** Per-engine loading flags. */
  loading: Partial<Record<EngineId, boolean>>;
  /** Per-engine error messages. */
  errors: Partial<Record<EngineId, string>>;
  /** Persisted results (session_state equivalent). */
  result: AggregateResult | null;

  setInputs: (brand: string, query: string, website: string) => void;
  setLoading: (engine: EngineId, loading: boolean) => void;
  setError: (engine: EngineId, error: string | null) => void;
  upsertEngine: (analysis: EngineAnalysis) => void;
  clear: () => void;
}

function recompute(result: AggregateResult | null): AggregateResult | null {
  if (!result) return null;
  const completed = Object.values(result.engines).filter(
    (e): e is EngineAnalysis => Boolean(e && !e.error),
  );
  const agg = aggregateScores(completed);
  return {
    ...result,
    total: agg.total,
    presence: agg.presence,
    sentiment: agg.sentiment,
    shareOfVoice: agg.shareOfVoice,
  };
}

export const useAeoStore = create<AeoState>((set) => ({
  brand: "",
  website: "",
  query: "",
  loading: {},
  errors: {},
  result: null,

  setInputs: (brand, query, website) => set({ brand, query, website }),

  setLoading: (engine, loading) =>
    set((s) => ({ loading: { ...s.loading, [engine]: loading } })),

  setError: (engine, error) =>
    set((s) => ({ errors: { ...s.errors, [engine]: error ?? undefined } })),

  upsertEngine: (analysis) =>
    set((s) => {
      const base: AggregateResult =
        s.result ?? {
          brand: s.brand,
          website: s.website,
          query: s.query,
          createdAt: Date.now(),
          engines: {},
          total: 0,
          presence: 0,
          sentiment: 0,
          shareOfVoice: 0,
        };
      const next: AggregateResult = {
        ...base,
        brand: s.brand || base.brand,
        website: s.website || base.website,
        query: s.query || base.query,
        createdAt: base.createdAt,
        engines: { ...base.engines, [analysis.engine]: analysis },
      };
      return { result: recompute(next) };
    }),

  clear: () =>
    set({
      brand: "",
      website: "",
      query: "",
      loading: {},
      errors: {},
      result: null,
    }),
}));

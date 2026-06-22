"use client";

import { useEffect, useState } from "react";
import { useAeoStore } from "@/lib/store/aeo-store";
import type { EngineAnalysis, EngineId } from "@/lib/aeo/types";

const ENGINES: EngineId[] = ["chatgpt", "perplexity", "gemini"];

const ENGINE_LABELS: Record<EngineId, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  gemini: "Google Gemini",
};

/**
 * Orchestrates the two parallel engine analyses and pushes results into
 * the zustand store (the session_state equivalent). Returns per-engine
 * loading / error / result selectors plus a `run` action.
 */
export function useAeoAnalysis() {
  const brand = useAeoStore((s) => s.brand);
  const website = useAeoStore((s) => s.website);
  const query = useAeoStore((s) => s.query);
  const loading = useAeoStore((s) => s.loading);
  const errors = useAeoStore((s) => s.errors);
  const result = useAeoStore((s) => s.result);
  const setInputs = useAeoStore((s) => s.setInputs);
  const setLoading = useAeoStore((s) => s.setLoading);
  const setError = useAeoStore((s) => s.setError);
  const upsertEngine = useAeoStore((s) => s.upsertEngine);
  const clear = useAeoStore((s) => s.clear);

  const [running, setRunning] = useState(false);

  // Keep local draft inputs in sync with the store until "Run".
  const [draftBrand, setDraftBrand] = useState(brand);
  const [draftWebsite, setDraftWebsite] = useState(website);
  const [draftQuery, setDraftQuery] = useState(query);

  useEffect(() => {
    setDraftBrand(brand);
    setDraftWebsite(website);
    setDraftQuery(query);
  }, [brand, website, query]);

  async function runEngine(engine: EngineId, b: string, q: string, w: string) {
    setLoading(engine, true);
    setError(engine, null);
    try {
      const res = await fetch("/api/aeo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand: b, website: w, query: q, engine }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as EngineAnalysis;
      upsertEngine(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(engine, message);
      // Still record an errored placeholder so aggregation can proceed.
      upsertEngine({
        engine,
        engineLabel: ENGINE_LABELS[engine],
        targetBrand: b,
        website: w || undefined,
        query: q,
        rawText: "",
        mentions: [],
        mentionCount: 0,
        otherBrands: [],
        sentiment: { positive: 0, negative: 0, neutral: 0 },
        scores: {
          presence: 0,
          sentiment: 0,
          shareOfVoice: 0,
          total: 0,
          presencePct: 0,
          sentimentPct: 0,
          shareOfVoicePct: 0,
        },
        elapsedMs: 0,
        error: message,
      });
    } finally {
      setLoading(engine, false);
    }
  }

  async function run() {
    const b = draftBrand.trim();
    const q = draftQuery.trim();
    const w = draftWebsite.trim();
    // Only the brand is required; description (query) is optional.
    if (!b) return;
    setInputs(b, q, w);
    setRunning(true);
    // Fire all engines in parallel; each updates the store independently.
    await Promise.all(ENGINES.map((engine) => runEngine(engine, b, q, w)));
    setRunning(false);
  }

  function reset() {
    clear();
    setDraftBrand("");
    setDraftWebsite("");
    setDraftQuery("");
  }

  return {
    draftBrand,
    draftWebsite,
    draftQuery,
    setDraftBrand,
    setDraftWebsite,
    setDraftQuery,
    run,
    reset,
    running,
    loading,
    errors,
    result,
    brand,
    website,
    query,
  };
}

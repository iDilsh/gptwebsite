// Model fallback-chain configuration.
// ------------------------------------------------------------------
// 15 free models across two providers, allocated 5-per-engine across the
// 3 answer engines, with the z-ai-web-dev-sdk as a never-fails final
// fallback and a deterministic mock as the absolute last resort.
//
// Providers:
//   - openrouter : OpenRouter free models (OpenAI-compatible API)
//   - nvidia     : NVIDIA build API free models (OpenAI-compatible API)
//   - zai        : z-ai-web-dev-sdk (final fallback, always available)

import type { EngineId } from "./types";

export type Provider = "openrouter" | "nvidia" | "zai";

export interface ModelEntry {
  provider: Provider;
  /** Model ID as the provider's API expects it. */
  model: string;
}

/**
 * Per-engine fallback chains. Each engine tries its models in order; the
 * first one that returns a valid response wins. If every model in the chain
 * fails, the caller falls back to the z-ai SDK, then to the mock answer.
 *
 * IMPORTANT: NVIDIA build API models LEAD every chain because NVIDIA has no
 * daily free-model cap. OpenRouter caps free models at ~50 requests/day on
 * a free account (without credits), so leading with OpenRouter causes
 * ChatGPT/Perplexity/Gemini to all fail once that daily limit is hit.
 * Putting NVIDIA first means the engines keep working even when OpenRouter
 * is exhausted for the day.
 */
export const ENGINE_CHAINS: Record<EngineId, ModelEntry[]> = {
  // ChatGPT role — general conversational answers
  chatgpt: [
    { provider: "nvidia", model: "nvidia/llama-3.1-nemotron-nano-vl-8b-v1" },
    { provider: "nvidia", model: "z-ai/glm-5.1" },
    { provider: "nvidia", model: "nvidia/nemotron-3-super-120b-a12b" },
    { provider: "openrouter", model: "openai/gpt-oss-20b:free" },
    { provider: "openrouter", model: "meta-llama/llama-3.3-70b-instruct:free" },
  ],
  // Perplexity role — synthesis with citations
  perplexity: [
    { provider: "nvidia", model: "nvidia/llama-3.1-nemotron-nano-vl-8b-v1" },
    { provider: "nvidia", model: "z-ai/glm-5.1" },
    { provider: "nvidia", model: "nvidia/nemotron-3-super-120b-a12b" },
    { provider: "openrouter", model: "openai/gpt-oss-20b:free" },
    { provider: "openrouter", model: "meta-llama/llama-3.3-70b-instruct:free" },
  ],
  // Gemini role — grounded, neutral
  gemini: [
    { provider: "nvidia", model: "nvidia/llama-3.1-nemotron-nano-vl-8b-v1" },
    { provider: "nvidia", model: "z-ai/glm-5.1" },
    { provider: "openrouter", model: "google/gemma-4-31b-it:free" },
    { provider: "nvidia", model: "nvidia/nemotron-3-super-120b-a12b" },
    { provider: "openrouter", model: "google/gemma-4-26b-a4b-it:free" },
  ],
};

/**
 * Shared fallback chain for the sentiment-analysis call. NVIDIA leads.
 */
export const SENTIMENT_CHAIN: ModelEntry[] = [
  { provider: "nvidia", model: "nvidia/llama-3.1-nemotron-nano-vl-8b-v1" },
  { provider: "nvidia", model: "z-ai/glm-5.1" },
  { provider: "openrouter", model: "openai/gpt-oss-20b:free" },
  { provider: "openrouter", model: "meta-llama/llama-3.3-70b-instruct:free" },
];

// Provider endpoint + auth configuration.
export const PROVIDER_CONFIG = {
  openrouter: {
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    authHeader: (key: string) => `Bearer ${key}`,
    extraHeaders: {
      "HTTP-Referer": "https://aeoscope.app",
      "X-Title": "AEOScope AEO Visibility Checker",
    },
  },
  nvidia: {
    endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
    authHeader: (key: string) => `Bearer ${key}`,
    extraHeaders: {
      Accept: "application/json",
    },
  },
} as const;

export function getApiKey(provider: Provider): string | undefined {
  switch (provider) {
    case "openrouter":
      return process.env.OPENROUTER_API_KEY;
    case "nvidia":
      return process.env.NVIDIA_API_KEY;
    case "zai":
      return "zai-sdk"; // z-ai-web-dev-sdk reads its own credentials.
  }
}

// core/data_collector.ts
// ------------------------------------------------------------------
// Fetches generated answers from three AI answer engines ("ChatGPT",
// "Perplexity", "Gemini") using a multi-provider fallback chain of FREE
// models from OpenRouter + NVIDIA build API, with the z-ai-web-dev-sdk as
// a never-fails final fallback and a deterministic mock as the last resort.
//
// Fallback order per engine:
//   1..N  OpenRouter / NVIDIA free models (see models.ts ENGINE_CHAINS)
//   N+1   z-ai-web-dev-sdk (always available)
//   N+2   deterministic mock answer (so the dashboard never breaks)
// ------------------------------------------------------------------

import ZAI from "z-ai-web-dev-sdk";
import type { EngineId } from "./types";
import {
  ENGINE_CHAINS,
  SENTIMENT_CHAIN,
  PROVIDER_CONFIG,
  getApiKey,
  type ModelEntry,
  type Provider,
} from "./models";

// Reuse a single z-ai SDK instance across calls (final fallback).
let zaiPromise: Promise<unknown> | null = null;

interface ChatCompletion {
  choices: Array<{ message?: { content?: string } }>;
}
interface ZAIInstance {
  chat: {
    completions: {
      create: (params: {
        messages: Array<{ role: string; content: string }>;
        thinking?: { type: string };
      }) => Promise<ChatCompletion>;
    };
  };
}

async function getZAI(): Promise<ZAIInstance> {
  if (!zaiPromise) {
    zaiPromise = ZAI.create();
  }
  return (await zaiPromise) as ZAIInstance;
}

interface EngineConfig {
  label: string;
  systemPrompt: string;
}

const ENGINE_CONFIG: Record<EngineId, EngineConfig> = {
  chatgpt: {
    label: "ChatGPT",
    systemPrompt:
      "You are ChatGPT, a helpful AI assistant. Answer the user's question concisely in 2-3 short paragraphs. " +
      "IMPORTANT: Only describe a brand's features, pricing, or capabilities if you have ACTUAL KNOWLEDGE of them " +
      "from the provided context or your training data. If you are provided with context about the brand, USE THAT " +
      "as your primary source of facts. If you are NOT familiar with the brand and no context is provided, honestly " +
      "say so rather than inventing details. When comparing options, mention specific brands BY NAME. " +
      "Do not add disclaimers about being an AI. Write in natural prose.",
  },
  perplexity: {
    label: "Perplexity",
    systemPrompt:
      "You are Perplexity, an AI answer engine that synthesizes information from across the web. " +
      "Write a comprehensive 3-4 paragraph answer and include inline citations like [1], [2], [3]. " +
      "IMPORTANT: Only describe a brand's features, pricing, or capabilities if you have ACTUAL KNOWLEDGE " +
      "from the provided context or your training data. If context is provided about the brand, USE IT as your " +
      "primary source — do not make up details that contradict it. If you are NOT familiar with the brand and no " +
      "context is provided, honestly say so rather than inventing details. Mention specific brands BY NAME when " +
      "comparing. Write in natural prose with citations.",
  },
  gemini: {
    label: "Google Gemini",
    systemPrompt:
      "You are Google Gemini, a helpful and grounded AI assistant. Answer clearly in 2-3 paragraphs. " +
      "IMPORTANT: Only describe a brand's features, pricing, or capabilities if you have ACTUAL KNOWLEDGE " +
      "from the provided context or your training data. If context is provided about the brand, treat it as " +
      "authoritative and base your answer on it. If you are NOT familiar with the brand and no context is provided, " +
      "honestly state that you don't have enough information rather than guessing. When comparing options, mention " +
      "specific brands BY NAME. Keep a neutral, informative tone. Write in natural prose.",
  },
};

// ------------------------------------------------------------------
// Low-level provider calls (OpenRouter + NVIDIA are OpenAI-compatible).
// ------------------------------------------------------------------

interface ChatMessage {
  role: string;
  content: string;
}

/**
 * Call OpenRouter or NVIDIA (both expose an OpenAI-compatible
 * /chat/completions endpoint). Throws on any error so the fallback chain
 * can move to the next model.
 */
async function callProvider(
  provider: Provider,
  model: string,
  messages: ChatMessage[],
): Promise<string> {
  if (provider !== "openrouter" && provider !== "nvidia") {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  const cfg = PROVIDER_CONFIG[provider];
  const key = getApiKey(provider);
  if (!key) {
    throw new Error(`No API key configured for ${provider}`);
  }

  const controller = new AbortController();
  // 40s per-model timeout — slow models fall through to the next in the chain.
  const timeout = setTimeout(() => controller.abort(), 40_000);

  try {
    const res = await fetch(cfg.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cfg.authHeader(key),
        ...cfg.extraHeaders,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`${provider} ${model} → HTTP ${res.status}: ${body.slice(0, 200)}`);
    }

    const data = (await res.json()) as ChatCompletion;
    const content = data.choices?.[0]?.message?.content ?? "";
    if (!content.trim()) {
      throw new Error(`${provider} ${model} → empty response`);
    }
    return content.trim();
  } finally {
    clearTimeout(timeout);
  }
}

/** Call the z-ai-web-dev-sdk (final fallback, always available). */
async function callZai(messages: ChatMessage[]): Promise<string> {
  const zai = await getZAI();
  const completion = await zai.chat.completions.create({
    messages,
    thinking: { type: "disabled" },
  });
  const content = completion.choices[0]?.message?.content ?? "";
  if (!content.trim()) {
    throw new Error("Empty response from z-ai SDK");
  }
  return content.trim();
}

/**
 * Run a fallback chain: try each model in order, then z-ai SDK, returning
 * the first successful response. Throws only if EVERY option fails.
 */
export async function completeWithFallback(
  chain: ModelEntry[],
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  // 1..N — try each model in the chain.
  for (const entry of chain) {
    try {
      if (entry.provider === "zai") {
        return await callZai(messages);
      }
      return await callProvider(entry.provider, entry.model, messages);
    } catch (err) {
      console.error(
        `[data_collector] ${entry.provider}/${entry.model} failed:`,
        err instanceof Error ? err.message : err,
      );
      // continue to next model
    }
  }

  // N+1 — final fallback to z-ai SDK (if not already in the chain).
  try {
    return await callZai(messages);
  } catch (err) {
    console.error("[data_collector] z-ai SDK final fallback failed:", err);
  }

  // N+2 — everything failed; let the caller use the mock.
  throw new Error("All models in the fallback chain failed");
}

// ------------------------------------------------------------------
// Per-engine public fetchers.
// ------------------------------------------------------------------

/** Get a ChatGPT-style answer for the given query. */
export async function getChatGPTResponse(
  brandName: string,
  queryPrompt: string,
  website?: string,
  brandContext?: string | null,
): Promise<string> {
  try {
    return await completeWithFallback(
      ENGINE_CHAINS.chatgpt,
      ENGINE_CONFIG.chatgpt.systemPrompt,
      buildUserPrompt(queryPrompt, website, brandName, brandContext),
    );
  } catch (err) {
    console.error("[data_collector] ChatGPT all fallbacks failed:", err);
    return mockAnswer("chatgpt", brandName);
  }
}

/** Get a Perplexity-style (cited, synthesized) answer. */
export async function getPerplexityResponse(
  brandName: string,
  queryPrompt: string,
  website?: string,
  brandContext?: string | null,
): Promise<string> {
  try {
    return await completeWithFallback(
      ENGINE_CHAINS.perplexity,
      ENGINE_CONFIG.perplexity.systemPrompt,
      buildUserPrompt(queryPrompt, website, brandName, brandContext),
    );
  } catch (err) {
    console.error("[data_collector] Perplexity all fallbacks failed:", err);
    return mockAnswer("perplexity", brandName);
  }
}

/** Get a Google Gemini-style answer. */
export async function getGeminiResponse(
  brandName: string,
  queryPrompt: string,
  website?: string,
  brandContext?: string | null,
): Promise<string> {
  try {
    return await completeWithFallback(
      ENGINE_CHAINS.gemini,
      ENGINE_CONFIG.gemini.systemPrompt,
      buildUserPrompt(queryPrompt, website, brandName, brandContext),
    );
  } catch (err) {
    console.error("[data_collector] Gemini all fallbacks failed:", err);
    return mockAnswer("gemini", brandName);
  }
}

/** Compose the user prompt, including real brand context from their website. */
function buildUserPrompt(
  queryPrompt: string,
  website?: string,
  brandName?: string,
  brandContext?: string | null,
): string {
  const parts: string[] = [queryPrompt];

  // Include real information scraped from the brand's website.
  if (brandContext && brandContext.trim()) {
    parts.push(
      `\n\n--- VERIFIED INFORMATION about ${brandName || "the brand"} (from their website ${website || ""}) ---\n${brandContext}\n--- END VERIFIED INFORMATION ---\n\nUse the above verified information as your primary source of facts about this brand. Only state details you can support from this context or your training data. Do not invent features, pricing, or capabilities that aren't supported by the above context.`,
    );
  } else if (website) {
    parts.push(`\n\n(For context, the brand of interest operates the website: ${website})`);
  }

  return parts.join("");
}

/**
 * When the user leaves the description blank, synthesize a discovery prompt
 * from the brand name (+ website).
 */
export function synthesizeQuery(brand: string, website?: string): string {
  const b = brand.trim();
  const w = (website || "").trim();
  const ctx = w ? ` (website: ${w})` : "";
  return [
    `What is ${b}${ctx} and what is it known for?`,
    `How does ${b} compare to similar products or alternatives?`,
    `What do people say about ${b}, and is it worth choosing?`,
  ].join(" ");
}

/** Public dispatcher used by the API route. */
export async function getEngineResponse(
  engine: EngineId,
  brandName: string,
  queryPrompt: string,
  website?: string,
  brandContext?: string | null,
): Promise<string> {
  if (engine === "perplexity") {
    return getPerplexityResponse(brandName, queryPrompt, website, brandContext);
  }
  if (engine === "gemini") {
    return getGeminiResponse(brandName, queryPrompt, website, brandContext);
  }
  return getChatGPTResponse(brandName, queryPrompt, website, brandContext);
}

export function getEngineLabel(engine: EngineId): string {
  return ENGINE_CONFIG[engine].label;
}

/** Exported so ml-analyzer can reuse the chain for sentiment analysis. */
export { SENTIMENT_CHAIN };

// ------------------------------------------------------------------
// Mock fallback — guarantees the app is testable without the network.
// ------------------------------------------------------------------
function mockAnswer(engine: EngineId, brand: string): string {
  const competitorPool = ["Salesforce", "HubSpot", "Zoho", "Pipedrive", "Monday.com", "Notion", "Airtable"];
  const competitors = competitorPool
    .filter((c) => c.toLowerCase() !== brand.toLowerCase())
    .slice(0, 3);

  if (engine === "perplexity") {
    return [
      `When evaluating options for this category, several platforms stand out according to recent sources [1]. ${brand} is frequently mentioned as a strong contender thanks to its intuitive interface and generous feature set, though some users note that advanced automations can feel limited at scale [2].`,
      `${competitors[0]} remains the incumbent enterprise choice, offering deep customization but at a notably higher price point [3]. Meanwhile, ${competitors[1]} appeals to teams that prioritize ease of use and fast onboarding, while ${competitors[2]} is often praised for its flexible workflows and competitive pricing.`,
      `Overall, ${brand} earns positive marks for value and usability, but organizations with complex requirements may find ${competitors[0]} more capable despite the added cost [1][3].`,
    ].join("\n\n");
  }
  if (engine === "gemini") {
    return [
      `${brand} is a well-known option in this space, recognized for balancing ease of use with a solid range of features. It tends to appeal to teams that want a capable platform without a steep learning curve, and its pricing is generally seen as competitive.`,
      `Among alternatives, ${competitors[0]} is the established leader with extensive customization and integrations, better suited to larger organizations despite the higher cost. ${competitors[1]} is valued for simplicity and quick setup, while ${competitors[2]} offers flexible workflows at an attractive price point.`,
      `In summary, ${brand} is a strong choice for users prioritizing usability and value, whereas those with more complex or enterprise needs may prefer ${competitors[0]}.`,
    ].join("\n\n");
  }
  return [
    `There are several solid options in this space. ${brand} is a popular choice because it balances a clean interface with a broad feature set, making it especially appealing to growing teams. Its pricing is generally competitive, though power users sometimes bump into limits on advanced automation.`,
    `On the enterprise side, ${competitors[0]} is the established leader with extensive customization, but it comes with a steeper learning curve and higher cost. ${competitors[1]} is well regarded for simplicity and quick onboarding, while ${competitors[2]} stands out for flexible workflows at an attractive price.`,
    `In short, ${brand} is a great fit for teams that want capability without complexity, whereas larger organizations may lean toward ${competitors[0]} despite the overhead.`,
  ].join("\n\n");
}

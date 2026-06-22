import { NextResponse } from "next/server";
import { runEngineAnalysis } from "@/lib/aeo";
import type { AnalyzeRequest, EngineId } from "@/lib/aeo/types";
import { rateLimit, getClientIp } from "@/lib/aeo/rate-limit";

export const runtime = "nodejs";
// The LLM-backed analysis can take a while; allow up to ~5 minutes.
export const maxDuration = 300;

// Rate limit: 20 analysis requests per IP per 10 minutes.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const VALID_ENGINES: EngineId[] = ["chatgpt", "perplexity", "gemini"];

function sanitize(s: unknown): string {
  return String(s ?? "").trim().slice(0, 1000);
}

/** Normalize a website URL: accept bare domains, prepend https:// if needed. */
function sanitizeUrl(s: unknown): string {
  let v = String(s ?? "").trim().slice(0, 1000);
  if (!v) return "";
  if (!/^https?:\/\//i.test(v)) {
    v = `https://${v}`;
  }
  try {
    const u = new URL(v);
    return u.toString();
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  // Rate limit check (best-effort, in-memory).
  const ip = getClientIp(request);
  if (!rateLimit(`analyze:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      {
        error:
          "Rate limit reached. You've run too many analyses recently — please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  let body: Partial<AnalyzeRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const brand = sanitize(body.brand);
  const query = sanitize(body.query);
  const website = sanitizeUrl(body.website);
  const engine = String(body.engine ?? "") as EngineId;

  if (!brand) {
    return NextResponse.json({ error: "Brand name is required" }, { status: 400 });
  }
  // Description (query) is optional — the backend synthesizes a discovery
  // prompt from brand + website when none is provided.
  if (!VALID_ENGINES.includes(engine)) {
    return NextResponse.json(
      { error: "Engine must be 'chatgpt', 'perplexity', or 'gemini'" },
      { status: 400 },
    );
  }

  try {
    const result = await runEngineAnalysis(engine, brand, query, website || undefined);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/aeo/analyze] failed:", err);
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

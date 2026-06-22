// Simple in-memory rate limiter (per-IP, sliding window).
// Best-effort protection against casual abuse.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

let lastPrune = Date.now();
function prune() {
  const now = Date.now();
  if (now - lastPrune < 5 * 60 * 1000) return;
  lastPrune = now;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Returns true if the request is allowed, false if rate-limited.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  prune();
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= limit) {
    return false;
  }

  existing.count += 1;
  return true;
}

/** Extract the client IP from a Next.js request, best-effort. */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

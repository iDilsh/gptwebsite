// Fetches real information about a brand from its website so the LLMs have
// actual facts to work with instead of hallucinating.
//
// Uses a lightweight fetch + HTML text extraction (no external deps).
// Falls back gracefully if the website can't be reached.

/** Fetch the brand's website and extract readable text content. */
export async function fetchBrandContext(
  brand: string,
  website?: string,
): Promise<string | null> {
  const url = (website || "").trim();
  if (!url) return null;

  const fetchUrl = url.startsWith("http") ? url : `https://${url}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(fetchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AEOScopeBot/1.0; +https://aeoscope.app)",
        Accept: "text/html",
      },
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();
    const extracted = extractTextFromHtml(html, brand);

    if (!extracted || extracted.length < 50) return null;

    // Cap at ~1500 chars to keep the prompt size reasonable.
    return extracted.slice(0, 1500);
  } catch {
    return null;
  }
}

/** Extract readable text from HTML — title, meta description, headings, paragraphs. */
function extractTextFromHtml(html: string, brand: string): string {
  // Remove script/style/noscript blocks.
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

  const parts: string[] = [];

  // Extract <title>
  const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch?.[1]?.trim()) {
    parts.push(`Page title: ${decodeEntities(titleMatch[1].trim())}`);
  }

  // Extract meta description
  const descMatch = text.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i,
  );
  if (descMatch?.[1]?.trim()) {
    parts.push(`Description: ${decodeEntities(descMatch[1].trim())}`);
  }

  // Extract meta keywords
  const kwMatch = text.match(
    /<meta[^>]+name=["']keywords["'][^>]+content=["']([\s\S]*?)["']/i,
  );
  if (kwMatch?.[1]?.trim()) {
    parts.push(`Keywords: ${decodeEntities(kwMatch[1].trim())}`);
  }

  // Extract Open Graph description
  const ogMatch = text.match(
    /<meta[^>]+property=["']og:description["'][^>]+content=["']([\s\S]*?)["']/i,
  );
  if (ogMatch?.[1]?.trim()) {
    parts.push(`Summary: ${decodeEntities(ogMatch[1].trim())}`);
  }

  // Extract h1 headings
  const h1Matches = text.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  for (const m of h1Matches) {
    const h = stripTags(m[1]).trim();
    if (h && h.length > 5) parts.push(`Heading: ${h}`);
    if (parts.length > 15) break;
  }

  // Extract h2 headings
  const h2Matches = text.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi);
  for (const m of h2Matches) {
    const h = stripTags(m[1]).trim();
    if (h && h.length > 5) parts.push(`Section: ${h}`);
    if (parts.length > 20) break;
  }

  // Extract first few paragraphs
  const pMatches = text.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  let pCount = 0;
  for (const m of pMatches) {
    const p = stripTags(m[1]).trim();
    if (p && p.length > 30) {
      parts.push(p);
      pCount++;
    }
    if (pCount >= 5 || parts.length > 25) break;
  }

  return parts.join("\n");
}

function stripTags(html: string): string {
  return decodeEntities(
    html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'");
}

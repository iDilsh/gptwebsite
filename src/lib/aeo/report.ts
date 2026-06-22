// Self-contained HTML report generator.
// Produces a single .html string (all CSS inlined) that can be downloaded
// and opened in any browser, or printed to PDF via the browser's print
// dialog.

import type { AggregateResult, EngineAnalysis, MentionSentence } from "./types";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function scoreTone(value: number) {
  if (value >= 70) return { stroke: "#10b981", label: "Strong", color: "#059669" };
  if (value >= 40) return { stroke: "#f59e0b", label: "Moderate", color: "#d97706" };
  return { stroke: "#f43f5e", label: "Weak", color: "#e11d48" };
}

function sentimentStyle(label: string) {
  if (label === "POSITIVE")
    return { badge: "background:#d1fae5;color:#047857;", dot: "#10b981", label: "Positive" };
  if (label === "NEGATIVE")
    return { badge: "background:#ffe4e6;color:#be123c;", dot: "#f43f5e", label: "Negative" };
  return { badge: "background:#fef3c7;color:#b45309;", dot: "#f59e0b", label: "Neutral" };
}

/** Highlight the target brand + competitors in the answer text. */
function highlightAnswer(text: string, brand: string, competitors: { name: string }[]): string {
  let html = escapeHtml(text);
  if (brand.trim()) {
    const re = new RegExp(`(${escapeHtml(brand.trim()).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    html = html.replace(
      re,
      '<mark style="background:#d1fae5;color:#065f46;padding:1px 4px;border-radius:4px;font-weight:600;">$1</mark>',
    );
  }
  for (const c of competitors) {
    if (!c.name.trim() || c.name.toLowerCase() === brand.toLowerCase()) continue;
    const re = new RegExp(`(${escapeHtml(c.name.trim()).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "g");
    html = html.replace(
      re,
      '<mark style="background:#fef3c7;color:#92400e;padding:1px 4px;border-radius:4px;font-weight:500;">$1</mark>',
    );
  }
  return html.replace(/\n\n/g, "</p><p style=\"margin:0 0 12px;line-height:1.7;font-size:14px;\">");
}

function renderGauge(value: number): string {
  const size = 160;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const tone = scoreTone(value);
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
      <div style="position:relative;width:${size}px;height:${size}px;">
        <svg width="${size}" height="${size}" style="transform:rotate(-90deg);">
          <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="#fce7e7" stroke-width="${stroke}"/>
          <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="${tone.stroke}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
        </svg>
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <span style="font-size:40px;font-weight:800;color:${tone.color};line-height:1;">${Math.round(value)}</span>
          <span style="font-size:12px;color:#6b7280;">/ 100</span>
          <span style="margin-top:4px;font-size:10px;font-weight:700;text-transform:uppercase;color:${tone.color};background:${tone.stroke}1a;padding:2px 8px;border-radius:99px;">${tone.label}</span>
        </div>
      </div>
    </div>
  `;
}

function renderMetricCard(title: string, value: number, max: number, pct: number, color: string, icon: string): string {
  return `
    <div style="background:#fff;border:1px solid #fee2e2;border-radius:16px;padding:20px;box-shadow:0 4px 12px -4px rgba(0,0,0,0.06);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
        <div>
          <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin:0;">${title}</p>
          <div style="margin-top:4px;">
            <span style="font-size:28px;font-weight:800;color:${color};">${value.toFixed(1)}</span>
            <span style="font-size:13px;color:#6b7280;">/ ${max}</span>
          </div>
        </div>
        <span style="font-size:18px;">${icon}</span>
      </div>
      <div style="height:6px;background:#fce7e7;border-radius:99px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,${color},${color}cc);border-radius:99px;"></div>
      </div>
    </div>
  `;
}

function renderMention(m: MentionSentence, i: number): string {
  const s = sentimentStyle(m.sentiment);
  const pct = Math.round(m.score * 100);
  return `
    <div style="background:#fff;border:1px solid #fee2e2;border-radius:12px;padding:14px;">
      <div style="display:flex;gap:10px;">
        <span style="flex-shrink:0;width:20px;height:20px;background:#fce7e7;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#6b7280;">${i + 1}</span>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#1f2937;">${escapeHtml(m.sentence)}</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:10px;padding-top:10px;border-top:1px solid #fef2f2;padding-left:30px;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;border-radius:99px;background:${s.dot};"></span>
          <span style="font-size:10px;font-weight:600;text-transform:uppercase;color:#6b7280;">Sentiment</span>
          <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px;${s.badge}">${s.label}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:120px;">
          <span style="font-size:10px;font-weight:600;text-transform:uppercase;color:#6b7280;">Confidence</span>
          <div style="flex:1;height:6px;background:#fce7e7;border-radius:99px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${s.dot};border-radius:99px;"></div>
          </div>
          <span style="font-size:11px;font-weight:700;color:#1f2937;width:32px;text-align:right;">${pct}%</span>
        </div>
      </div>
    </div>
  `;
}

function renderEngineSection(a: EngineAnalysis): string {
  const tone = scoreTone(a.scores.total);
  const highlighted = highlightAnswer(a.rawText, a.targetBrand, a.otherBrands);
  const mentionsHtml = a.mentions.length > 0
    ? a.mentions.map((m, i) => renderMention(m, i)).join("")
    : '<div style="background:#fff;border:1px dashed #fecaca;border-radius:12px;padding:32px;text-align:center;color:#6b7280;font-size:13px;">No brand mentions detected in this engine\'s answer.</div>';

  const sovBadges = [
    `<span style="background:#d1fae5;color:#047857;padding:4px 12px;border-radius:99px;font-weight:600;font-size:12px;">${escapeHtml(a.targetBrand)}: ${a.mentionCount}</span>`,
    ...a.otherBrands.map(
      (b) =>
        `<span style="background:#fef3c7;color:#92400e;padding:4px 12px;border-radius:99px;font-weight:500;font-size:12px;">${escapeHtml(b.name)}: ${b.mentions}</span>`,
    ),
  ].join(" ");

  return `
    <div style="background:#fff;border:1px solid #fee2e2;border-radius:20px;padding:24px;margin-bottom:20px;box-shadow:0 4px 12px -4px rgba(0,0,0,0.06);page-break-inside:avoid;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #fef2f2;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,${tone.stroke}22,${tone.stroke}11);display:flex;align-items:center;justify-content:center;">
            <span style="font-size:20px;font-weight:800;color:${tone.color};">${a.scores.total}</span>
          </div>
          <div>
            <h3 style="margin:0;font-size:16px;font-weight:700;color:#1f2937;">${escapeHtml(a.engineLabel)} visibility</h3>
            <p style="margin:2px 0 0;font-size:11px;color:#6b7280;">analyzed in ${(a.elapsedMs / 1000).toFixed(1)}s · ${a.mentionCount} mentions · ${a.mentions.length} sentences</p>
          </div>
        </div>
        ${a.website ? `<span style="font-size:11px;color:#6b7280;">🌐 ${escapeHtml(a.website)}</span>` : ""}
      </div>
      <div style="margin-bottom:18px;">
        <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin:0 0 8px;">AI-generated answer</p>
        <div style="background:#fffafa;border:1px solid #fee2e2;border-radius:12px;padding:14px;">
          <p style="margin:0 0 12px;line-height:1.7;font-size:14px;">${highlighted}</p>
        </div>
      </div>
      <div style="margin-bottom:18px;">
        <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin:0 0 8px;">Brand mention sentiment</p>
        <div style="display:flex;flex-direction:column;gap:8px;">${mentionsHtml}</div>
      </div>
      ${a.otherBrands.length > 0 ? `
      <div>
        <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin:0 0 8px;">Share of voice context</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">${sovBadges}</div>
      </div>` : ""}
    </div>
  `;
}

/**
 * Generate the full self-contained HTML report.
 */
export function generateReportHtml(result: AggregateResult): string {
  const date = new Date(result.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const engines = (["chatgpt", "perplexity", "gemini"] as const)
    .map((id) => result.engines[id])
    .filter((e): e is EngineAnalysis => Boolean(e && !e.error));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AEOScope Report — ${escapeHtml(result.brand)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: linear-gradient(180deg,#fff5f5 0%,#fff 40%); color: #1f2937; min-height: 100vh; padding: 32px 16px; }
  .container { max-width: 880px; margin: 0 auto; }
  .card { background: #fff; border: 1px solid #fee2e2; border-radius: 20px; box-shadow: 0 4px 12px -4px rgba(0,0,0,0.06); }
  .print-btn { display: inline-flex; align-items: center; gap: 8px; background: #dc2626; color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 600; cursor: pointer; margin-bottom: 20px; }
  .print-btn:hover { background: #b91c1c; }
  @media print {
    body { background: #fff; padding: 0; }
    .print-btn { display: none !important; }
    .card { box-shadow: none !important; border: 1px solid #eee !important; }
  }
</style>
</head>
<body>
<div class="container">
  <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  <div class="card" style="padding:28px;margin-bottom:20px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#dc2626,#e11d48);color:#fff;font-size:16px;font-weight:800;">A</span>
          <span style="font-size:15px;font-weight:700;color:#1f2937;">AEOScope</span>
        </div>
        <h1 style="font-size:26px;font-weight:800;color:#1f2937;margin:0;">AEO Visibility Report</h1>
        <p style="font-size:13px;color:#6b7280;margin-top:4px;">${escapeHtml(result.brand)}${result.website ? ` · ${escapeHtml(result.website)}` : ""}</p>
      </div>
      <div style="text-align:right;">
        <p style="font-size:12px;color:#6b7280;">Generated</p>
        <p style="font-size:13px;font-weight:600;color:#1f2937;">${date}</p>
      </div>
    </div>
    <div style="margin-top:14px;padding-top:14px;border-top:1px solid #fef2f2;">
      <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Query</p>
      <p style="font-size:13px;color:#1f2937;margin-top:2px;font-style:italic;">"${escapeHtml(result.query)}"</p>
    </div>
  </div>
  <div class="card" style="padding:28px;margin-bottom:20px;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:24px;">
      ${renderGauge(result.total)}
      <div style="text-align:center;">
        <p style="font-size:14px;font-weight:700;color:#1f2937;">Aggregate AEO visibility</p>
        <p style="font-size:12px;color:#6b7280;margin-top:2px;">averaged across ${engines.length} engine${engines.length === 1 ? "" : "s"}</p>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px;">
      ${renderMetricCard("Presence", result.presence, 40, Math.round((result.presence / 40) * 100), "#059669", "👁️")}
      ${renderMetricCard("Sentiment", result.sentiment, 40, Math.round((result.sentiment / 40) * 100), "#dc2626", "😊")}
      ${renderMetricCard("Share of Voice", result.shareOfVoice, 20, Math.round((result.shareOfVoice / 20) * 100), "#d97706", "📊")}
    </div>
  </div>
  <h2 style="font-size:18px;font-weight:700;color:#1f2937;margin:24px 0 14px;">Per-engine analysis</h2>
  ${engines.length > 0 ? engines.map(renderEngineSection).join("") : '<div class="card" style="padding:32px;text-align:center;color:#6b7280;">No engine analyses completed.</div>'}
  <div style="text-align:center;padding:24px 0 8px;">
    <p style="font-size:11px;color:#9ca3af;">Generated by AEOScope · AEO Visibility Checker · ${new Date().getFullYear()}</p>
    <p style="font-size:11px;color:#9ca3af;margin-top:4px;">Powered by transformer-based sentiment analysis across ChatGPT, Perplexity &amp; Google Gemini</p>
  </div>
</div>
</body>
</html>`;
}

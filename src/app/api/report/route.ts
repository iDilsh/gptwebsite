import { NextResponse } from "next/server";
import { generateReportHtml } from "@/lib/aeo/report";
import type { AggregateResult } from "@/lib/aeo/types";

export const runtime = "nodejs";

/**
 * POST /api/report
 * Body: AggregateResult (the full analysis result from the client store)
 * Returns: a self-contained .html file download.
 */
export async function POST(request: Request) {
  let body: AggregateResult;
  try {
    body = (await request.json()) as AggregateResult;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || !body.brand || typeof body.total !== "number") {
    return NextResponse.json(
      { error: "A valid analysis result is required" },
      { status: 400 },
    );
  }

  const html = generateReportHtml(body);

  const dateStr = new Date(body.createdAt || Date.now())
    .toISOString()
    .slice(0, 10);
  const safeBrand = body.brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const filename = `aeoscope-report-${safeBrand || "brand"}-${dateStr}.html`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

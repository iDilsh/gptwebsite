"use client";

import { Fragment, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { OtherBrand } from "@/lib/aeo/types";

interface HighlightedTextProps {
  text: string;
  targetBrand: string;
  otherBrands?: OtherBrand[];
  className?: string;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Renders the raw AI answer with the target brand highlighted (emerald)
 * and competitor brands highlighted (amber). Built with React nodes so
 * nothing is injected as raw HTML — safe by construction.
 */
export function HighlightedText({
  text,
  targetBrand,
  otherBrands = [],
  className,
}: HighlightedTextProps) {
  const segments = useMemo(() => {
    const terms: { value: string; kind: "target" | "other" }[] = [];
    if (targetBrand.trim()) {
      terms.push({ value: targetBrand.trim(), kind: "target" });
    }
    for (const b of otherBrands) {
      if (
        b.name.trim() &&
        b.name.toLowerCase() !== targetBrand.toLowerCase() &&
        !terms.some((t) => t.value.toLowerCase() === b.name.toLowerCase())
      ) {
        terms.push({ value: b.name.trim(), kind: "other" });
      }
    }
    if (terms.length === 0) return [{ text, kind: null as null }];
    const pattern = new RegExp(
      `(${terms.map((t) => escapeRegExp(t.value)).join("|")})`,
      "gi",
    );
    const parts = text.split(pattern);
    return parts.map((part) => {
      if (!part) return null;
      const match = terms.find(
        (t) => t.value.toLowerCase() === part.toLowerCase(),
      );
      return { text: part, kind: match ? match.kind : null };
    });
  }, [text, targetBrand, otherBrands]);

  return (
    <div
      className={cn(
        "max-h-[420px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground/90",
        className,
      )}
    >
      {segments.map((seg, i) => {
        if (!seg) return null;
        if (seg.kind === "target") {
          return (
            <mark
              key={i}
              className="rounded bg-emerald-500/20 px-1 py-0.5 font-semibold text-emerald-800 ring-1 ring-emerald-500/40 dark:text-emerald-200"
            >
              {seg.text}
            </mark>
          );
        }
        if (seg.kind === "other") {
          return (
            <mark
              key={i}
              className="rounded bg-amber-500/15 px-1 py-0.5 font-medium text-amber-800 ring-1 ring-amber-500/30 dark:text-amber-200"
            >
              {seg.text}
            </mark>
          );
        }
        return <Fragment key={i}>{seg.text}</Fragment>;
      })}
    </div>
  );
}

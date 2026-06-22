"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertTriangle, Quote, Users, Hash, Globe } from "lucide-react";
import { HighlightedText } from "./highlighted-text";
import { MentionTable } from "./mention-table";
import { scoreTone } from "./score-gauge";
import type { EngineAnalysis } from "@/lib/aeo/types";
import { cn } from "@/lib/utils";

interface EnginePanelProps {
  analysis?: EngineAnalysis;
  loading: boolean;
  error?: string;
}

function EngineLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-red-400/20" />
        <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-[0_10px_24px_-6px_oklch(0.55_0.22_27/0.6)]">
          <Loader2 className="size-7 animate-spin" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">Querying the answer engine…</p>
        <p className="text-xs text-muted-foreground">
          Generating a response, extracting mentions, and running sentiment analysis.
        </p>
      </div>
    </div>
  );
}

function EngineError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 py-16 text-center">
      <AlertTriangle className="size-8 text-rose-500" />
      <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">Analysis failed</p>
      <p className="max-w-md text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="aeo-card-soft flex items-center gap-2 rounded-xl px-3 py-2">
      <span className="flex size-7 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-300">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-bold tabular-nums text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function EnginePanel({ analysis, loading, error }: EnginePanelProps) {
  if (loading) return <EngineLoading />;
  if (error) return <EngineError message={error} />;
  if (!analysis) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-muted-foreground">
        Run an analysis to see results here.
      </div>
    );
  }

  const tone = scoreTone(analysis.scores.total);

  return (
    <div className="space-y-4">
      {/* Engine summary strip */}
      <div className="aeo-card-soft flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "aeo-inset-soft flex flex-col items-center justify-center rounded-2xl px-4 py-2",
              tone.ring,
            )}
          >
            <p className="text-2xl font-extrabold tabular-nums">{analysis.scores.total}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide">/ 100</p>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{analysis.engineLabel} visibility</p>
            <p className="text-xs text-muted-foreground">
              analyzed in {(analysis.elapsedMs / 1000).toFixed(1)}s
            </p>
            {analysis.website ? (
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground/80">
                <Globe className="size-3" />
                <span className="truncate max-w-[200px]">{analysis.website}</span>
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <MiniStat icon={<Hash className="size-3.5" />} label="Mentions" value={String(analysis.mentionCount)} />
          <MiniStat icon={<Quote className="size-3.5" />} label="Sentences" value={String(analysis.mentions.length)} />
          <MiniStat icon={<Users className="size-3.5" />} label="Competitors" value={String(analysis.otherBrands.length)} />
        </div>
      </div>

      {/* Raw text with highlights */}
      <div className="aeo-card-3d rounded-2xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-foreground">AI-generated answer</h4>
          <Badge variant="secondary" className="font-medium">
            {analysis.engineLabel}
          </Badge>
        </div>
        <HighlightedText
          text={analysis.rawText}
          targetBrand={analysis.targetBrand}
          otherBrands={analysis.otherBrands}
        />
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <mark className="rounded bg-emerald-500/20 px-1 py-0.5 font-semibold text-emerald-800 ring-1 ring-emerald-500/40 dark:text-emerald-200">
              {analysis.targetBrand}
            </mark>
            target brand
          </span>
          <span className="flex items-center gap-1.5">
            <mark className="rounded bg-amber-500/15 px-1 py-0.5 font-medium text-amber-800 ring-1 ring-amber-500/30 dark:text-amber-200">
              competitor
            </mark>
            competitor brand
          </span>
        </div>
      </div>

      {/* Mention sentiment table */}
      <div className="aeo-card-3d rounded-2xl p-5">
        <h4 className="mb-3 text-sm font-bold text-foreground">Brand mention sentiment</h4>
        <MentionTable mentions={analysis.mentions} />
      </div>

      {/* Share of voice */}
      {analysis.otherBrands.length > 0 ? (
        <div className="aeo-card-3d rounded-2xl p-5">
          <h4 className="mb-3 text-sm font-bold text-foreground">Share of voice context</h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-transparent bg-emerald-500/15 px-3 py-1 font-semibold text-emerald-700 dark:text-emerald-300">
              {analysis.targetBrand}: {analysis.mentionCount}
            </Badge>
            {analysis.otherBrands.map((b) => (
              <Badge
                key={b.name}
                variant="outline"
                className="bg-amber-500/10 px-3 py-1 font-medium text-amber-700 dark:text-amber-300"
              >
                {b.name}: {b.mentions}
              </Badge>
            ))}
          </div>
          <Separator className="my-3" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Share of voice compares the target brand&apos;s mentions against all other brands
            detected in the answer.
          </p>
        </div>
      ) : null}
    </div>
  );
}

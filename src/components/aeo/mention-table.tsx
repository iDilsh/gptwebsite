"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { MentionSentence, SentimentLabel } from "@/lib/aeo/types";

interface MentionTableProps {
  mentions: MentionSentence[];
}

const SENTIMENT_STYLE: Record<
  SentimentLabel,
  { badge: string; bar: string; dot: string; label: string }
> = {
  POSITIVE: {
    badge: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    bar: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
    dot: "bg-emerald-500",
    label: "Positive",
  },
  NEGATIVE: {
    badge: "border-transparent bg-rose-500/15 text-rose-700 dark:text-rose-300",
    bar: "[&_[data-slot=progress-indicator]]:bg-rose-500",
    dot: "bg-rose-500",
    label: "Negative",
  },
  NEUTRAL: {
    badge: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
    bar: "[&_[data-slot=progress-indicator]]:bg-amber-500",
    dot: "bg-amber-500",
    label: "Neutral",
  },
};

export function MentionTable({ mentions }: MentionTableProps) {
  if (mentions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-12 text-center">
        <p className="text-sm font-medium text-muted-foreground">No brand mentions detected</p>
        <p className="text-xs text-muted-foreground/70">
          The target brand did not appear in this engine&apos;s answer.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {mentions.map((m, i) => {
        const style = SENTIMENT_STYLE[m.sentiment];
        const pct = Math.round(m.score * 100);
        return (
          <div key={i} className="aeo-card-soft rounded-xl p-4">
            {/* Sentence — full width, always visible */}
            <div className="flex gap-2.5">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[10px] font-bold text-muted-foreground">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-foreground/90">
                {m.sentence}
              </p>
            </div>

            {/* Sentiment + Confidence — on a dedicated row, always visible without scrolling */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/50 pt-3 pl-[30px]">
              {/* Sentiment */}
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", style.dot)} />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Sentiment
                </span>
                <Badge variant="outline" className={cn("font-medium", style.badge)}>
                  {style.label}
                </Badge>
              </div>

              {/* Confidence */}
              <div className="flex min-w-[140px] flex-1 items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Confidence
                </span>
                <Progress
                  value={pct}
                  className={cn("h-1.5 flex-1", style.bar)}
                />
                <span className="w-9 text-right text-xs font-semibold tabular-nums text-foreground">
                  {pct}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  description: string;
  /** Raw points achieved (e.g. 28.4). */
  value: number;
  /** Max points for this metric (e.g. 40). */
  max: number;
  icon: React.ReactNode;
  /** 0..100 normalized progress. */
  pct: number;
  accent?: "emerald" | "amber" | "rose" | "red";
}

const ACCENT = {
  emerald: {
    bar: "[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-emerald-400 [&_[data-slot=progress-indicator]]:to-teal-500",
    chip: "bg-gradient-to-br from-emerald-400/20 to-teal-500/20 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300",
    num: "text-emerald-600 dark:text-emerald-400",
    glow: "bg-emerald-400/20",
  },
  amber: {
    bar: "[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-amber-400 [&_[data-slot=progress-indicator]]:to-orange-500",
    chip: "bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-300",
    num: "text-amber-600 dark:text-amber-400",
    glow: "bg-amber-400/20",
  },
  rose: {
    bar: "[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-rose-400 [&_[data-slot=progress-indicator]]:to-pink-500",
    chip: "bg-gradient-to-br from-rose-400/20 to-pink-500/20 text-rose-700 ring-1 ring-rose-500/20 dark:text-rose-300",
    num: "text-rose-600 dark:text-rose-400",
    glow: "bg-rose-400/20",
  },
  red: {
    bar: "[&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-red-400 [&_[data-slot=progress-indicator]]:to-rose-500",
    chip: "bg-gradient-to-br from-red-400/20 to-rose-500/20 text-red-700 ring-1 ring-red-500/20 dark:text-red-300",
    num: "text-red-600 dark:text-red-400",
    glow: "bg-red-400/20",
  },
} as const;

export function MetricCard({
  title,
  description,
  value,
  max,
  icon,
  pct,
  accent = "emerald",
}: MetricCardProps) {
  const a = ACCENT[accent];
  return (
    <div className="aeo-card-soft group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5 sm:p-6">
      {/* Decorative corner glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-60 blur-3xl transition-opacity group-hover:opacity-100",
          a.glow,
        )}
      />

      {/* Header row: title + icon */}
      <div className="relative flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl backdrop-blur",
            a.chip,
          )}
        >
          {icon}
        </span>
      </div>

      {/* Big number — the visual anchor */}
      <div className="relative mt-4 flex items-baseline gap-1.5">
        <span className={cn("text-4xl font-extrabold tabular-nums tracking-tight sm:text-5xl", a.num)}>
          {value.toFixed(1)}
        </span>
        <span className="text-base font-semibold text-muted-foreground">/ {max}</span>
      </div>

      {/* Description */}
      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Progress bar + percentage — at the bottom, more prominent */}
      <div className="relative mt-auto flex items-center gap-3 pt-5">
        <Progress value={pct} className={cn("h-2 flex-1", a.bar)} />
        <span className={cn("text-sm font-bold tabular-nums", a.num)}>{pct}%</span>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  value: number; // 0..100
  size?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

/** Returns a tailwind text-color class + stroke color for a given score. */
export function scoreTone(value: number) {
  if (value >= 70) {
    return {
      text: "text-emerald-600 dark:text-emerald-400",
      stroke: "#10b981", // emerald-500
      soft: "#34d399",
      ring: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      label: "Strong",
      grad: "from-emerald-500 to-teal-500",
    };
  }
  if (value >= 40) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      stroke: "#f59e0b", // amber-500
      soft: "#fbbf24",
      ring: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      label: "Moderate",
      grad: "from-amber-500 to-orange-500",
    };
  }
  return {
    text: "text-rose-600 dark:text-rose-400",
    stroke: "#f43f5e", // rose-500
    soft: "#fb7185",
    ring: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    label: "Weak",
    grad: "from-rose-500 to-pink-500",
  };
}

export function ScoreGauge({
  value,
  size = 200,
  label = "Total AEO Score",
  sublabel,
  className,
}: ScoreGaugeProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const tone = scoreTone(clamped);
  // Unique gradient id per render to avoid collisions when multiple gauges exist.
  const gid = `gauge-grad-${Math.round(clamped)}-${size}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tone.soft} />
            <stop offset="100%" stopColor={tone.stroke} />
          </linearGradient>
          <filter id={`${gid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor={tone.stroke}
              floodOpacity="0.35"
            />
          </filter>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-muted/30"
        />
        {/* Progress arc with soft drop shadow */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter={`url(#${gid}-shadow)`}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      {/* Inner soft disc for the 3D inset feel */}
      <div
        className="aeo-inset-soft absolute rounded-full"
        style={{
          inset: stroke + 8,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-5xl font-extrabold tabular-nums tracking-tight", tone.text)}>
          {Math.round(clamped)}
        </span>
        <span className="text-xs font-medium text-muted-foreground">/ 100</span>
        {sublabel ? (
          <span
            className={cn(
              "mt-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              tone.ring,
            )}
          >
            {sublabel}
          </span>
        ) : null}
      </div>
      <span className="sr-only">{label}: {Math.round(clamped)} out of 100</span>
    </div>
  );
}

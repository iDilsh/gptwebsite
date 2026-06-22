"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, RotateCcw, Wand2, Globe, Tag, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfigPanelProps {
  brand: string;
  website: string;
  query: string;
  onBrandChange: (v: string) => void;
  onWebsiteChange: (v: string) => void;
  onQueryChange: (v: string) => void;
  onRun: () => void;
  onReset: () => void;
  running: boolean;
}

const EXAMPLES: { brand: string; website: string; query: string; label: string }[] = [
  {
    label: "CRM for SMBs",
    brand: "HubSpot",
    website: "hubspot.com",
    query: "What is the best CRM for small businesses?",
  },
  {
    label: "Design tools",
    brand: "Figma",
    website: "figma.com",
    query: "What are the best design tools for product teams?",
  },
  {
    label: "Project mgmt",
    brand: "Notion",
    website: "notion.so",
    query: "Which project management tool should a startup use?",
  },
  {
    label: "Email marketing",
    brand: "Mailchimp",
    website: "mailchimp.com",
    query: "What is the best email marketing platform for beginners?",
  },
];

function FieldShell({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-red-600">
        {icon}
      </span>
      {children}
    </div>
  );
}

export function ConfigPanel({
  brand,
  website,
  query,
  onBrandChange,
  onWebsiteChange,
  onQueryChange,
  onRun,
  onReset,
  running,
}: ConfigPanelProps) {
  // Only the brand is required; description is optional (auto-synthesized).
  const canRun = brand.trim().length > 0 && !running;

  return (
    <div className="aeo-card-3d rounded-3xl p-5 sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="aeo-gradient-pill flex size-9 items-center justify-center rounded-xl text-white shadow-[0_6px_16px_-4px_oklch(0.55_0.22_27/0.5)]">
          <Sparkles className="size-4.5" />
        </span>
        <div>
          <h2 className="text-base font-bold tracking-tight text-foreground">Analysis setup</h2>
          <p className="text-xs text-muted-foreground">Configure your brand &amp; query</p>
        </div>
      </div>

      {/* Inputs — horizontal row on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Brand name */}
        <div className="space-y-1.5">
          <Label htmlFor="brand" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Target brand
          </Label>
          <FieldShell icon={<Tag className="size-4" />}>
            <Input
              id="brand"
              placeholder="e.g. HubSpot"
              value={brand}
              onChange={(e) => onBrandChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canRun) onRun();
              }}
              disabled={running}
              className="h-11 rounded-xl border-border/70 bg-white/70 pl-10 text-sm shadow-inner transition-colors focus-visible:border-red-400 focus-visible:ring-red-400/30 dark:bg-white/5"
            />
          </FieldShell>
        </div>

        {/* Brand website */}
        <div className="space-y-1.5">
          <Label htmlFor="website" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Brand website
          </Label>
          <FieldShell icon={<Globe className="size-4" />}>
            <Input
              id="website"
              placeholder="e.g. hubspot.com"
              value={website}
              onChange={(e) => onWebsiteChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canRun) onRun();
              }}
              disabled={running}
              inputMode="url"
              className="h-11 rounded-xl border-border/70 bg-white/70 pl-10 text-sm shadow-inner transition-colors focus-visible:border-red-400 focus-visible:ring-red-400/30 dark:bg-white/5"
            />
          </FieldShell>
        </div>

        {/* Description (optional) */}
        <div className="space-y-1.5">
          <Label htmlFor="query" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Description <span className="font-normal normal-case text-muted-foreground/60">(optional)</span>
          </Label>
          <FieldShell icon={<MessageSquareText className="size-4" />}>
            <Textarea
              id="query"
              placeholder="e.g. What is the best CRM for small businesses? (leave blank to auto-detect)"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              rows={1}
              disabled={running}
              className="resize-none rounded-xl border-border/70 bg-white/70 pl-10 pt-3 text-sm shadow-inner transition-colors focus-visible:border-red-400 focus-visible:ring-red-400/30 dark:bg-white/5"
            />
          </FieldShell>
        </div>
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/70">
        Leave the description blank and we&apos;ll auto-generate discovery questions from your brand &amp; website.
      </p>

      {/* Quick examples + Actions — horizontal row on desktop */}
      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Quick examples */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick examples
          </p>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                disabled={running}
                onClick={() => {
                  onBrandChange(ex.brand);
                  onWebsiteChange(ex.website);
                  onQueryChange(ex.query);
                }}
                className={cn(
                  "aeo-card-soft inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-foreground/80 transition-all",
                  "hover:-translate-y-0.5 hover:text-red-700 hover:dark:text-red-300",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                <Wand2 className="size-3 text-red-500" />
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 md:flex-shrink-0">
          <Button
            onClick={onRun}
            disabled={!canRun}
            className="aeo-btn-3d h-11 flex-1 gap-2 rounded-xl border-0 px-8 text-sm font-semibold text-white md:flex-none"
          >
            <Play className="size-4" />
            {running ? "Analyzing…" : "Run AEO Analysis"}
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="icon"
            disabled={running}
            aria-label="Reset"
            className="h-11 w-11 rounded-xl border-border/70 bg-white/70 shadow-sm hover:bg-white"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-red-500/5 p-3 text-[11px] leading-relaxed text-muted-foreground ring-1 ring-red-500/10">
        Queries <span className="font-semibold text-foreground">ChatGPT</span>,{" "}
        <span className="font-semibold text-foreground">Perplexity</span>, and{" "}
        <span className="font-semibold text-foreground">Gemini</span> in parallel, then runs
        transformer-based sentiment analysis on every brand mention.
      </p>
    </div>
  );
}

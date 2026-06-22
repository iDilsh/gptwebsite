"use client";

import { Radar, Sparkles, ArrowRight, Bot, Search, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandImage } from "./brand-image";

interface HeroProps {
  onLaunch?: () => void;
}

/**
 * Engine chip config. Each has a styled Lucide icon fallback AND an
 * image-ready slot: drop a logo at /public/images/engines/<file> and it
 * replaces the icon automatically. See IMAGE-GUIDE.md.
 */
const ENGINE_CHIPS = [
  {
    label: "ChatGPT",
    icon: Bot,
    logo: "/images/engines/chatgpt.png",
  },
  {
    label: "Perplexity",
    icon: Search,
    logo: "/images/engines/perplexity.png",
  },
  {
    label: "Google Gemini",
    icon: Sparkles,
    logo: "/images/engines/gemini.png",
  },
];

const TRUST = [
  { label: "ChatGPT", sub: "engine" },
  { label: "Perplexity", sub: "engine" },
  { label: "Gemini", sub: "engine" },
];

// Where the external "Full AEO / GEO Analysis" CTA points.
const FULL_ANALYSIS_URL = "https://www.idilsh.top";

export function Hero({ onLaunch }: HeroProps) {
  return (
    <section id="top" className="relative px-4 pt-10 sm:px-6 sm:pt-14 lg:pt-16">
      {/* Decorative floating blobs */}
      <div
        aria-hidden
        className="aeo-float pointer-events-none absolute -left-10 top-24 hidden size-40 rounded-full bg-gradient-to-br from-red-400/40 to-rose-400/30 blur-2xl lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 top-40 hidden size-52 rounded-full bg-gradient-to-br from-rose-300/40 to-red-300/30 blur-3xl lg:block"
      />

      <div className="mx-auto max-w-3xl text-center">
        {/* Trust badge */}
        <div className="aeo-fade-up aeo-card-soft inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold text-foreground/80">
          <span className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="relative size-5 overflow-hidden rounded-full ring-2 ring-white dark:ring-[oklch(0.21_0.025_295)]"
              >
                <BrandImage
                  src={`/images/brand/avatar-${i + 1}.png`}
                  alt={`Trusted brand ${i + 1}`}
                  className="size-5"
                  fallback={
                    <span className="aeo-gradient-pill flex size-5 items-center justify-center rounded-full text-white">
                      <Star className="size-3" />
                    </span>
                  }
                />
              </span>
            ))}
          </span>
          Trusted by 1,000+ brands to track AI visibility
        </div>

        {/* Heading */}
        <h1 className="aeo-fade-up mt-7 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          See how your brand{" "}
          <span className="aeo-gradient-text">Visibility</span> in AI answers
        </h1>

        {/* Subheading */}
        <p className="aeo-fade-up mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Measure your visibility across ChatGPT, Perplexity, and Google Gemini. We query the
          answer engines, extract every brand mention completely Free with
          sentiment analysis, and score your presence, sentiment, and share of
          voice.
        </p>

        {/* CTAs */}
        <div className="aeo-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={onLaunch}
            className="aeo-btn-3d h-12 w-full gap-2 rounded-2xl border-0 px-7 text-base text-white sm:w-auto"
          >
            <Radar className="size-4.5" />
            FREE AEO Analysis
            <ArrowRight className="size-4" />
          </Button>
          <a
            href={FULL_ANALYSIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aeo-card-soft inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Full AEO / GEO Analysis
            <ExternalLink className="size-3.5 text-muted-foreground" />
          </a>
        </div>

        {/* Supported engines row */}
        <div className="aeo-fade-up mt-9 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Supported answer engines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {ENGINE_CHIPS.map((e) => (
              <span
                key={e.label}
                className="aeo-card-soft inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
              >
                <span className="relative flex size-4 items-center justify-center">
                  <BrandImage
                    src={e.logo}
                    alt={`${e.label} logo`}
                    className="size-4"
                    fallback={<e.icon className="size-3.5 text-primary" />}
                  />
                </span>
                {e.label}
              </span>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="aeo-card-3d aeo-fade-up mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-xl">
          {[
            { value: "3", label: "AI engines" },
            { value: "3", label: "Score dimensions" },
            { value: "100", label: "Point AEO score" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-7 text-center">
              <p className="aeo-gradient-text text-4xl font-extrabold tabular-nums sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* trust footer chips */}
      <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground/70">
        {TRUST.map((t, i) => (
          <span key={t.label} className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-red-400" />
            {t.label}
            <span className="text-muted-foreground/50">· {t.sub}</span>
            {i < TRUST.length - 1 ? <span className="ml-2 text-border">/</span> : null}
          </span>
        ))}
      </div>
    </section>
  );
}

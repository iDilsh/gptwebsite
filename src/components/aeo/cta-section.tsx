"use client";

import { ArrowRight, ExternalLink, BookOpen, Check, Sparkles, Crown } from "lucide-react";

const TARGET_URL = "https://www.idilsh.top";

interface PriceCardProps {
  planName: string;
  price: string;
  billing: string;
  features: string[];
  /** Visual theme for this card. */
  theme: "crimson" | "midnight";
  /** Show a highlight ribbon above the card. */
  highlight?: string;
  /** Icon for the plan. */
  icon: React.ReactNode;
}

const THEMES = {
  // Card 1 — warm crimson premium (red family)
  crimson: {
    headerBg: "linear-gradient(150deg, #7F1D1D 0%, #DC2626 45%, #F87171 100%)",
    cardBg: "#FFFBFB",
    cardBorder: "rgba(220,38,38,0.18)",
    planNameColor: "#FFFFFF",
    priceSymbol: "rgba(255,255,255,0.7)",
    priceNumber: "#FFFFFF",
    billing: "rgba(255,255,255,0.78)",
    checkFill: "#DC2626",
    featureText: "#450A0A",
    buttonBg: "linear-gradient(180deg, #DC2626, #991B1B)",
    buttonShadow: "0 10px 24px -8px rgba(220,38,38,0.6)",
    glow: "radial-gradient(120px 80px at 20% 0%, rgba(248,113,113,0.45), transparent 70%)",
    ribbonBg: "linear-gradient(90deg, #DC2626, #F87171)",
    shineGlow: "rgba(248,113,113,0.6)",
  },
  // Card 2 — deep midnight premium (dark/indigo family)
  midnight: {
    headerBg: "linear-gradient(150deg, #0F172A 0%, #1E293B 45%, #334155 100%)",
    cardBg: "#F8FAFC",
    cardBorder: "rgba(15,23,42,0.15)",
    planNameColor: "#FFFFFF",
    priceSymbol: "rgba(255,255,255,0.65)",
    priceNumber: "#FFFFFF",
    billing: "rgba(255,255,255,0.72)",
    checkFill: "#0F172A",
    featureText: "#1E293B",
    buttonBg: "linear-gradient(180deg, #1E293B, #0F172A)",
    buttonShadow: "0 10px 24px -8px rgba(15,23,42,0.6)",
    glow: "radial-gradient(120px 80px at 80% 0%, rgba(99,102,241,0.35), transparent 70%)",
    ribbonBg: "linear-gradient(90deg, #1E293B, #6366F1)",
    shineGlow: "rgba(99,102,241,0.55)",
  },
} as const;

function PriceCard({
  planName,
  price,
  billing,
  features,
  theme,
  highlight,
  icon,
}: PriceCardProps) {
  const t = THEMES[theme];

  return (
    <div className="relative">
      {/* Highlight ribbon */}
      {highlight ? (
        <div
          className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg"
          style={{ background: t.ribbonBg }}
        >
          {highlight}
        </div>
      ) : null}

      <div
        className="aeo-card-shiny relative flex flex-col overflow-hidden rounded-3xl border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
        style={{
          background: t.cardBg,
          borderColor: t.cardBorder,
          ["--aeo-shine-glow" as string]: t.shineGlow,
        }}
      >
        {/* Top gradient header with glow + plan name + price + billing */}
        <div
          className="relative overflow-hidden px-6 py-8"
          style={{ background: t.headerBg }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: t.glow }}
          />
          {/* Subtle top sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent 80%)",
            }}
          />

          {/* Plan name + icon */}
          <div className="relative flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
              {icon}
            </span>
            <h3
              className="text-lg font-bold tracking-tight"
              style={{ color: t.planNameColor }}
            >
              {planName}
            </h3>
          </div>

          {/* Price — $ lighter, number bold white */}
          <div className="relative mt-5 flex items-baseline gap-0.5">
            <span
              className="text-2xl font-bold leading-none"
              style={{ color: t.priceSymbol }}
            >
              $
            </span>
            <span className="text-6xl font-extrabold leading-none tracking-tight text-white">
              {price}
            </span>
          </div>

          {/* Billing subtext */}
          <p
            className="relative mt-2.5 text-sm font-normal leading-snug"
            style={{ color: t.billing }}
          >
            {billing}
          </p>
        </div>

        {/* Feature list — filled circle checkmarks */}
        <div className="flex flex-1 flex-col px-6 py-6">
          <ul className="flex-1 space-y-3.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                  style={{ background: t.checkFill }}
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: t.featureText }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA button — full-width, themed gradient, at the bottom */}
          <a
            href={TARGET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-95"
            style={{ background: t.buttonBg, boxShadow: t.buttonShadow }}
          >
            Get started
            <ArrowRight className="size-4" />
            <ExternalLink className="size-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Ready for the next step?
        </p>
        <h2 className="mx-auto mt-2 max-w-2xl text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Go beyond the free scan — own your AI visibility
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          You&apos;ve seen your score. Now turn it into a strategy with a full audit or a
          hands-on optimization plan from our AEO specialists.
        </p>
      </div>

      {/* Pricing cards — same design, two distinct premium themes */}
      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-6">
        <PriceCard
          theme="crimson"
          icon={<Sparkles className="size-4.5" />}
          highlight="Best value"
          planName="Full Audit"
          price="10"
          billing="One-time audit, delivered in 3 business days"
          features={[
            "Visibility audit across ChatGPT, Perplexity & Gemini",
            "SEO + GEO cross-check with keyword gaps",
            "Sentiment & share-of-voice breakdown",
            "Prioritized 90-day action plan",
            "Competitor benchmarking report",
          ]}
        />
        <PriceCard
          theme="midnight"
          icon={<Crown className="size-4.5" />}
          highlight="Most popular"
          planName="Done-for-you"
          price="35"
          billing="Per month, ongoing optimization & monitoring"
          features={[
            "Structured data & schema implementation",
            "Content tuning for citation-worthy answers",
            "Citation building on trusted sources",
            "Monthly AEO monitoring & reporting",
            "Dedicated AEO specialist",
          ]}
        />
      </div>

      {/* Blog link */}
      <div className="mt-8 text-center">
        <a
          href="/blog"
          className="aeo-card-soft inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          <BookOpen className="size-4 text-primary" />
          Read the AEO / SEO / GEO blog
          <ArrowRight className="size-4 text-muted-foreground" />
        </a>
      </div>
    </section>
  );
}

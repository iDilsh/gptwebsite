"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAeoAnalysis } from "@/hooks/use-aeo-analysis";
import { ConfigPanel } from "@/components/aeo/config-panel";
import { AeoDashboard } from "@/components/aeo/aeo-dashboard";
import { NavBar } from "@/components/aeo/nav-bar";
import { Hero } from "@/components/aeo/hero";
import { CtaSection } from "@/components/aeo/cta-section";
import { HomeFaq } from "@/components/aeo/home-faq";
import { SiteFooter } from "@/components/aeo/site-footer";
import { Search, Smile, PieChart, Eye, Bot, Sparkles } from "lucide-react";

export default function Home() {
  const {
    draftBrand,
    draftWebsite,
    draftQuery,
    setDraftBrand,
    setDraftWebsite,
    setDraftQuery,
    run,
    reset,
    running,
  } = useAeoAnalysis();

  const appRef = useRef<HTMLDivElement>(null);

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="red-theme aeo-mesh-bg flex min-h-screen flex-col">
      <NavBar onLaunch={scrollToApp} />

      {/* Hero */}
      <Hero onLaunch={scrollToApp} />

      {/* Main app — config panel on top, dashboard below (single full-width column) */}
      <main
        ref={appRef}
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        {/* Config panel — horizontal on top */}
        <ConfigPanel
          brand={draftBrand}
          website={draftWebsite}
          query={draftQuery}
          onBrandChange={setDraftBrand}
          onWebsiteChange={setDraftWebsite}
          onQueryChange={setDraftQuery}
          onRun={run}
          onReset={reset}
          running={running}
        />

        {/* Dashboard — full width below the config */}
        <section className="mt-8 min-w-0">
          <AeoDashboard onLaunch={() => {
            // Pre-fill with an example.
            setDraftBrand("HubSpot");
            setDraftWebsite("hubspot.com");
            setDraftQuery("What is the best CRM for small businesses?");
          }} />
        </section>
      </main>

      {/* CTA section (between dashboard and how-it-works) */}
      <CtaSection />

      {/* How it works */}
      <section id="how" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            From query to visibility score in three steps
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              img: "/images/steps/step-1-query.png",
              icon: Search,
              title: "1. Query the engines",
              desc: "Your brand, website, and prompt are sent to ChatGPT, Perplexity, and Gemini in parallel to retrieve real AI answers.",
            },
            {
              img: "/images/steps/step-2-analyze.png",
              icon: Smile,
              title: "2. Analyze mentions",
              desc: "A transformer model extracts every brand mention and classifies the sentiment of each surrounding sentence.",
            },
            {
              img: "/images/steps/step-3-score.png",
              icon: PieChart,
              title: "3. Score visibility",
              desc: "Presence, sentiment, and share of voice are combined into a single AEO visibility score out of 100.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="aeo-card-3d group relative aspect-square overflow-hidden rounded-2xl"
            >
              {/* Full-bleed square illustration */}
              <div className="absolute inset-0 bg-muted/20">
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.accent} opacity-10`}
                />
                <Image
                  src={s.img}
                  alt={`Illustration: ${s.title}`}
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Gradient overlay so text is legible at the bottom */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/40 to-transparent"
              />
              {/* Body — pinned to the bottom of the square */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="mb-2 flex items-center gap-2.5">
                  <span
                    className={`flex size-9 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-[0_8px_18px_-6px_oklch(0.5_0.2_300/0.5)]`}
                  >
                    <s.icon className="size-4.5" />
                  </span>
                  <h3 className="text-sm font-bold text-white">{s.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-white/85">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature chips */}
        <div id="features" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Eye, label: "Presence tracking" },
            { icon: Smile, label: "Sentiment analysis" },
            { icon: PieChart, label: "Share of voice" },
            { icon: Bot, label: "Three AI engines" },
          ].map((f) => (
            <div
              key={f.label}
              className="aeo-card-soft flex items-center gap-2.5 rounded-xl px-3.5 py-3"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-4" />
              </span>
              <span className="text-xs font-semibold text-foreground">{f.label}</span>
            </div>
          ))}
        </div>

        {/* Engines strip */}
        
      </section>

      {/* Home FAQ */}
      <HomeFaq />

      {/* Sticky footer */}
      <SiteFooter tagline="Powered by transformer-based sentiment analysis" showBackLink={false} />
    </div>
  );
}

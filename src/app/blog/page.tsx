"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NavBar } from "@/components/aeo/nav-bar";
import { SiteFooter } from "@/components/aeo/site-footer";
import { ArticleBody } from "@/components/aeo/article-body";
import {
  ARTICLES,
  FAQ_ITEMS,
  type BlogArticle,
} from "@/lib/blog/content";
import { Radar, ArrowLeft, ArrowRight, Clock, Calendar, BookOpen, HelpCircle, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["All", "AEO", "SEO", "GEO", "Guides"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLOR: Record<string, string> = {
  AEO: "bg-red-500/10 text-red-700 dark:text-red-300",
  SEO: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  GEO: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Guides: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const activeArticle = useMemo(
    () => ARTICLES.find((a) => a.slug === activeSlug) ?? null,
    [activeSlug],
  );

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchesCat = category === "All" || a.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [category, query]);

  if (activeArticle) {
    return <ArticleView article={activeArticle} onBack={() => setActiveSlug(null)} />;
  }

  return (
    <div className="red-theme aeo-mesh-bg flex min-h-screen flex-col">
      <NavBar />

      {/* Blog hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="aeo-fade-up aeo-card-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-foreground/80">
            <BookOpen className="size-3.5 text-primary" />
            AEOScope Blog
          </div>
          <h1 className="aeo-fade-up mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Master <span className="aeo-gradient-text">AEO, SEO &amp; GEO</span> in the AI search era
          </h1>
          <p className="aeo-fade-up mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            In-depth guides on Answer Engine Optimization, brand visibility in AI answers,
            structured data, and the future of generative search.
          </p>

          {/* Search + filters */}
          <div className="aeo-fade-up mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="h-11 w-full rounded-lg border border-border/70 bg-white/70 pl-10 pr-3 text-sm shadow-inner outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 dark:bg-white/5"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors " +
                    (category === c
                      ? "aeo-btn-3d text-white"
                      : "aeo-card-soft text-foreground/70 hover:text-primary")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="aeo-card-3d rounded-2xl py-16 text-center text-sm text-muted-foreground">
            No articles match your search. Try a different keyword or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} onOpen={() => setActiveSlug(a.slug)} />
            ))}
          </div>
        )}
      </main>

      {/* FAQ */}
      <FaqSection />

      {/* Sticky footer */}
      <SiteFooter tagline="AEO, SEO & GEO insights" />
    </div>
  );
}

function ArticleCard({
  article,
  onOpen,
}: {
  article: BlogArticle;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="aeo-card-3d group flex flex-col overflow-hidden rounded-2xl text-left transition-transform hover:-translate-y-1"
    >
      {/* Color band header */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-red-500/15 via-red-400/10 to-orange-400/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,oklch(0.6_0.2_27/0.25),transparent_60%)]" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge className={"border-transparent " + CATEGORY_COLOR[article.category]}>
            {article.category}
          </Badge>
        </div>
        <span className="absolute bottom-3 right-4 flex size-9 items-center justify-center rounded-lg bg-white/70 text-primary backdrop-blur transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="size-4" />
        </span>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug tracking-tight text-foreground">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground/80">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3" />
            {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </button>
  );
}

function ArticleView({
  article,
  onBack,
}: {
  article: BlogArticle;
  onBack: () => void;
}) {
  const related = ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  ).slice(0, 3);

  return (
    <div className="red-theme aeo-mesh-bg flex min-h-screen flex-col">
      <NavBar />

      <article className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          All articles
        </button>

        {/* Header */}
        <header className="mb-8">
          <Badge className={"border-transparent " + CATEGORY_COLOR[article.category]}>
            {article.category}
          </Badge>
          <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground/80">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-5 rounded-full bg-primary/15 text-center text-[10px] font-bold leading-5 text-primary">
                {article.author.charAt(0)}
              </span>
              {article.author}
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="aeo-card-3d rounded-2xl p-6 sm:p-8">
          <ArticleBody blocks={article.body} />
        </div>

        {/* Keywords */}
        <div className="mt-6 flex flex-wrap gap-2">
          {article.keywords.map((k) => (
            <span
              key={k}
              className="aeo-card-soft rounded-full px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              #{k.replace(/\s+/g, "-")}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="aeo-card-3d mt-10 rounded-2xl p-6 text-center sm:p-8">
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            Measure your brand&apos;s AEO visibility now
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Run a free analysis across ChatGPT, Perplexity, and Gemini to see your presence,
            sentiment, and share of voice.
          </p>
          <Link
            href="/#top"
            className="aeo-btn-3d mt-4 inline-flex h-10 items-center gap-2 rounded-md px-5 text-sm font-semibold text-white"
          >
            <Radar className="size-4" />
            Run AEO Analysis
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <div className="mt-12">
            <h2 className="mb-4 text-lg font-bold tracking-tight text-foreground">
              Related articles
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <button
                  key={r.slug}
                  onClick={onBack}
                  className="aeo-card-soft group rounded-xl p-4 text-left transition-transform hover:-translate-y-0.5"
                >
                  <Badge className={"mb-2 border-transparent text-[10px] " + CATEGORY_COLOR[r.category]}>
                    {r.category}
                  </Badge>
                  <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                    {r.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{r.readTime}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </article>

      <footer className="mt-auto">
        <SiteFooter tagline="AEO, SEO & GEO insights" />
      </footer>
    </div>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="aeo-card-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground/80">
          <HelpCircle className="size-3.5 text-primary" />
          FAQ
        </div>
        <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Frequently asked questions about SEO &amp; AEO optimization
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Everything you need to know about optimizing for AI answer engines, structured data,
          and measuring your visibility.
        </p>
      </div>

      <div className="aeo-card-3d rounded-2xl p-4 sm:p-6">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-border/60 last:border-0"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ CTA */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Still have questions? Run the analyzer and see your AEO score in real time.
        </p>
        <Link
          href="/#top"
          className="aeo-btn-3d mt-3 inline-flex h-10 items-center gap-2 rounded-md px-5 text-sm font-semibold text-white"
        >
          <Radar className="size-4" />
          Run AEO Analysis
        </Link>
      </div>
    </section>
  );
}

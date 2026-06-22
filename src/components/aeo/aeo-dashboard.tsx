"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Smile,
  PieChart,
  Search,
  Bot,
  Radar,
  Globe,
  Sparkles,
  CheckCircle2,
  Loader2,
  Download,
  Printer,
} from "lucide-react";
import { ScoreGauge, scoreTone } from "./score-gauge";
import { MetricCard } from "./metric-card";
import { EnginePanel } from "./engine-panel";
import { useAeoStore } from "@/lib/store/aeo-store";

function EmptyState({ onLaunch }: { onLaunch?: () => void }) {
  return (
    <div className="aeo-card-3d rounded-3xl p-10 text-center sm:p-16">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-3xl bg-red-400/20 blur-xl" />
          <div className="relative flex size-16 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-[0_14px_30px_-8px_oklch(0.55_0.22_27/0.6)]">
            <Radar className="size-8" />
          </div>
          <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-white text-red-600 shadow-md ring-2 ring-red-500/20">
            <Bot className="size-3.5" />
          </span>
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            Measure your brand&apos;s AEO visibility
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Enter a target brand, optional website, and a query prompt above, then run the
            analysis. We&apos;ll query two AI answer engines, extract every brand mention, and
            score your visibility across presence, sentiment, and share of voice.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <Badge variant="secondary" className="gap-1 bg-white/70 px-3 py-1 text-red-700 dark:bg-white/5 dark:text-red-300">
            <Search className="size-3" /> ChatGPT
          </Badge>
          <Badge variant="secondary" className="gap-1 bg-white/70 px-3 py-1 text-red-700 dark:bg-white/5 dark:text-red-300">
            <Search className="size-3" /> Perplexity
          </Badge>
          <Badge variant="secondary" className="gap-1 bg-white/70 px-3 py-1 text-red-700 dark:bg-white/5 dark:text-red-300">
            <Smile className="size-3" /> Sentiment AI
          </Badge>
        </div>
        {onLaunch ? (
          <button
            onClick={onLaunch}
            className="aeo-btn-3d mt-2 inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white"
          >
            <Sparkles className="size-4" />
            Try an example
          </button>
        ) : null}
      </div>
    </div>
  );
}

function LoadingOverview({
  loading,
  result,
  errors,
}: {
  loading: Record<string, boolean | undefined>;
  result: { engines: Record<string, unknown> } | null;
  errors: Record<string, string | undefined>;
}) {
  return (
    <div className="aeo-card-3d overflow-hidden rounded-3xl p-8 sm:p-10">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-red-500/20" />
          <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-[0_10px_24px_-6px_oklch(0.55_0.22_27/0.6)]">
            <Radar className="size-7 animate-spin [animation-duration:3s]" />
          </div>
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            Analyzing your AEO visibility
          </h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Querying ChatGPT, Perplexity &amp; Gemini in parallel, then running sentiment
            analysis on every brand mention. This usually takes 20–40 seconds.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <EngineStatusPill label="ChatGPT" loading={loading.chatgpt} done={Boolean(result?.engines.chatgpt && !errors.chatgpt)} />
          <EngineStatusPill label="Perplexity" loading={loading.perplexity} done={Boolean(result?.engines.perplexity && !errors.perplexity)} />
          <EngineStatusPill label="Gemini" loading={loading.gemini} done={Boolean(result?.engines.gemini && !errors.gemini)} />
        </div>
      </div>
    </div>
  );
}

function EngineStatusPill({ label, loading, done }: { label: string; loading?: boolean; done: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors " +
        (done
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : loading
            ? "bg-red-500/10 text-red-700 dark:text-red-300"
            : "bg-muted text-muted-foreground")
      }
    >
      {done ? (
        <CheckCircle2 className="size-3.5" />
      ) : loading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <span className="size-1.5 rounded-full bg-current opacity-50" />
      )}
      {label}
    </span>
  );
}

export function AeoDashboard({ onLaunch }: { onLaunch?: () => void }) {
  const result = useAeoStore((s) => s.result);
  const loading = useAeoStore((s) => s.loading);
  const errors = useAeoStore((s) => s.errors);

  const chatgpt = result?.engines.chatgpt;
  const perplexity = result?.engines.perplexity;
  const gemini = result?.engines.gemini;
  const hasAny = Boolean(result) || Object.values(loading).some(Boolean);
  const isComputing = Object.values(loading).some(Boolean);

  if (!hasAny) return <EmptyState onLaunch={onLaunch} />;

  return (
    <div className="space-y-6">
      {/* Score overview */}
      {result && !isComputing ? (
        <div className="aeo-card-3d aeo-fade-up overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
            {/* Gauge */}
            <div className="flex shrink-0 flex-col items-center gap-3">
              <ScoreGauge value={result.total} sublabel={scoreTone(result.total).label} />
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">Aggregate AEO visibility</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  {result.website ? (
                    <>
                      <Globe className="size-3" />
                      <span className="max-w-[180px] truncate">{result.website}</span>
                    </>
                  ) : (
                    <span>averaged across all engines</span>
                  )}
                </p>
              </div>
            </div>

            {/* Metric cards — spacious grid with generous gaps */}
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
              <MetricCard
                title="Presence"
                description="Was the brand mentioned, and how often (capped at 5)."
                value={result.presence}
                max={40}
                pct={Math.round((result.presence / 40) * 100)}
                accent="emerald"
                icon={<Eye className="size-5" />}
              />
              <MetricCard
                title="Sentiment"
                description="Average sentiment quality of sentences mentioning the brand."
                value={result.sentiment}
                max={40}
                pct={Math.round((result.sentiment / 40) * 100)}
                accent="red"
                icon={<Smile className="size-5" />}
              />
              <MetricCard
                title="Share of Voice"
                description="Target mentions vs. all competitor brands in the answer."
                value={result.shareOfVoice}
                max={20}
                pct={Math.round((result.shareOfVoice / 20) * 100)}
                accent="amber"
                icon={<PieChart className="size-5" />}
              />
            </div>
          </div>
        </div>
      ) : (
        <LoadingOverview loading={loading} result={result} errors={errors} />
      )}

      {/* Per-engine analysis tabs */}
      <div className="aeo-card-3d rounded-3xl p-4 sm:p-6">
        <Tabs defaultValue="chatgpt" className="w-full">
          <TabsList className="h-auto w-full justify-start gap-1 rounded-2xl bg-muted/50 p-1.5">
            <TabsTrigger
              value="chatgpt"
              className="gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-red-300"
            >
              <Bot className="size-4" />
              ChatGPT Analysis
              {loading.chatgpt ? (
                <span className="ml-1 size-1.5 animate-pulse rounded-full bg-red-500" />
              ) : null}
            </TabsTrigger>
            <TabsTrigger
              value="perplexity"
              className="gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-red-300"
            >
              <Search className="size-4" />
              Perplexity Analysis
              {loading.perplexity ? (
                <span className="ml-1 size-1.5 animate-pulse rounded-full bg-red-500" />
              ) : null}
            </TabsTrigger>
            <TabsTrigger
              value="gemini"
              className="gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-red-300"
            >
              <Sparkles className="size-4" />
              Gemini Analysis
              {loading.gemini ? (
                <span className="ml-1 size-1.5 animate-pulse rounded-full bg-red-500" />
              ) : null}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chatgpt" className="mt-4">
            <EnginePanel
              analysis={chatgpt}
              loading={Boolean(loading.chatgpt)}
              error={errors.chatgpt}
            />
          </TabsContent>
          <TabsContent value="perplexity" className="mt-4">
            <EnginePanel
              analysis={perplexity}
              loading={Boolean(loading.perplexity)}
              error={errors.perplexity}
            />
          </TabsContent>
          <TabsContent value="gemini" className="mt-4">
            <EnginePanel
              analysis={gemini}
              loading={Boolean(loading.gemini)}
              error={errors.gemini}
            />
          </TabsContent>
        </Tabs>
      </div>

      {result ? (
        <div className="flex flex-col items-center gap-4">
          {/* Download + Print buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/api/report", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(result),
                  });
                  if (!res.ok) throw new Error("Report generation failed");
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `aeoscope-report-${result.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${new Date(result.createdAt).toISOString().slice(0, 10)}.html`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error("Report download failed:", err);
                }
              }}
              className="aeo-btn-3d inline-flex h-10 items-center gap-2 rounded-md px-5 text-sm font-semibold text-white"
            >
              <Download className="size-4" />
              Download report (HTML)
            </button>
            <button
              onClick={() => window.print()}
              className="aeo-card-soft inline-flex h-10 items-center gap-2 rounded-md px-5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              <Printer className="size-4 text-primary" />
              Print / Save as PDF
            </button>
          </div>

          {/* Caption */}
          <p className="text-center text-xs text-muted-foreground">
            Showing analysis for{" "}
            <span className="font-semibold text-foreground">{result.brand}</span>
            {result.website ? (
              <>
                {" "}
                ·{" "}
                <span className="inline-flex items-center gap-0.5">
                  <Globe className="size-3" />
                  <span className="truncate">{result.website}</span>
                </span>
              </>
            ) : null}{" "}
            · <span className="italic">&ldquo;{result.query}&rdquo;</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}

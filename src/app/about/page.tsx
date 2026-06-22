import { LegalPage, Bullet } from "@/components/aeo/legal-page";
import { Radar, Target, Eye, Users } from "lucide-react";

export const metadata = {
  title: "About Us — AEOScope",
  description:
    "AEOScope helps brands measure and improve their visibility across AI answer engines — ChatGPT, Perplexity, and Google Gemini.",
};

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About Us"
      title="We measure what AI says about your brand"
      description="AEOScope is built for the generative search era — when customers ask ChatGPT, Perplexity, and Gemini for recommendations before they ever visit a search results page."
    >
      <h2>Our mission</h2>
      <p>
        As AI answer engines reshape how people discover products and services, traditional SEO
        rankings no longer tell the whole story. A brand can rank well on Google and still be
        invisible inside the AI answers that increasingly replace the results page. AEOScope
        exists to close that gap — giving every brand a clear, measurable view of how it shows up
        across the three major answer engines.
      </p>

      <h2>What we do</h2>
      <p>
        AEOScope queries ChatGPT, Perplexity, and Google Gemini with your brand and description,
        then analyzes every response with transformer-based sentiment analysis. We score your
        visibility on three dimensions — presence, sentiment, and share of voice — and combine
        them into a single AEO visibility score out of 100.
      </p>
      <ul>
        <Bullet>Free analyzer covering ChatGPT, Perplexity, and Gemini</Bullet>
        <Bullet>Transformer-based sentiment analysis on every brand mention</Bullet>
        <Bullet>Share-of-voice measurement against competitors</Bullet>
        <Bullet>Full audit and done-for-you optimization services</Bullet>
      </ul>

      <h2>Our values</h2>
      <div className="not-prose mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="aeo-card-soft rounded-xl p-4">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Target className="size-5" />
          </span>
          <h3 className="mt-3 text-sm font-bold text-foreground">Clarity first</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            AEO is complex. Our job is to make it legible — one score, one dashboard, clear next steps.
          </p>
        </div>
        <div className="aeo-card-soft rounded-xl p-4">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Eye className="size-5" />
          </span>
          <h3 className="mt-3 text-sm font-bold text-foreground">Honest measurement</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            We show you the raw AI answers, not just a score. You can always verify what the model actually said.
          </p>
        </div>
        <div className="aeo-card-soft rounded-xl p-4">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="size-5" />
          </span>
          <h3 className="mt-3 text-sm font-bold text-foreground">Built for marketers</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            The tool is designed for the people who own brand visibility — no ML PhD required to read the results.
          </p>
        </div>
      </div>

      <h2>Get started</h2>
      <p>
        Run a free analysis on the{" "}
        <a href="/" className="font-semibold text-primary hover:underline">home page</a>, or read
        our{" "}
        <a href="/blog" className="font-semibold text-primary hover:underline">blog</a>{" "}
        for in-depth AEO, SEO, and GEO guides. Ready for a full audit or hands-on help?{" "}
        <a href="/contact" className="font-semibold text-primary hover:underline">Contact us</a>.
      </p>
    </LegalPage>
  );
}

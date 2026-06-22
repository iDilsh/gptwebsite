"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "What does the AEOScope analyzer actually measure?",
    a: "It queries ChatGPT, Perplexity, and Google Gemini with your brand and description, then scores your visibility on three dimensions: Presence (is your brand mentioned), Sentiment (positive vs negative tone of those mentions), and Share of Voice (your mentions vs competitors). These combine into a single AEO visibility score out of 100.",
  },
  {
    q: "Do I need to provide a query or description?",
    a: "No — the Description field is optional. If you leave it blank, AEOScope auto-generates discovery questions from your brand name and website (e.g. 'What is {brand}?', 'How does {brand} compare?', 'Is {brand} worth choosing?') and runs those across all three engines. Providing a specific description gives more targeted results.",
  },
  {
    q: "Which AI answer engines are supported?",
    a: "Three engines: ChatGPT, Perplexity, and Google Gemini. Each runs in parallel and gets its own tab in the dashboard with the raw answer (brand mentions highlighted), a sentiment table, and share-of-voice context. The aggregate score averages all three.",
  },
  {
    q: "Is my data stored or shared?",
    a: "No. Your brand name, website, and description are used only to generate the analysis for your current session and are not persisted to a database or shared with third parties. Each analysis runs fresh in your browser session via our API.",
  },
  {
    q: "How is this different from a regular SEO tool?",
    a: "Traditional SEO tools track keyword rankings on a results page of links. AEOScope tracks whether your brand is mentioned inside the AI-generated answers that increasingly replace that results page. It measures presence, sentiment, and share of voice inside ChatGPT, Perplexity, and Gemini — surfaces classic rank trackers can't see.",
  },
];

export function HomeFaq() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="aeo-card-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground/80">
          <HelpCircle className="size-3.5 text-primary" />
          FAQ
        </div>
        <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Everything you need to know about the AEOScope analyzer and AEO visibility.
        </p>
      </div>

      <div className="aeo-card-3d rounded-2xl p-4 sm:p-6">
        <Accordion type="single" collapsible className="w-full">
          {HOME_FAQS.map((item, i) => (
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

      <p className="mt-6 text-center text-xs text-muted-foreground">
        For more in-depth guides, visit our{" "}
        <a href="/blog" className="font-semibold text-primary hover:underline">
          blog
        </a>{" "}
        and{" "}
        <a href="/blog#faq" className="font-semibold text-primary hover:underline">
          full FAQ
        </a>
        .
      </p>
    </section>
  );
}

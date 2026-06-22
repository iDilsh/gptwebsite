"use client";

import type { ArticleBlock } from "@/lib/blog/content";
import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

/** Renders an article's structured blocks as styled prose. */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i} className="text-foreground/90">{b.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                className="mt-8 scroll-mt-24 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-6 scroll-mt-24 text-lg font-bold tracking-tight text-foreground"
              >
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-1.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/90">{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                      {j + 1}
                    </span>
                    <span className="pt-0.5 text-foreground/90">{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary/60 bg-primary/5 py-3 pl-4 pr-3 text-base font-medium italic text-foreground"
              >
                {b.text}
              </blockquote>
            );
          case "callout":
            return (
              <div
                key={i}
                className={cn(
                  "aeo-card-soft rounded-xl border-l-4 border-primary/60 p-4",
                )}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {b.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">{b.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

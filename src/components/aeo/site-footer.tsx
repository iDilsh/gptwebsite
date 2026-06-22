"use client";

import Link from "next/link";
import { Radar } from "lucide-react";

const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Blog", href: "/blog" },
];

const ANALYZER_LINKS = [
  { label: "Back to analyzer", href: "/" },
];

interface SiteFooterProps {
  /** Tagline shown beside the logo. */
  tagline?: string;
  /** Show a "Back to analyzer" link (default true on sub-pages). */
  showBackLink?: boolean;
}

export function SiteFooter({ tagline = "Powered by transformer-based sentiment analysis", showBackLink = true }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-border/40 bg-white/40 backdrop-blur dark:bg-white/5">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="aeo-gradient-pill flex size-6 items-center justify-center rounded-lg text-white">
              <Radar className="size-3.5" />
            </span>
            FREE AEO - by iDilsh.Top
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ))}
            {showBackLink
              ? ANALYZER_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                    {l.label} →
                  </Link>
                ))
              : null}
          </nav>
        </div>
        <p className="mt-4 text-center text-[11px] text-muted-foreground/70 sm:text-left">
          © {new Date().getFullYear()} FREE AEO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

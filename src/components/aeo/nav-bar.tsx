"use client";

import { useState } from "react";
import { Radar, Menu, X, BookOpen, Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandImage } from "./brand-image";

interface NavBarProps {
  onLaunch?: () => void;
}

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/blog#faq" },
];

export function NavBar({ onLaunch }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className="aeo-glass aeo-nav-blur mx-auto flex h-20 max-w-7xl items-center justify-between rounded-2xl px-3 pl-4 shadow-[0_8px_30px_-12px_oklch(0.45_0.14_310/0.25)] sm:px-4"
        style={{
          backgroundColor: "rgb(255 255 255 / 0.55)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
        }}
      >
        {/* Logo — drop your logo at /public/images/brand/logo.png to replace the icon */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="relative flex size-8 items-center justify-center rounded-xl shadow-[0_4px_12px_-2px_oklch(0.5_0.2_300/0.5)]">
            <BrandImage
              src="/images/brand/logo.png"
              alt="AEO analysis logo"
              className="size-8 rounded-xl"
              imgClassName="rounded-xl"
              fallback={
                <span className="aeo-gradient-pill flex size-8 items-center justify-center rounded-xl text-white">
                  <Radar className="size-4.5" />
                </span>
              }
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-foreground">
              FREE <span className="aeo-gradient-text">AEO</span>
            </span>
            <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">
              Visibility Checker
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => ( 
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            aria-label="Documentation"
          >
            <BookOpen className="size-4" />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            aria-label="Source"
          >
            <Github className="size-4" />
          </a>
          <Button
            onClick={() => (onLaunch ? onLaunch() : (window.location.href = "/#top"))}
            className="aeo-btn-3d h-9 gap-1.5 rounded-xl border-0 px-4 text-white"
          >
            <Sparkles className="size-3.5" />
            Launch App
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "aeo-glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl transition-all duration-300 md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 p-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent/60"
              aria-label="Documentation"
            >
              <BookOpen className="size-4" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent/60"
              aria-label="Source"
            >
              <Github className="size-4" />
            </a>
            <Button
              onClick={() => {
                setOpen(false);
                if (onLaunch) onLaunch();
                else window.location.href = "/#top";
              }}
              className="aeo-btn-3d flex-1 gap-1.5 rounded-xl border-0 text-white"
            >
              <Sparkles className="size-3.5" />
              Launch App
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

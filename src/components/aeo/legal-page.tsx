"use client";

import { NavBar } from "@/components/aeo/nav-bar";
import { SiteFooter } from "@/components/aeo/site-footer";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

/** Shared shell for the About / Privacy / Contact / Terms pages.
 * Uses the red theme to match the rest of the marketing surface. */
export function LegalPage({ eyebrow, title, description, children }: LegalPageProps) {
  return (
    <div className="red-theme aeo-mesh-bg flex min-h-screen flex-col">
      <NavBar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="aeo-card-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground/80">
          {eyebrow}
        </div>
        <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="aeo-card-3d mt-8 rounded-2xl p-6 sm:p-8">
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90 [&_h2]:mt-8 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground [&_ul]:space-y-1.5 [&_ul]:pl-1 [&_li]:flex [&_li]:gap-2.5 [&_p]:text-foreground/90">
            {children}
          </div>
        </div>
      </main>

      <SiteFooter tagline="AEO, SEO & GEO insights" />
    </div>
  );
}

/** A small helper for checkmark list items inside legal pages. */
export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
      <span>{children}</span>
    </li>
  );
}

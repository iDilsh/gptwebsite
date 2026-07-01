import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⬇️ CHANGE THIS to your deployed domain
const SITE_URL = "https://wwww.aeotool.top";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free AEO — Ai Visibility Checker | ChatGPT, Perplexity & Gemini",
    template: "%s | Free AEO",
  },
  description:
    "Free AEO visibility checker. Check your brand visibility in ChatGPT, Google Gemini, and Perplexity. Get AI mention analysis, sentiment insights, and a visibility score.",
  keywords: [
    "AEO",
    "Answer Engine Optimization",
    "GEO",
    "Generative Engine Optimization",
    "brand visibility",
    "AI search visibility",
    "ChatGPT brand monitoring",
    "Perplexity optimization",
    "Google Gemini",
    "sentiment analysis",
    "AI search optimization",
  ],
  authors: [{ name: "Free AEO" }],
  creator: "FREE AEO",
  // Favicon — drop your own icon files in /public (see instructions below).
  // Next.js auto-detects /public/favicon.ico and /public/icon.png.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  // Open Graph — what shows when someone shares your link on social media
  openGraph: {
    title: "Free AEO — Ai Visibility Checker",
    description:
      "Measure your brand's visibility across ChatGPT, Perplexity, and Google Gemini. Free AEO analysis with sentiment scoring.",
    url: SITE_URL,
    siteName: "Free AEO",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AEO TOOL — Ai Visibility Checker",
      },
    ],
  },
  // Twitter Card — what shows when shared on Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Free AEO — Ai Visibility Checker",
    description:
      "Measure your brand's visibility across ChatGPT, Perplexity, and Google Gemini. Free AEO analysis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Adsterra ad script */}
        <Script
          src="https://pl30153867.effectivecpmnetwork.com/ed/79/df/ed79df718ed64ee310ef53f3cbe484bf.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <script src="https://pl30154133.effectivecpmnetwork.com/e5/1a/18/e51a181e46c7274c2b92d27bd322d6b2.js"></script>
      </body>
    </html>
  );
}

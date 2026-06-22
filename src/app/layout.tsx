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

// ⬇️ CHANGE THIS to your deployed domain (e.g. "https://aeoscope.com")
const SITE_URL = "https://wwww.idilshnet.top";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AEOScope — AEO Visibility Checker | ChatGPT, Perplexity & Gemini",
    template: "%s | AEOScope",
  },
  description:
    "Free AEO visibility checker. See how your brand shows up in ChatGPT, Perplexity, and Google Gemini answers. Get your presence, sentiment, and share-of-voice score in seconds.",
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
  authors: [{ name: "AEOScope" }],
  creator: "AEOScope",
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
    title: "AEOScope — AEO Visibility Checker",
    description:
      "Measure your brand's visibility across ChatGPT, Perplexity, and Google Gemini. Free AEO analysis with sentiment scoring.",
    url: SITE_URL,
    siteName: "AEOScope",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AEOScope — AEO Visibility Checker",
      },
    ],
  },
  // Twitter Card — what shows when shared on Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "AEOScope — AEO Visibility Checker",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

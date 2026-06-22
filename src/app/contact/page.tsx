"use client";

import { useState } from "react";
import { LegalPage } from "@/components/aeo/legal-page";
import { Mail, MessageSquare, Globe, Send, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Compose a mailto link so the message opens in the user's email client.
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:hello@idilsh.top?subject=${encodeURIComponent(
      subject || "AEOScope inquiry",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <LegalPage
      eyebrow="Contact"
      title="Let's talk about your AEO visibility"
      description="Questions about the analyzer, want a full audit, or need done-for-you optimization? We'd love to hear from you."
    >
      <div className="not-prose grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.2fr]">
        {/* Contact info */}
        <div className="space-y-4">
          <div className="aeo-card-soft rounded-xl p-5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-foreground">Email us</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              For support, partnerships, or general questions.
            </p>
            <a
              href="mailto:hello@idilsh.top"
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              hello@idilsh.top
            </a>
          </div>

          <div className="aeo-card-soft rounded-xl p-5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Globe className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-foreground">Website</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Visit our parent site for full audit and optimization services.
            </p>
            <a
              href="https://www.idilsh.top"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              www.idilsh.top ↗
            </a>
          </div>

          <div className="aeo-card-soft rounded-xl p-5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-foreground">Response time</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              We typically reply within 1–2 business days. For urgent audit requests, mention
              &quot;urgent audit&quot; in the subject.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="aeo-card-3d rounded-2xl p-6 sm:p-7">
          <h3 className="text-lg font-bold tracking-tight text-foreground">Send us a message</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the form and your email client will open with the message pre-filled.
          </p>

          {sent ? (
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
              <p className="text-sm font-semibold text-foreground">
                Your email should have opened.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                If it didn&apos;t, email us directly at{" "}
                <a href="mailto:hello@idilsh.top" className="font-semibold text-primary hover:underline">
                  hello@idilsh.top
                </a>.
              </p>
              <button
                onClick={() => setSent(false)}
                className="aeo-card-soft mt-4 inline-flex h-9 items-center gap-2 rounded-md px-4 text-xs font-semibold text-foreground"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-md border border-border/70 bg-white/70 px-3 text-sm shadow-inner outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 dark:bg-white/5"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-md border border-border/70 bg-white/70 px-3 text-sm shadow-inner outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 dark:bg-white/5"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-11 w-full rounded-md border border-border/70 bg-white/70 px-3 text-sm shadow-inner outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 dark:bg-white/5"
                  placeholder="What's this about?"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-md border border-border/70 bg-white/70 px-3 py-2.5 text-sm shadow-inner outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 dark:bg-white/5"
                  placeholder="Tell us about your brand or what you need..."
                />
              </div>
              <button
                type="submit"
                className="aeo-btn-3d inline-flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-white"
              >
                <Send className="size-4" />
                Send message
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </LegalPage>
  );
}

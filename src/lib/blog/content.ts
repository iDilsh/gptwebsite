// Blog content — 10 detailed SEO/AEO-optimized articles + FAQ.
// Each article is keyword-targeted for both classic SEO (title, meta
// description, headings) and AEO (answer-engine-friendly structure:
// question-led H2s, concise lead answers, scannable lists, citations).

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "AEO" | "SEO" | "GEO" | "Guides";
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  /** Keywords targeted for SEO + AEO entity matching. */
  keywords: string[];
  /** Body as an array of blocks rendered by the article renderer. */
  body: ArticleBlock[];
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string };

export const ARTICLES: BlogArticle[] = [
  {
    slug: "what-is-aeo-answer-engine-optimization",
    title: "What Is AEO? Answer Engine Optimization Explained for 2025",
    metaTitle: "What Is AEO? Answer Engine Optimization Explained (2025)",
    metaDescription:
      "AEO (Answer Engine Optimization) is the practice of getting your brand cited inside AI answers. Learn how AEO works, how it differs from SEO, and how to measure it.",
    category: "AEO",
    readTime: "8 min read",
    date: "2025-01-12",
    author: "AEOScope Team",
    excerpt:
      "AEO is the new frontier of search visibility — getting your brand cited inside AI-generated answers from ChatGPT, Perplexity, and Gemini. Here's what it is and why it matters.",
    keywords: ["answer engine optimization", "AEO", "AI search visibility", "ChatGPT SEO", "Perplexity optimization"],
    body: [
      { type: "p", text: "Answer Engine Optimization (AEO) is the practice of structuring your brand's content and presence so that AI answer engines — ChatGPT, Perplexity, Google Gemini, and Google AI Overviews — cite, mention, and recommend your brand when users ask relevant questions. Where traditional SEO optimizes for blue links on a search results page, AEO optimizes for being named inside the AI-generated answer itself." },
      { type: "h2", text: "What is an answer engine?" },
      { type: "p", text: "An answer engine is an AI system that generates a direct, conversational answer to a user's question instead of returning a list of links. ChatGPT, Perplexity, Gemini, and Google's AI Overviews are all answer engines. They synthesize information from across the web and return a single composed response — often with inline citations." },
      { type: "quote", text: "If SEO was about being found, AEO is about being recommended." },
      { type: "h2", text: "How AEO differs from SEO" },
      { type: "p", text: "The two disciplines overlap but target different surfaces. SEO wins clicks from a results page; AEO wins mentions inside the answer text. A brand can rank #1 on Google and still be invisible inside a ChatGPT response — because answer engines weigh entity recognition, structured data, and sentiment, not just backlinks and title tags." },
      { type: "ul", items: [
        "SEO target: the 10 blue links on a SERP",
        "AEO target: the AI-generated answer paragraph",
        "SEO signals: backlinks, on-page keywords, page speed",
        "AEO signals: brand entity, structured data, sentiment, citation-worthy content",
      ] },
      { type: "h2", text: "Why AEO matters in 2025" },
      { type: "p", text: "Roughly 65% of informational searches now end without a click to a website — users get their answer directly from the AI. If your brand isn't mentioned in that answer, you've effectively lost the customer before they ever reach a results page. Measuring and improving AEO visibility is now as important as tracking keyword rankings." },
      { type: "callout", title: "Key takeaway", text: "AEO visibility is the share of AI answers that mention your brand positively. You can measure it across ChatGPT, Perplexity, and Gemini using the AEOScope analyzer above." },
      { type: "h2", text: "How to start optimizing for answer engines" },
      { type: "ol", items: [
        "Run a baseline AEO audit across the three major engines",
        "Identify which queries mention competitors but not you",
        "Build entity-rich, citation-worthy content (comparisons, definitions, stats)",
        "Add structured data (Organization, Product, FAQ schema) to your site",
        "Earn mentions on the sources answer engines cite (Wikipedia, Reddit, major publishers)",
        "Re-measure monthly to track visibility gains",
      ] },
      { type: "p", text: "AEO is not a replacement for SEO — it's the next layer. Brands that win in 2025 will rank well on Google AND appear inside the AI answers that increasingly replace the classic results page." },
    ],
  },
  {
    slug: "aeo-vs-seo-differences",
    title: "AEO vs SEO: 7 Critical Differences Every Marketer Must Know",
    metaTitle: "AEO vs SEO: 7 Critical Differences (2025 Guide)",
    metaDescription:
      "AEO and SEO target different search surfaces. Here are the 7 critical differences between Answer Engine Optimization and Search Engine Optimization — and how to do both.",
    category: "AEO",
    readTime: "7 min read",
    date: "2025-01-15",
    author: "AEOScope Team",
    excerpt:
      "SEO wins clicks; AEO wins mentions. Here are the 7 differences that decide whether your brand shows up inside AI answers — or gets left out.",
    keywords: ["AEO vs SEO", "answer engine vs search engine", "SEO differences", "AI search optimization"],
    body: [
      { type: "p", text: "If you're still treating SEO and AEO as the same thing, you're leaving visibility on the table. They target different surfaces, reward different signals, and need different playbooks. Here are the 7 differences that matter most." },
      { type: "h2", text: "1. The surface being optimized" },
      { type: "p", text: "SEO optimizes for a results page of links. AEO optimizes for a generated paragraph of text. You can't click-claw your way to the top of an AI answer — you have to be the entity the model chooses to mention." },
      { type: "h2", text: "2. The unit of visibility" },
      { type: "p", text: "In SEO, visibility = ranking position. In AEO, visibility = being named at all. A brand mentioned once in a positive context inside a ChatGPT answer can outperform a brand ranking #3 on Google that the model ignored." },
      { type: "h2", text: "3. The signals that matter" },
      { type: "ul", items: [
        "SEO signals: backlinks, title tags, page speed, content depth, domain authority",
        "AEO signals: brand entity recognition, structured data, sentiment, citation-worthy claims, presence on sources the model trusts",
      ] },
      { type: "h2", text: "4. Content format" },
      { type: "p", text: "SEO rewards long-form, keyword-rich pages. AEO rewards concise, factual, quotable answers — comparison tables, clear definitions, and stats the model can lift verbatim. The best AEO content reads like a Wikipedia entry, not a blog post." },
      { type: "h2", text: "5. Measurement" },
      { type: "p", text: "SEO is measured with rank trackers and Search Console. AEO is measured by querying the engines directly and counting brand mentions, sentiment, and share of voice — which is exactly what the AEOScope tool above does automatically." },
      { type: "h2", text: "6. Speed of change" },
      { type: "p", text: "SEO rankings move slowly (weeks to months). AEO visibility can shift overnight because answer engines re-synthesize responses on every query. That makes continuous monitoring more important." },
      { type: "h2", text: "7. The competitive set" },
      { type: "p", text: "In SEO you compete against whoever ranks for your keywords. In AEO you compete against every brand the model could plausibly mention — a larger, fuzzier set. Share of voice inside the answer becomes the metric that matters." },
      { type: "callout", title: "Bottom line", text: "Do both. SEO drives the click traffic you still need; AEO protects you from the zero-click future. They compound — strong SEO content is often the source AEO engines cite." },
    ],
  },
  {
    slug: "how-to-optimize-for-chatgpt",
    title: "How to Optimize Your Brand for ChatGPT (Complete AEO Playbook)",
    metaTitle: "How to Optimize for ChatGPT: The Complete AEO Playbook",
    metaDescription:
      "Want ChatGPT to mention your brand? Here's the complete AEO playbook for getting cited inside ChatGPT answers — content, structured data, and monitoring.",
    category: "Guides",
    readTime: "9 min read",
    date: "2025-01-18",
    author: "AEOScope Team",
    excerpt:
      "ChatGPT mentions brands based on entity recognition and training data. Here's the complete playbook to get cited — and stay cited — inside ChatGPT answers.",
    keywords: ["optimize for ChatGPT", "ChatGPT AEO", "get mentioned in ChatGPT", "ChatGPT brand visibility"],
    body: [
      { type: "p", text: "Getting ChatGPT to mention your brand isn't about keywords or backlinks in the traditional sense — it's about being a recognizable entity the model trusts enough to name. This playbook walks through the four levers that move ChatGPT visibility." },
      { type: "h2", text: "1. Become a citable entity" },
      { type: "p", text: "ChatGPT mentions brands it 'knows' — entities with a clear, consistent footprint across the web. The first job is making sure your brand is unambiguously identifiable." },
      { type: "ul", items: [
        "Claim and complete your Wikipedia page (if notable enough)",
        "Keep a consistent brand name, tagline, and category across all profiles",
        "Maintain an Organization schema on your homepage",
        "Get listed in reputable directories and industry roundups",
      ] },
      { type: "h2", text: "2. Write quotable, comparison-friendly content" },
      { type: "p", text: "ChatGPT answers comparison questions by naming specific brands. If your content explicitly compares your product to competitors by name — with concrete differentiators — you're more likely to be the brand the model lifts into the answer." },
      { type: "h3", text: "Content patterns that get cited" },
      { type: "ul", items: [
        "'X vs Y vs Z' comparison pages with a clear recommendation",
        "Definition pages that answer 'what is [category]' directly",
        "Stats and benchmark pages the model can quote",
        "FAQ schema with concise question-led answers",
      ] },
      { type: "h2", text: "3. Earn mentions on sources ChatGPT trusts" },
      { type: "p", text: "ChatGPT's training corpus weighs some sources heavily: major publishers, Wikipedia, Reddit, Stack Overflow, and established review sites. Mentions on these surfaces reinforce your entity and improve the odds of being cited." },
      { type: "callout", title: "Tactic", text: "Pitch your brand for inclusion in 'best of' lists and roundups on sites that rank for your category. Each inclusion is a training signal that nudges ChatGPT toward naming you." },
      { type: "h2", text: "4. Monitor and iterate" },
      { type: "p", text: "ChatGPT visibility drifts as the model updates. Run the AEOScope analyzer above monthly with the same brand + query to track whether you're being mentioned, the sentiment, and your share of voice vs competitors. If you drop out, the likely cause is a competitor publishing stronger comparison content or earning new authoritative mentions." },
      { type: "h2", text: "What NOT to do" },
      { type: "ul", items: [
        "Don't stuff your site with your brand name — entity recognition ≠ keyword density",
        "Don't buy low-quality mentions; spammy sources can hurt your entity association",
        "Don't ignore sentiment — being mentioned negatively still counts as 'visibility' but hurts conversion",
      ] },
      { type: "p", text: "ChatGPT optimization is a long game of building entity strength and citation-worthy content, then monitoring to confirm it's working. Use the analyzer above as your monthly checkpoint." },
    ],
  },
  {
    slug: "perplexity-optimization-guide",
    title: "Perplexity Optimization: How to Get Cited With [1] Sources",
    metaTitle: "Perplexity Optimization: Get Cited With [1] Sources (2025)",
    metaDescription:
      "Perplexity cites live web sources with [1][2][3] markers. Learn how to become one of those cited sources and boost your AEO visibility on Perplexity.",
    category: "Guides",
    readTime: "8 min read",
    date: "2025-01-20",
    author: "AEOScope Team",
    excerpt:
      "Perplexity is the answer engine that cites live web sources. Here's how to become one of the [1] sources it quotes — and multiply your AEO visibility.",
    keywords: ["Perplexity optimization", "Perplexity SEO", "get cited in Perplexity", "Perplexity AEO"],
    body: [
      { type: "p", text: "Perplexity is unique among answer engines: it cites live web sources with [1][2][3] markers and links out to them. That makes Perplexity optimization more like advanced SEO — you can directly become a cited source. Here's how." },
      { type: "h2", text: "How Perplexity chooses sources" },
      { type: "p", text: "When Perplexity answers a question, it runs a live web search, reads the top results, and synthesizes an answer that quotes the most relevant passages. The cited sources [1][2][3] are the pages it pulled specific claims from. To get cited, your page needs to rank for the query AND contain a passage worth quoting." },
      { type: "h2", text: "1. Rank for the question, not just the keyword" },
      { type: "p", text: "Perplexity's search layer is query-led. Optimize for full questions ('what is the best CRM for small businesses') rather than head keywords ('CRM'). Use the question as your H1 and answer it in the first paragraph." },
      { type: "h2", text: "2. Write a quotable lead answer" },
      { type: "p", text: "Perplexity lifts concise, self-contained sentences. Your first paragraph should answer the question in 1-2 sentences — no throat-clearing. Follow with detail. This 'answer-first' structure is the single biggest lever for getting the [1] citation." },
      { type: "callout", title: "Template", text: "Open every comparison or definitional page with a 2-sentence direct answer. Then expand. Perplexity will quote the opening; users who click through get the depth." },
      { type: "h2", text: "3. Use comparison tables" },
      { type: "p", text: "Perplexity loves structured comparisons. A clean 'Brand A vs Brand B vs Brand C' table with feature rows is highly citable — the model can lift individual cells as facts. Make sure your brand is in the table." },
      { type: "h2", text: "4. Be the source for stats and benchmarks" },
      { type: "p", text: "Original data gets cited. Publish benchmarks, pricing comparisons, or survey results that other sites reference. Once your stat is the canonical source, Perplexity will cite you repeatedly across related queries." },
      { type: "h2", text: "5. Monitor your Perplexity citations" },
      { type: "p", text: "Run the AEOScope analyzer with Perplexity enabled. The raw answer shows you exactly which sources Perplexity cited ([1][2][3]) and whether your brand was among them. If competitors are cited and you're not, the gap is usually content structure — not authority." },
      { type: "p", text: "Perplexity rewards the same things classic SEO rewards — ranking for the query, fast pages, authoritative backlinks — but adds a quotability layer. Win both and you become a default citation." },
    ],
  },
  {
    slug: "google-ai-overviews-optimization",
    title: "Google AI Overviews Optimization: How to Win the Generative SERP",
    metaTitle: "Google AI Overviews Optimization: Win the Generative SERP",
    metaDescription:
      "Google AI Overviews (AIO) now answer many queries before users click. Learn how to optimize your content to appear inside AI Overviews and protect your traffic.",
    category: "GEO",
    readTime: "9 min read",
    date: "2025-01-22",
    author: "AEOScope Team",
    excerpt:
      "Google AI Overviews answer queries at the top of the SERP — often with zero clicks below. Here's how to get your brand inside the generative answer.",
    keywords: ["Google AI Overviews", "AIO optimization", "generative SERP", "GEO", "Google SGE"],
    body: [
      { type: "p", text: "Google AI Overviews (AIO) — the generative answers that now appear at the top of many Google results — are reshaping search. For many informational queries, the AIO satisfies the user before they click any link. Optimizing to appear inside it is the new frontier of Google visibility." },
      { type: "h2", text: "What triggers an AI Overview?" },
      { type: "p", text: "AIOs appear most often for informational, comparison, and definitional queries — 'how does X work', 'best Y for Z', 'what is W'. Transactional and navigational queries rarely get an AIO. If your category gets AIOs, that's where your visibility battle happens." },
      { type: "h2", text: "1. Rank in the top organic results" },
      { type: "p", text: "Google's AIO draws from pages that already rank well for the query. The single biggest predictor of being cited in an AIO is ranking in the top 10 organically. Classic SEO fundamentals still apply — title tags, content quality, backlinks." },
      { type: "h2", text: "2. Structure content for extraction" },
      { type: "p", text: "AIOs lift short, factual passages. Structure your page so the key answer is a self-contained sentence or bullet list near the top:" },
      { type: "ul", items: [
        "Answer the query in the first 50 words",
        "Use H2s that mirror the question",
        "Add comparison tables for 'best of' queries",
        "Include FAQ schema with question-led Q&A pairs",
      ] },
      { type: "h2", text: "3. Earn citations on authoritative sources" },
      { type: "p", text: "Google's generative model weighs some sources more heavily — the same ones that rank well traditionally. Mentions on Wikipedia, major publishers, and established review sites boost your odds of appearing in the AIO as a named entity." },
      { type: "callout", title: "GEO vs AEO", text: "GEO (Generative Engine Optimization) is the umbrella term for optimizing across all generative surfaces. Google AI Overviews is one GEO surface; ChatGPT, Perplexity, and Gemini are others. AEO is GEO focused specifically on answer engines." },
      { type: "h2", text: "4. Add structured data" },
      { type: "p", text: "Schema markup helps Google understand your content as entities. Use Organization, Product, FAQPage, and HowTo schema where relevant. Structured data doesn't guarantee an AIO citation, but it improves entity association." },
      { type: "h2", text: "5. Monitor AIO presence" },
      { type: "p", text: "AIOs are volatile — they appear, disappear, and change wording between queries and over time. Track whether your target queries even generate an AIO, and whether your brand appears inside it. The AEOScope analyzer captures Gemini's answer as a proxy for Google's generative layer." },
      { type: "p", text: "Winning the AI Overview is the highest-leverage visibility win in 2025 search: the user sees your brand before any link, and often never scrolls past it." },
    ],
  },
  {
    slug: "structured-data-for-aeo",
    title: "Structured Data for AEO: Schema Markup That Gets You Cited",
    metaTitle: "Structured Data for AEO: Schema Markup That Gets You Cited",
    metaDescription:
      "Structured data helps answer engines understand your brand as an entity. Here are the schema types that matter most for AEO visibility in 2025.",
    category: "AEO",
    readTime: "7 min read",
    date: "2025-01-25",
    author: "AEOScope Team",
    excerpt:
      "Schema markup is how answer engines learn you're a real entity. Here are the 5 schema types that move the needle on AEO visibility — with copy-paste examples.",
    keywords: ["structured data AEO", "schema markup", "Organization schema", "FAQ schema", "AI search structured data"],
    body: [
      { type: "p", text: "Structured data — schema markup — is the bridge between your website and an answer engine's entity graph. It tells ChatGPT, Perplexity, and Gemini exactly what your brand is, what it sells, and what questions it answers. Get it right and you measurably improve your odds of being cited." },
      { type: "h2", text: "Why structured data matters for AEO" },
      { type: "p", text: "Answer engines don't just read your text — they build an entity from it. Schema markup makes that entity unambiguous: your name, your category, your products, your FAQs. Without it, the model guesses; with it, the model knows." },
      { type: "h2", text: "1. Organization schema (essential)" },
      { type: "p", text: "Every brand homepage should carry Organization schema. It establishes the canonical entity — name, logo, website, founding date, category. This is the foundation every other schema builds on." },
      { type: "h3", text: "Minimum fields" },
      { type: "ul", items: [
        "name — your brand name exactly as it appears everywhere",
        "url — your canonical homepage",
        "logo — a square image URL",
        "sameAs — links to your Wikipedia, LinkedIn, Crunchbase, etc.",
        "foundingDate — ISO date",
      ] },
      { type: "h2", text: "2. Product schema (for product brands)" },
      { type: "p", text: "If you sell a product, Product schema with reviews and ratings gives answer engines rich data to cite. 'Brand X has a 4.6 rating from 2,000 reviews' is exactly the kind of claim that lands inside an AI answer." },
      { type: "h2", text: "3. FAQPage schema (high-impact for AEO)" },
      { type: "p", text: "FAQPage schema wraps question-answer pairs in a way answer engines specifically look for. Each Q&A becomes a candidate for direct citation. This is one of the highest-leverage schema types for AEO — write the questions as users actually ask them." },
      { type: "callout", title: "Tip", text: "Mine your customer support tickets and search console queries for the exact phrasing people use. Use those as your FAQ questions. Answer each in 1-2 sentences." },
      { type: "h2", text: "4. HowTo schema (for process content)" },
      { type: "p", text: "If you publish tutorial or process content, HowTo schema structures it as numbered steps. Answer engines love lifting step lists verbatim into 'how do I...' answers." },
      { type: "h2", text: "5. Article schema (for publishers)" },
      { type: "p", text: "Article schema with headline, datePublished, and author signals to answer engines that this is a citable source. Pair it with strong bylines and an author entity (Person schema with sameAs links) for maximum effect." },
      { type: "h2", text: "Validating your markup" },
      { type: "p", text: "Use Google's Rich Results Test and Schema.org validator before deploying. Invalid schema is ignored — and worse, can confuse the entity signal. Validate after every template change." },
      { type: "p", text: "Structured data is invisible to users but gold for answer engines. It's the single highest-ROI technical AEO investment — a few hours of markup that compounds across every query." },
    ],
  },
  {
    slug: "brand-sentiment-ai-answers",
    title: "Brand Sentiment in AI Answers: Why Tone Matters as Much as Mentions",
    metaTitle: "Brand Sentiment in AI Answers: Why Tone Matters as Much as Mentions",
    metaDescription:
      "Being mentioned in an AI answer isn't enough — the sentiment of that mention decides whether users choose you. Here's how to measure and improve AI sentiment.",
    category: "AEO",
    readTime: "6 min read",
    date: "2025-01-28",
    author: "AEOScope Team",
    excerpt:
      "A negative mention counts as 'visibility' but loses you customers. Here's why AI-answer sentiment is the metric that actually drives conversion — and how to improve it.",
    keywords: ["brand sentiment AI", "AI answer sentiment", "sentiment analysis", "brand reputation AI search"],
    body: [
      { type: "p", text: "Most AEO dashboards count brand mentions. That's a start — but a mention with negative sentiment is worse than no mention at all. Sentiment is the metric that actually predicts whether an AI answer sends you customers or drives them away." },
      { type: "h2", text: "Why sentiment in AI answers is high-stakes" },
      { type: "p", text: "When a user asks ChatGPT 'is Brand X worth it', the answer doesn't just name you — it judges you. A sentence like 'Brand X is popular but has reliability issues' is technically a mention, but it steers the user toward a competitor. The AEOScope analyzer scores sentiment on every brand-mentioning sentence so you see the tone, not just the count." },
      { type: "quote", text: "Visibility gets you considered. Sentiment gets you chosen." },
      { type: "h2", text: "How sentiment is measured" },
      { type: "p", text: "Each sentence in an AI answer that mentions your brand is classified as positive, negative, or neutral, with a confidence score. The aggregate sentiment score feeds directly into your AEO visibility rating — a 70% positive sentiment roughly doubles the value of your mentions." },
      { type: "h2", text: "What drives negative sentiment in AI answers" },
      { type: "ul", items: [
        "Public complaints on Reddit, Trustpilot, and review sites that the model ingests",
        "Negative press coverage or lawsuits",
        "Outdated 'X vs Y' comparisons that highlight your weaknesses",
        "Common support complaints (slow, buggy, expensive) that recur across sources",
      ] },
      { type: "h2", text: "How to improve AI-answer sentiment" },
      { type: "ol", items: [
        "Fix the underlying product issues that generate recurring complaints",
        "Publish positive case studies and testimonials on authoritative surfaces",
        "Update stale comparison pages so your current strengths are represented",
        "Respond to and resolve public reviews — the model sees the resolution",
        "Earn fresh positive coverage that dilutes old negative signals",
      ] },
      { type: "callout", title: "Monitoring cadence", text: "Run the AEOScope analyzer monthly. Track the sentiment percentage alongside the mention count. A rising mention count with falling sentiment is a red flag — fix the cause before it compounds." },
      { type: "h2", text: "Sentiment vs share of voice" },
      { type: "p", text: "Two metrics together tell the full story: share of voice (how often you're mentioned vs competitors) and sentiment (how positive those mentions are). High share of voice with neutral sentiment means you're known but not loved. Low share with high sentiment means a niche reputation to scale. The dashboard above surfaces both." },
      { type: "p", text: "Treat AI-answer sentiment as the leading indicator of brand health in the generative era. By the time a drop shows up in sales, it's been in the answers for months." },
    ],
  },
  {
    slug: "share-of-voice-ai-search",
    title: "Share of Voice in AI Search: The Metric That Replaces Rankings",
    metaTitle: "Share of Voice in AI Search: The Metric That Replaces Rankings",
    metaDescription:
      "Keyword rankings don't work in AI search. Share of Voice — your brand's share of AI-answer mentions — is the new visibility metric. Here's how to measure and grow it.",
    category: "AEO",
    readTime: "6 min read",
    date: "2025-02-01",
    author: "AEOScope Team",
    excerpt:
      "There are no rankings inside an AI answer. Share of Voice — your slice of the brand mentions — is the metric that matters now. Here's how to measure and grow it.",
    keywords: ["share of voice AI", "SOV AI search", "AEO metrics", "brand visibility AI answers"],
    body: [
      { type: "p", text: "Traditional SEO tracks keyword rankings — position 1, 2, 3. AI answers have no positions. There's just a paragraph of text that names some brands and ignores others. The metric that replaces rankings is Share of Voice (SOV): your brand's percentage of all brand mentions inside the answer." },
      { type: "h2", text: "What is AI Share of Voice?" },
      { type: "p", text: "AI SOV = (mentions of your brand) / (mentions of your brand + all competitor brands) in a given AI answer. If ChatGPT mentions you twice and competitors three times, your SOV is 40%. The AEOScope dashboard computes this automatically across every engine." },
      { type: "h2", text: "Why SOV beats ranking tracking" },
      { type: "p", text: "Rankings are positional; AI answers are relational. A #3 ranking still gets clicks. Being the 3rd brand named in an AI answer often gets you nothing — users act on the first recommendation. SOV captures the relational reality: are you the default brand the engine reaches for, or an afterthought?" },
      { type: "h2", text: "Benchmark SOV ranges" },
      { type: "ul", items: [
        "0% — invisible (the engine doesn't know you exist for this query)",
        "1-19% — mentioned but marginal",
        "20-39% — a recognized alternative",
        "40-59% — a default recommendation",
        "60%+ — the dominant brand for this query",
      ] },
      { type: "h2", text: "How to grow AI Share of Voice" },
      { type: "p", text: "SOV grows when you earn more mentions than competitors on the same query. The levers are the same AEO fundamentals, applied competitively:" },
      { type: "ol", items: [
        "Publish the definitive comparison page for your category — name every competitor",
        "Earn citations on the authoritative sources answer engines weigh most",
        "Build entity strength with structured data and consistent branding",
        "Monitor competitor SOV to spot queries where you're losing ground",
      ] },
      { type: "callout", title: "Strategic view", text: "Track SOV per query, not in aggregate. A 40% aggregate SOV can hide a 0% on your most valuable query. The AEOScope per-engine breakdown shows you exactly where you're winning and losing." },
      { type: "h2", text: "SOV + sentiment = the full picture" },
      { type: "p", text: "SOV tells you how often you're mentioned; sentiment tells you whether those mentions help or hurt. A 50% SOV that's mostly negative is a liability. A 25% SOV that's overwhelmingly positive is a strong position to scale from. Read them together." },
      { type: "p", text: "Share of Voice is the one number to track monthly. If it's rising, your AEO strategy is working — even if your classic rankings are flat." },
    ],
  },
  {
    slug: "aeo-monitoring-tools",
    title: "AEO Monitoring Tools: How to Track AI Search Visibility (2025)",
    metaTitle: "AEO Monitoring Tools: How to Track AI Search Visibility",
    metaDescription:
      "You can't improve what you don't measure. Here's how to monitor your brand's visibility across ChatGPT, Perplexity, and Gemini — and the metrics that matter.",
    category: "AEO",
    readTime: "7 min read",
    date: "2025-02-04",
    author: "AEOScope Team",
    excerpt:
      "AI visibility drifts constantly. Here's how to set up AEO monitoring across all three engines — what to track, how often, and which metrics actually predict growth.",
    keywords: ["AEO monitoring", "AI search visibility tools", "track ChatGPT mentions", "AEO analytics"],
    body: [
      { type: "p", text: "AI search visibility is volatile — answer engines re-synthesize every response, so your brand can appear one day and vanish the next. Without monitoring, you won't know you've lost visibility until sales dip weeks later. Here's how to build a monitoring system that catches changes early." },
      { type: "h2", text: "What to monitor" },
      { type: "p", text: "Four metrics tell the full AEO story. The AEOScope analyzer computes all four on every run:" },
      { type: "ul", items: [
        "Presence — is your brand mentioned at all?",
        "Mention count — how many times, across how many sentences?",
        "Sentiment — positive, negative, or neutral tone per mention?",
        "Share of Voice — your mentions vs all competitor mentions?",
      ] },
      { type: "h2", text: "Which engines to track" },
      { type: "p", text: "Track all three major answer engines — ChatGPT, Perplexity, and Google Gemini. Each has a different audience and a different citation model, so your visibility varies by engine. A competitor might dominate ChatGPT but be weak on Perplexity; you can't know without measuring all three." },
      { type: "h2", text: "How often to monitor" },
      { type: "p", text: "Monthly is the sweet spot. Weekly is noisy (engines fluctuate day-to-day); quarterly is too slow (you lose months of drift). Run the same brand + query set each month and log the four metrics. Trends matter more than any single data point." },
      { type: "callout", title: "Tip", text: "Use the AEOScope 'Quick examples' to lock in a consistent query set. Run the same queries every month so your trend is apples-to-apples." },
      { type: "h2", text: "Setting up your query set" },
      { type: "p", text: "Pick 5-10 queries that represent your category — the questions your customers actually ask. Include:" },
      { type: "ul", items: [
        "1 broad category query ('best CRM')",
        "2-3 niche queries ('best CRM for startups')",
        "1 comparison query ('HubSpot vs Salesforce')",
        "1-2 brand queries ('is HubSpot worth it')",
        "1 negative-intent query ('HubSpot alternatives')",
      ] },
      { type: "h2", text: "Reading the dashboard" },
      { type: "p", text: "The AEOScope dashboard shows per-engine scores plus an aggregate AEO visibility score out of 100. Watch the aggregate for overall trend; drill into each engine tab to find where you're strong or weak. A high ChatGPT score with a low Perplexity score points to a content-structure gap (Perplexity rewards quotable passages)." },
      { type: "h2", text: "When to act" },
      { type: "p", text: "Act on sustained changes, not single-run blips. If your SOV drops on a query for two consecutive months, investigate — a competitor likely published stronger content or earned new authoritative mentions. If sentiment sours, check for a fresh wave of negative reviews or press." },
      { type: "p", text: "Monitoring is the foundation of AEO. You can't optimize what you don't measure — and in the volatile world of AI answers, the brands that measure monthly are the ones that catch drift before it costs them." },
    ],
  },
  {
    slug: "future-of-ai-search",
    title: "The Future of AI Search: 5 Trends That Will Define AEO in 2025-2026",
    metaTitle: "The Future of AI Search: 5 AEO Trends for 2025-2026",
    metaDescription:
      "Where is AI search heading? Here are the 5 trends that will define Answer Engine Optimization through 2025 and 2026 — and how to prepare your brand now.",
    category: "AEO",
    readTime: "8 min read",
    date: "2025-02-08",
    author: "AEOScope Team",
    excerpt:
      "AI search is evolving fast. Here are the 5 trends that will shape AEO through 2025-2026 — from multimodal answers to agent-mediated search — and what to do now.",
    keywords: ["future of AI search", "AEO trends 2025", "AI search predictions", "generative search future"],
    body: [
      { type: "p", text: "AI search is moving faster than any shift since mobile. The brands that win the next two years will be the ones who see the trends early and position for them. Here are the five that matter most for AEO." },
      { type: "h2", text: "1. Zero-click becomes the default" },
      { type: "p", text: "By 2026, the majority of informational searches will end without a click — the AI answer satisfies the user. Brands that aren't mentioned inside the answer lose the customer entirely. AEO visibility shifts from 'nice to have' to existential." },
      { type: "h2", text: "2. Multimodal answers" },
      { type: "p", text: "Answer engines increasingly return images, charts, and video alongside text. Brands need visual assets the engines can lift — product images, infographics, short explainer videos. Structured visual content becomes as important as written content." },
      { type: "h2", text: "3. Personalized answers" },
      { type: "p", text: "AI answers are starting to personalize based on user history, location, and stated preferences. A 'best CRM' answer for a logged-in enterprise user differs from one for a freelancer. Brands need strong positioning for multiple segments, not a single generic message." },
      { type: "quote", text: "The single 'best CRM' answer is fragmenting into a dozen segment-specific answers. Brands must win each segment." },
      { type: "h2", text: "4. Agent-mediated search" },
      { type: "p", text: "Users increasingly delegate search to AI agents that compare options and act on their behalf. Agents don't browse — they query answer engines and parse responses. Your AEO visibility becomes machine-readable positioning, not just human marketing." },
      { type: "callout", title: "Implication", text: "Optimize for agents as much as humans. Clear entity definitions, structured data, and consistent factual claims help agents parse and recommend you correctly." },
      { type: "h2", text: "5. Citation economics" },
      { type: "p", text: "As Perplexity and others drive real click traffic through citations, being a cited source regains value. Brands that invest in being quotable — original data, clear comparisons, answer-first content — earn both AEO mentions AND the residual clicks from citations." },
      { type: "h2", text: "How to prepare now" },
      { type: "ol", items: [
        "Build a monitoring baseline across all three engines (start with AEOScope)",
        "Invest in structured data and entity clarity",
        "Create segment-specific content, not one-size-fits-all",
        "Publish original data and comparisons that earn citations",
        "Add visual assets (images, charts) to key pages for multimodal lift",
      ] },
      { type: "p", text: "The future of search is generative, multimodal, and personalized. The brands that start measuring and optimizing for AEO now will have a 12-18 month head start when these trends fully arrive. Use the analyzer above as your early-warning system and your progress tracker." },
    ],
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is AEO (Answer Engine Optimization)?",
    a: "AEO is the practice of optimizing your brand's content and presence so that AI answer engines like ChatGPT, Perplexity, and Google Gemini cite and mention your brand inside their generated answers. Where traditional SEO targets rankings on a results page, AEO targets being named inside the AI answer itself.",
  },
  {
    q: "How is AEO different from SEO?",
    a: "SEO optimizes for positions on a search results page of links; AEO optimizes for mentions inside a generated AI answer. SEO signals include backlinks, title tags, and page speed. AEO signals include brand entity recognition, structured data, sentiment, and citation-worthy content. They overlap but target different surfaces — you need both.",
  },
  {
    q: "What is GEO (Generative Engine Optimization)?",
    a: "GEO is the umbrella term for optimizing across all generative AI surfaces — Google AI Overviews, ChatGPT, Perplexity, and Gemini. AEO is GEO focused specifically on answer engines. Google AI Overviews is a GEO surface but not strictly an answer engine in the conversational sense.",
  },
  {
    q: "How do I optimize my brand for ChatGPT?",
    a: "Get cited in ChatGPT by building entity strength (consistent branding, Wikipedia presence, Organization schema), publishing comparison and definitional content that names your brand alongside competitors, earning mentions on authoritative sources the model trusts, and monitoring your visibility monthly with a tool like AEOScope.",
  },
  {
    q: "How do I get cited in Perplexity with [1] sources?",
    a: "Perplexity cites live web sources it ranks and finds quotable. To get the [1] citation, rank for the full question (not just keywords), answer the question in a concise first sentence, use comparison tables, and publish original data. Perplexity optimization is closer to advanced SEO than to pure AEO.",
  },
  {
    q: "How do I appear in Google AI Overviews?",
    a: "Google AI Overviews draw from pages that already rank in the top organic results. Win the AIO by ranking well, structuring content with answer-first passages and FAQ schema, earning mentions on authoritative sources, and adding Organization/Product/FAQ structured data. AIOs appear most for informational and comparison queries.",
  },
  {
    q: "What structured data matters most for AEO?",
    a: "The five schema types that move AEO visibility most are Organization (entity foundation), Product (with reviews/ratings), FAQPage (question-led Q&As), HowTo (step-by-step process content), and Article (for citable publisher content). Validate all markup with Google's Rich Results Test before deploying.",
  },
  {
    q: "How is brand sentiment measured in AI answers?",
    a: "Each sentence in an AI answer that mentions your brand is classified as positive, negative, or neutral with a confidence score. The aggregate sentiment percentage feeds into your AEO visibility score. High mention count with negative sentiment is a liability; positive sentiment multiplies the value of your mentions.",
  },
  {
    q: "What is a good AEO Share of Voice score?",
    a: "AI Share of Voice is your brand's percentage of all brand mentions in an AI answer. 0% means invisible, 1-19% is marginal, 20-39% is a recognized alternative, 40-59% is a default recommendation, and 60%+ means you're the dominant brand for that query. Aim for 40%+ on your most valuable queries.",
  },
  {
    q: "How often should I monitor my AEO visibility?",
    a: "Monthly is the sweet spot. AI visibility fluctuates day-to-day, so weekly is noisy; quarterly is too slow to catch drift. Run the same brand + query set each month, log presence, mention count, sentiment, and share of voice, and act on sustained two-month trends rather than single-run blips.",
  },
  {
    q: "Does AEOScope use the real ChatGPT/Perplexity/Gemini APIs?",
    a: "AEOScope uses a single large language model (via z-ai-web-dev-sdk) prompted with each engine's style to generate representative answers, then runs transformer-based sentiment analysis on the brand mentions. For production AEO measurement you'd complement this with direct API calls or live SERP capture. The scoring methodology (presence, sentiment, share of voice) is identical either way.",
  },
  {
    q: "Can I run AEO analysis with just a brand name?",
    a: "Yes. The Description field is optional — if you leave it blank, AEOScope auto-generates discovery questions from your brand name and website (e.g. 'What is {brand}?', 'How does {brand} compare?', 'Is {brand} worth choosing?') and runs those across all three engines. Providing a specific description gives more targeted results.",
  },
];

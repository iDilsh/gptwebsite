# Image & Logo Guide — AEOScope

Every image slot in this app is **image-ready**: drop a file at the path below
and it automatically replaces the styled icon fallback. No code changes needed.
If the file is missing, the existing icon-based design is shown, so the app
never breaks.

All images live in the **`public/images/`** folder. Use `.png`, `.jpg`, `.webp`,
or `.svg`. Recommended: PNG or WebP with a transparent background for logos.

---

## 1. Quick reference — where each image goes

| Slot | File path | Recommended size | Notes |
|------|-----------|------------------|-------|
| **Nav bar logo** | `public/images/brand/logo.png` | 128×128 (square) | Replaces the radar icon. Shown at 32×32. |
| **Trust-badge avatars** | `public/images/brand/avatar-1.png`<br>`public/images/brand/avatar-2.png`<br>`public/images/brand/avatar-3.png` | 96×96 (square) | The 3 small circles in the "Trusted by 1,000+ brands" badge. Shown at 20×20. |
| **Engine logos (chips)** | `public/images/engines/chatgpt.png`<br>`public/images/engines/perplexity.png`<br>`public/images/engines/sentiment.png` | 128×128 (square) | Replace the Lucide icons in the "Supported answer engines" chips. |
| **Hero illustration** | `public/images/hero/hero-visual.png` | 1024×1024 (square) | The big illustration beside the hero text. **Already generated.** |
| **How-it-works step art** | `public/images/steps/step-1-query.png`<br>`public/images/steps/step-2-analyze.png`<br>`public/images/steps/step-3-score.png` | 1024×1024 (square) | One illustration per step. **Already generated.** |

---

## 2. How to add your own image (step by step)

1. **Prepare the file.** Name it **exactly** as shown in the table above
   (e.g. `logo.png`, `chatgpt.png`). The filename must match — the app looks
   for that specific path.

2. **Copy it into the right folder.** For example, to add your brand logo:
   ```
   public/images/brand/logo.png
   ```

3. **Refresh the page.** That's it. The image appears automatically. If you
   ever remove the file, the styled icon fallback comes back instantly.

> **Tip:** For logos, use a **transparent PNG** so the rounded tile background
> shows through nicely. For the hero/steps illustrations, a square image with
> a light or transparent background looks best against the soft cards.

---

## 3. Replacing the AI-generated illustrations

The hero illustration and the 3 step illustrations were generated for you and
already live in `public/images/hero/` and `public/images/steps/`. To swap any
of them for your own artwork, just **overwrite the file with the same name**:

- `public/images/hero/hero-visual.png` — hero visual
- `public/images/steps/step-1-query.png` — step 1 (Query the engines)
- `public/images/steps/step-2-analyze.png` — step 2 (Analyze mentions)
- `public/images/steps/step-3-score.png` — step 3 (Score visibility)

Recommended: 1024×1024 square, light/transparent background, no text.

---

## 4. Changing the brand name / wordmark

The wordmark "AEO**Scope**" is text in `src/components/aeo/nav-bar.tsx`
(look for `AEOScope`) and in the footer in `src/app/page.tsx`. Edit the text
there to rename the product. If you add a `logo.png`, only the icon tile
changes — the wordmark stays as text unless you remove it from the JSX.

---

## 5. Adding a brand-new image slot

To make any other element image-ready, use the `<BrandImage />` component:

```tsx
import { BrandImage } from "@/components/aeo/brand-image";
import { SomeIcon } from "lucide-react";

<BrandImage
  src="/images/brand/my-image.png"
  alt="My image"
  className="size-10"           // wrapper size
  fallback={<SomeIcon className="size-5" />}  // shown if file is missing
/>
```

The `fallback` renders automatically whenever the file is absent or fails to
load — so you can ship with placeholders and add real art later.

---

## 6. Using remote images (CDN / URLs)

The generated illustrations use Next.js `<Image />` (optimized, local only).
The logo/avatar slots use a plain `<img>` so they accept **any** path. To point
a slot at a remote URL instead of a local file, just edit the `src` prop in
the relevant component (e.g. `ENGINE_CHIPS` in `src/components/aeo/hero.tsx`).

If you want to use `next/image` with a remote URL, add the domain to
`next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "your-cdn.com" }],
  },
};
```

import type { MetadataRoute } from "next";

// ⬇️ CHANGE THIS to your deployed domain
const SITE_URL = "https://aeotool.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    "",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "daily" : ("weekly" as const),
    priority: path === "" ? 1 : path === "/blog" ? 0.8 : 0.5,
  }));
}

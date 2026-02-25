import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://example.com");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/today", "/newyear", "/compatibility", "/saju"];
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/settings";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://auxilifiers.com";

// Re-read admin settings periodically so robots changes go live without a deploy.
export const revalidate = 60;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const s = await getSiteSettings();

  // Kill switch: block the entire site from search engines.
  if (!s.siteIndexable) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${SITE}/sitemap.xml`,
      host: SITE,
    };
  }

  const extra = (s.robotsExtra || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Always keep API + admin private; admin can add more below.
        disallow: ["/api/", "/admin/", ...extra],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}

import type { MetadataRoute } from "next";
import { services, pillars } from "@/data/services";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://auxilifiers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/about", "/why-us", "/terms", "/privacy"].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const pillarRoutes = pillars.map((p) => ({
    url: `${SITE}${p.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${SITE}/services/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...pillarRoutes, ...serviceRoutes];
}

import type { MetadataRoute } from "next";
import { services, pillars } from "@/data/services";
import { supabase } from "@/lib/supabase";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://auxilifiers.com";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["/", "/about", "/why-us", "/blog", "/terms", "/privacy"].map((path) => ({
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

  // Published blog posts (gracefully empty if the table/env isn't available yet)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug,updated_at,created_at")
      .eq("published", true);
    blogRoutes = (data || []).map((p: { slug: string; updated_at: string | null; created_at: string }) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at || p.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    blogRoutes = [];
  }

  return [...staticRoutes, ...pillarRoutes, ...serviceRoutes, ...blogRoutes];
}

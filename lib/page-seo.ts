import { cache } from "react";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { DEFAULT_SETTINGS } from "@/lib/settings-defaults";
import { PAGE_DEFAULTS, getPageDefault, type PageDefault } from "@/lib/page-seo-defaults";

// ============================================================
// Per-page SEO — server reads.
//
// Code defaults live in lib/page-seo-defaults.ts (client-safe) so SEO
// always works, even before the admin touches anything. The `page_seo`
// Supabase table stores ADMIN OVERRIDES, keyed by path. getPageSeo()
// merges the two: any non-empty admin value wins, otherwise the default.
// ============================================================

export { PAGE_DEFAULTS, getPageDefault };
export type { PageDefault };

export type PageSeo = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string; // "" → falls back to the site default OG image
  canonical: string; // "" → uses the path
  noindex: boolean;
  customSchema: string; // raw JSON-LD string, "" → none
};

// Cached per request so generateMetadata + the schema component share one query.
export const getPageSeo = cache(async (path: string): Promise<PageSeo> => {
  const def = getPageDefault(path);
  const fallback: PageSeo = {
    path,
    metaTitle: def?.metaTitle || "Auxilifiers",
    metaDescription: def?.metaDescription || DEFAULT_SETTINGS.metaDescription,
    keywords: def?.keywords || [],
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonical: "",
    noindex: false,
    customSchema: "",
  };

  try {
    const { data } = await supabase
      .from("page_seo")
      .select("*")
      .eq("path", path)
      .limit(1)
      .single();
    if (!data) return fallback;
    return {
      path,
      metaTitle: data.meta_title || fallback.metaTitle,
      metaDescription: data.meta_description || fallback.metaDescription,
      keywords: data.keywords && data.keywords.length ? data.keywords : fallback.keywords,
      ogTitle: data.og_title || "",
      ogDescription: data.og_description || "",
      ogImage: data.og_image || "",
      canonical: data.canonical || "",
      noindex: !!data.noindex,
      customSchema:
        typeof data.custom_schema === "string"
          ? data.custom_schema
          : data.custom_schema
            ? JSON.stringify(data.custom_schema)
            : "",
    };
  } catch {
    return fallback;
  }
});

// Builds a Next.js Metadata object for a page from its admin SEO + defaults.
export async function buildMetadata(path: string): Promise<Metadata> {
  const seo = await getPageSeo(path);
  const canonical = seo.canonical || path;
  return {
    title: { absolute: seo.metaTitle },
    description: seo.metaDescription,
    keywords: seo.keywords.length ? seo.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      url: canonical,
      type: "website",
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    robots: seo.noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : undefined,
  };
}

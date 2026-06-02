import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/settings-defaults";

export { DEFAULT_SETTINGS };
export type { SiteSettings };

// Cached per request render so generateMetadata + layout share one query.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .limit(1)
      .single();
    if (!data) return DEFAULT_SETTINGS;
    return {
      metaTitle: data.meta_title || DEFAULT_SETTINGS.metaTitle,
      metaTitleTemplate: data.meta_title_template || DEFAULT_SETTINGS.metaTitleTemplate,
      metaDescription: data.meta_description || DEFAULT_SETTINGS.metaDescription,
      keywords: data.keywords && data.keywords.length ? data.keywords : DEFAULT_SETTINGS.keywords,
      contactEmail: data.contact_email || DEFAULT_SETTINGS.contactEmail,
      whatsapp: data.whatsapp || DEFAULT_SETTINGS.whatsapp,
      instagram: data.instagram || DEFAULT_SETTINGS.instagram,
      facebook: data.facebook || DEFAULT_SETTINGS.facebook,
      linkedin: data.linkedin || DEFAULT_SETTINGS.linkedin,
      youtube: data.youtube || DEFAULT_SETTINGS.youtube,
      x: data.x || DEFAULT_SETTINGS.x,
      threads: data.threads || DEFAULT_SETTINGS.threads,
      gaId: data.ga_id ?? DEFAULT_SETTINGS.gaId,
      headScripts: data.head_scripts || DEFAULT_SETTINGS.headScripts,
      siteIndexable: data.site_indexable ?? DEFAULT_SETTINGS.siteIndexable,
      robotsExtra: data.robots_extra || DEFAULT_SETTINGS.robotsExtra,
      navLinks: Array.isArray(data.nav_links) && data.nav_links.length ? data.nav_links : DEFAULT_SETTINGS.navLinks,
      footerLinks: Array.isArray(data.footer_links) && data.footer_links.length ? data.footer_links : DEFAULT_SETTINGS.footerLinks,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
});

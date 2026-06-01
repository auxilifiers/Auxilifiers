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
      gaId: data.ga_id ?? DEFAULT_SETTINGS.gaId,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
});

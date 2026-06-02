// Pure, client-safe settings types + defaults (no server-only imports).

export type SiteSettings = {
  metaTitle: string;
  metaTitleTemplate: string;
  metaDescription: string;
  keywords: string[];
  contactEmail: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  gaId: string;
};

// Current site values — used as fallback if the DB row is missing or unreachable.
export const DEFAULT_SETTINGS: SiteSettings = {
  metaTitle: "Auxilifiers — Orbiting around your success.",
  metaTitleTemplate: "%s | Auxilifiers",
  metaDescription:
    "Auxilifiers is a tech and growth agency for ambitious small and mid-size businesses. We build the tech, automate the operations, and grow the reach — websites, AI automation, SEO, and ads, all under one roof.",
  keywords: [
    "tech agency Pakistan",
    "web development",
    "AI automation",
    "chatbots",
    "voice AI agents",
    "SEO agency",
    "Google Ads",
    "Meta Ads",
    "Shopify development",
    "mobile app development",
  ],
  contactEmail: "info@auxilifiers.com",
  whatsapp: "https://wa.me/923190809171",
  instagram: "https://www.instagram.com/auxilifires",
  facebook: "https://web.facebook.com/profile.php?id=61590733731265",
  linkedin: "https://www.linkedin.com/company/auxilifiers",
  youtube: "",
  gaId: "G-T4LN3HVD0V",
};

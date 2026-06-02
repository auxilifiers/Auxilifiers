// Client-safe per-page SEO defaults (no server-only imports).
// Used by both lib/page-seo.ts (server) and the admin SEO manager (client).
import { DEFAULT_SETTINGS } from "@/lib/settings-defaults";

export type PageDefault = {
  path: string;
  label: string; // shown in the admin page picker
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
};

// Every public page the admin can manage. Add a row here to expose a
// new page in the admin SEO manager and give it code-level default SEO.
export const PAGE_DEFAULTS: PageDefault[] = [
  {
    path: "/",
    label: "Home",
    metaTitle: DEFAULT_SETTINGS.metaTitle,
    metaDescription: DEFAULT_SETTINGS.metaDescription,
    keywords: DEFAULT_SETTINGS.keywords,
  },
  {
    path: "/about",
    label: "About Us",
    metaTitle: "About Us — Orbiting around your success | Auxilifiers",
    metaDescription:
      "Auxilifiers is a tech and growth agency that builds the products, automates the operations, and grows the reach for ambitious small and mid-size businesses. Learn our story, values, and the way we work.",
  },
  {
    path: "/build",
    label: "Build (pillar)",
    metaTitle: "Build — Websites, Apps, Stores & Integrations | Auxilifiers",
    metaDescription:
      "Custom websites, mobile apps, Shopify stores, and tool integrations. Built to convert, engineered to last. Explore Auxilifiers' Build pillar services.",
  },
  {
    path: "/automate",
    label: "Automate (pillar)",
    metaTitle: "Automate — AI Workflows, Chatbots & Voice Agents | Auxilifiers",
    metaDescription:
      "AI automations, chatbots, voice agents, CRM sync, and inbox triage. Turn the boring repetitive work into systems that run themselves, 24/7.",
  },
  {
    path: "/grow",
    label: "Grow (pillar)",
    metaTitle: "Grow — SEO, Google Ads, Meta Ads & Social | Auxilifiers",
    metaDescription:
      "SEO, Google Ads, Facebook & Instagram ads, social media management, and content. The reach and revenue that compound month over month.",
  },
  {
    path: "/why-us",
    label: "Why Us",
    metaTitle: "Why Us — A different kind of agency | Auxilifiers",
    metaDescription:
      "We don't bill hours, we don't disappear after launch, and we don't speak agency-jargon. Here's why founders and operators choose Auxilifiers over the alternatives.",
  },
  {
    path: "/blog",
    label: "Blog (index)",
    metaTitle: "Blog | Auxilifiers",
    metaDescription:
      "Practical, no-jargon ideas on websites, AI automation, SEO, and growth for ambitious small and mid-size businesses — from the Auxilifiers team.",
  },
  {
    path: "/privacy",
    label: "Privacy Policy",
    metaTitle: "Privacy Policy | Auxilifiers",
    metaDescription:
      "How Auxilifiers collects, uses, stores, and protects your personal data. Plain-language privacy policy covering the website and client engagements.",
  },
  {
    path: "/terms",
    label: "Terms & Conditions",
    metaTitle: "Terms & Conditions | Auxilifiers",
    metaDescription:
      "The terms and conditions governing your use of the Auxilifiers website and engagement of our services. Plain-language version included.",
  },
];

export function getPageDefault(path: string): PageDefault | undefined {
  return PAGE_DEFAULTS.find((p) => p.path === path);
}

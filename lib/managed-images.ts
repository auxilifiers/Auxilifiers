// Client-safe registry of the site's brand/service images, so both the live
// pages and the admin "Images" manager work from one list. Alt-text overrides
// are stored per image path in the Supabase `image_alts` table; when none is
// set, the defaultAlt below is used.
import { pillars, services } from "@/data/services";

export type ManagedImage = { path: string; label: string; defaultAlt: string };

export const MANAGED_IMAGES: ManagedImage[] = [
  ...pillars.map((p) => ({
    path: p.image,
    label: `Pillar — ${p.title}`,
    defaultAlt: `${p.title} services illustration`,
  })),
  ...services.map((s) => ({
    path: s.image,
    label: `Service — ${s.title}`,
    defaultAlt: s.title,
  })),
];

export function defaultAltFor(path: string): string {
  return MANAGED_IMAGES.find((m) => m.path === path)?.defaultAlt || "";
}

// Resolve the alt for an image: admin override → code default → empty.
export function altFor(
  overrides: Record<string, string>,
  path: string,
  fallback?: string,
): string {
  return overrides[path] || fallback || defaultAltFor(path);
}

import { cache } from "react";
import { supabase } from "@/lib/supabase";

// Server-side reader for admin-managed image alt text. Returns a map of
// image path → alt override. Cached per request. Falls back to {} if the
// table is missing or unreachable, so pages keep their code defaults.
export const getImageAlts = cache(async (): Promise<Record<string, string>> => {
  try {
    const { data } = await supabase.from("image_alts").select("image_path, alt");
    const map: Record<string, string> = {};
    (data || []).forEach((r: { image_path: string; alt: string }) => {
      if (r.image_path && r.alt) map[r.image_path] = r.alt;
    });
    return map;
  } catch {
    return {};
  }
});

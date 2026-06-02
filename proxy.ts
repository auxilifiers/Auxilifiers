import { NextResponse, type NextRequest } from "next/server";

// ============================================================
// 301 Redirect engine — admin-managed, no redeploy needed.
//
// Looks up the requested path in the Supabase `redirects` table and issues a
// permanent 301 if a match exists. The redirect list is cached in-memory for
// 60s so we don't hit the database on every request.
// ============================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TTL = 60_000;

let cache: { at: number; map: Record<string, string> } | null = null;

async function getRedirects(): Promise<Record<string, string>> {
  if (cache && Date.now() - cache.at < TTL) return cache.map;
  if (!SUPABASE_URL || !SUPABASE_ANON) return {};
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/redirects?select=from_path,to_path&enabled=eq.true`,
      {
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
        cache: "no-store",
      },
    );
    if (!res.ok) return cache?.map ?? {};
    const rows: { from_path: string; to_path: string }[] = await res.json();
    const map: Record<string, string> = {};
    for (const r of rows) {
      if (r.from_path && r.to_path) map[r.from_path] = r.to_path;
    }
    cache = { at: Date.now(), map };
    return map;
  } catch {
    return cache?.map ?? {};
  }
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const map = await getRedirects();
  // Match exact path, or the same path without a trailing slash.
  const target = map[pathname] || map[pathname.replace(/\/$/, "")];
  if (target && target !== pathname) {
    const dest = target.startsWith("http")
      ? target
      : new URL(`${target}${search}`, req.url);
    return NextResponse.redirect(dest, 301);
  }
  return NextResponse.next();
}

// Skip Next internals, API, admin, and any file with an extension.
export const config = {
  matcher: ["/((?!_next/|api/|admin/|.*\\.).*)"],
};

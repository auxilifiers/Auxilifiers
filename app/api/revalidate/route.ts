import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

// POST /api/revalidate  { path: "/about" }
// Header: Authorization: Bearer <supabase access token>
//
// Lets the admin push SEO changes live INSTANTLY (no redeploy, no waiting
// for ISR). We verify the caller is a logged-in Supabase user before
// busting the cache, so random visitors can't trigger it.
export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "").trim();
    if (!token) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const supabase = createClient(url, anon);
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as { path?: string; layout?: boolean };
    const path = typeof body.path === "string" && body.path.startsWith("/") ? body.path : null;
    if (!path) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    if (body.layout) {
      // Global change (footer, schema, GA live in the shared root layout):
      // revalidate every page under the root layout in one shot.
      revalidatePath("/", "layout");
    } else {
      // Per-page change. Also refresh home since the layout is shared.
      revalidatePath(path);
      if (path !== "/") revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true, path, layout: !!body.layout });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/admin/AdminGate";
import { supabase } from "@/lib/supabase";

type Row = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
};

function PostList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id,title,slug,published,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRows((data as Row[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 5vw 80px" }}>
      <Link href="/admin" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>← Control panel</Link>
      <div className="flex items-center justify-between" style={{ marginTop: 16, marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28, color: "var(--color-text)" }}>
          Blog posts
        </h1>
        <Link href="/admin/blog/new" style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "10px 22px", borderRadius: "var(--radius-pill)", background: "var(--gradient)", color: "var(--color-cta-text)" }}>
          + New post
        </Link>
      </div>

      {loading ? (
        <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>No posts yet. Create your first one.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((r) => (
            <Link key={r.id} href={`/admin/blog/${r.id}`} className="flex items-center justify-between" style={{ padding: "16px 18px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-default)", background: "var(--color-card-bg)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500, color: "var(--color-text)" }}>{r.title}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>/blog/{r.slug}</div>
              </div>
              <span className="flex items-center gap-3 shrink-0">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "var(--radius-pill)", color: r.published ? "var(--color-cta-text)" : "var(--color-text-muted)", background: r.published ? "var(--color-cyan)" : "transparent", border: r.published ? "none" : "1px solid var(--color-border-default)" }}>
                  {r.published ? "Published" : "Draft"}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>Edit →</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <AdminGate>
      <PostList />
    </AdminGate>
  );
}

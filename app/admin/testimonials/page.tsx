"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/admin/AdminGate";
import { supabase } from "@/lib/supabase";

type Row = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  rating: number;
  hidden: boolean;
  created_at: string;
};

function List() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows((data as Row[]) || []);
      setLoading(false);
    });
  };
  useEffect(load, []);

  const toggleHide = async (r: Row) => {
    setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, hidden: !x.hidden } : x)));
    await supabase.from("testimonials").update({ hidden: !r.hidden }).eq("id", r.id);
  };

  const remove = async (r: Row) => {
    if (!confirm(`Delete testimonial from ${r.name}?`)) return;
    setRows((prev) => prev.filter((x) => x.id !== r.id));
    await supabase.from("testimonials").delete().eq("id", r.id);
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 5vw 80px" }}>
      <Link href="/admin" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>← Control panel</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28, color: "var(--color-text)", margin: "16px 0 8px" }}>
        Testimonials
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 28 }}>
        Hidden testimonials stay in the database but don&rsquo;t show on the website.
      </p>

      {loading ? (
        <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>No testimonials yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {rows.map((r) => (
            <div key={r.id} style={{ padding: "20px 22px", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border-default)", background: "var(--color-card-bg)", opacity: r.hidden ? 0.55 : 1 }}>
              <div className="flex items-start justify-between gap-4">
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500, color: "var(--color-text)" }}>
                    {r.name} <span style={{ color: "var(--color-cyan)" }}>·</span> <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 14 }}>{r.role || "Customer"}{r.company ? `, ${r.company}` : ""}</span>
                    {r.hidden && <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border-default)", color: "var(--color-text-muted)" }}>Hidden</span>}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)", margin: "4px 0 8px" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 17, color: "var(--color-text-dim)", lineHeight: 1.5, textAlign: "left" }}>&ldquo;{r.quote}&rdquo;</p>
                </div>
              </div>
              <div className="flex gap-3" style={{ marginTop: 14 }}>
                <button onClick={() => toggleHide(r)} style={{ fontFamily: "var(--font-body)", fontSize: 13, padding: "7px 16px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border-default)", background: "transparent", color: "var(--color-text-muted)", cursor: "pointer" }}>
                  {r.hidden ? "Show" : "Hide"}
                </button>
                <button onClick={() => remove(r)} style={{ fontFamily: "var(--font-body)", fontSize: 13, padding: "7px 16px", borderRadius: "var(--radius-pill)", border: "1px solid #ff6b6b55", background: "transparent", color: "#ff6b6b", cursor: "pointer" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminTestimonials() {
  return (
    <AdminGate>
      <List />
    </AdminGate>
  );
}

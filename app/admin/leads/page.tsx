"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/admin/AdminGate";
import { supabase } from "@/lib/supabase";

type Lead = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  service_interest: string | null;
  budget: string | null;
  business_brief: string | null;
  message: string | null;
  created_at: string;
};

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", minWidth: 100 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-dim)", textAlign: "left" }}>{value}</span>
    </div>
  );
}

function Inbox() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows((data as Lead[]) || []);
      setLoading(false);
    });
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    setRows((prev) => prev.filter((x) => x.id !== id));
    await supabase.from("contact_submissions").delete().eq("id", id);
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 5vw 80px" }}>
      <Link href="/admin" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>← Control panel</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28, color: "var(--color-text)", margin: "16px 0 8px" }}>
        Leads / Enquiries
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 28 }}>
        Every contact-form submission from your website. Newest first.
      </p>

      {loading ? (
        <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>No enquiries yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((r) => {
            const isOpen = open === r.id;
            const date = new Date(r.created_at).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
            return (
              <div key={r.id} style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border-default)", background: "var(--color-card-bg)", overflow: "hidden" }}>
                <button onClick={() => setOpen(isOpen ? null : r.id)} className="w-full flex items-center justify-between gap-4" style={{ padding: "16px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500, color: "var(--color-text)" }}>
                      {r.first_name} {r.last_name}{r.company ? ` · ${r.company}` : ""}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 3 }}>
                      {r.email}{r.service_interest ? ` · ${r.service_interest}` : ""}
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{date}</span>
                </button>

                {isOpen && (
                  <div style={{ padding: "4px 20px 20px", borderTop: "1px solid var(--color-border-subtle)" }}>
                    <div style={{ marginTop: 14 }}>
                      <Row label="Email" value={r.email} />
                      <Row label="Phone" value={r.phone} />
                      <Row label="Company" value={r.company} />
                      <Row label="Job title" value={r.job_title} />
                      <Row label="Interested in" value={r.service_interest} />
                      <Row label="Budget" value={r.budget} />
                      <Row label="Business brief" value={r.business_brief} />
                      <Row label="Message" value={r.message} />
                    </div>
                    <div className="flex gap-3" style={{ marginTop: 16 }}>
                      <a href={`mailto:${r.email}`} style={{ fontFamily: "var(--font-body)", fontSize: 13, padding: "7px 16px", borderRadius: "var(--radius-pill)", background: "var(--gradient)", color: "var(--color-cta-text)" }}>Reply by email</a>
                      <button onClick={() => remove(r.id)} style={{ fontFamily: "var(--font-body)", fontSize: 13, padding: "7px 16px", borderRadius: "var(--radius-pill)", border: "1px solid #ff6b6b55", background: "transparent", color: "#ff6b6b", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminLeads() {
  return (
    <AdminGate>
      <Inbox />
    </AdminGate>
  );
}

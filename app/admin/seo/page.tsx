"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/admin/AdminGate";
import { supabase } from "@/lib/supabase";

type Settings = {
  meta_title: string;
  meta_title_template: string;
  meta_description: string;
  keywords: string;
  contact_email: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  ga_id: string;
};

const EMPTY: Settings = {
  meta_title: "", meta_title_template: "%s | Auxilifiers", meta_description: "", keywords: "",
  contact_email: "", whatsapp: "", instagram: "", facebook: "", linkedin: "", youtube: "", ga_id: "",
};

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 15, padding: "11px 14px",
  borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-default)",
  background: "var(--color-input-bg)", color: "var(--color-text)", outline: "none", width: "100%",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
  color: "var(--color-text)", marginBottom: 6, display: "block",
};

function Field({ label, value, onChange, hint, textarea }: { label: string; value: string; onChange: (v: string) => void; hint?: string; textarea?: boolean }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
      {hint && <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

function SeoForm() {
  const [s, setS] = useState<Settings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("site_settings").select("*").eq("id", 1).limit(1).single().then(({ data }) => {
      if (data) {
        setS({
          meta_title: data.meta_title || "",
          meta_title_template: data.meta_title_template || "%s | Auxilifiers",
          meta_description: data.meta_description || "",
          keywords: (data.keywords || []).join(", "),
          contact_email: data.contact_email || "",
          whatsapp: data.whatsapp || "",
          instagram: data.instagram || "",
          facebook: data.facebook || "",
          linkedin: data.linkedin || "",
          youtube: data.youtube || "",
          ga_id: data.ga_id || "",
        });
      }
      setLoading(false);
    });
  }, []);

  const set = (k: keyof Settings) => (v: string) => setS((prev) => ({ ...prev, [k]: v }));

  const save = async () => {
    setMsg(""); setBusy(true);
    const payload = {
      id: 1,
      meta_title: s.meta_title.trim(),
      meta_title_template: s.meta_title_template.trim() || "%s | Auxilifiers",
      meta_description: s.meta_description.trim(),
      keywords: s.keywords.split(",").map((t) => t.trim()).filter(Boolean),
      contact_email: s.contact_email.trim(),
      whatsapp: s.whatsapp.trim(),
      instagram: s.instagram.trim(),
      facebook: s.facebook.trim(),
      linkedin: s.linkedin.trim(),
      youtube: s.youtube.trim(),
      ga_id: s.ga_id.trim(),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("site_settings").upsert(payload, { onConflict: "id" });
    setBusy(false);
    setMsg(error ? `Error: ${error.message}` : "✓ Saved. Changes go live on the next deploy/refresh.");
  };

  if (loading) return <div style={{ padding: 80, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 5vw 80px" }}>
      <Link href="/admin" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>← Control panel</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28, color: "var(--color-text)", margin: "16px 0 24px" }}>
        SEO &amp; Site Settings
      </h1>

      <h2 style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-cyan)", marginBottom: 14 }}>SEO</h2>
      <Field label="Meta title" value={s.meta_title} onChange={set("meta_title")} hint="Shown in the browser tab and Google results for the homepage." />
      <Field label="Title template" value={s.meta_title_template} onChange={set("meta_title_template")} hint="Use %s for the page name, e.g. %s | Auxilifiers" />
      <Field label="Meta description" value={s.meta_description} onChange={set("meta_description")} textarea hint="The summary Google shows under your title (around 150–160 characters)." />
      <Field label="Keywords" value={s.keywords} onChange={set("keywords")} hint="Comma separated." />

      <h2 style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-cyan)", margin: "28px 0 14px" }}>Analytics</h2>
      <Field label="Google Analytics ID" value={s.ga_id} onChange={set("ga_id")} hint="e.g. G-XXXXXXX. Leave empty to disable tracking." />

      <h2 style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-cyan)", margin: "28px 0 14px" }}>Contact &amp; Social</h2>
      <Field label="Contact email" value={s.contact_email} onChange={set("contact_email")} />
      <Field label="WhatsApp link" value={s.whatsapp} onChange={set("whatsapp")} hint="Full link, e.g. https://wa.me/9231..." />
      <Field label="Instagram" value={s.instagram} onChange={set("instagram")} />
      <Field label="Facebook" value={s.facebook} onChange={set("facebook")} />
      <Field label="LinkedIn" value={s.linkedin} onChange={set("linkedin")} />
      <Field label="YouTube" value={s.youtube} onChange={set("youtube")} hint="Leave empty to hide the YouTube icon." />

      {msg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: msg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "8px 0 16px" }}>{msg}</p>}

      <button onClick={save} disabled={busy} style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "12px 32px", borderRadius: "var(--radius-pill)", background: "var(--gradient)", color: "var(--color-cta-text)", border: "none", cursor: "pointer", opacity: busy ? 0.6 : 1 }}>
        {busy ? "Saving…" : "Save settings"}
      </button>
    </div>
  );
}

export default function SeoPage() {
  return (
    <AdminGate>
      <SeoForm />
    </AdminGate>
  );
}

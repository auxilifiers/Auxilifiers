"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/admin/AdminGate";
import { supabase } from "@/lib/supabase";
import { PAGE_DEFAULTS } from "@/lib/page-seo-defaults";

// ---------- shared styles ----------
const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 15, padding: "11px 14px",
  borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-default)",
  background: "var(--color-input-bg)", color: "var(--color-text)", outline: "none", width: "100%",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
  color: "var(--color-text)", marginBottom: 6, display: "block",
};
const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.14em",
  textTransform: "uppercase", color: "var(--color-cyan)", marginBottom: 14,
};
const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "12px 32px",
  borderRadius: "var(--radius-pill)", background: "var(--gradient)",
  color: "var(--color-cta-text)", border: "none", cursor: "pointer",
};

function Field({ label, value, onChange, hint, textarea, mono, rows }: {
  label: string; value: string; onChange: (v: string) => void;
  hint?: string; textarea?: boolean; mono?: boolean; rows?: number;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          style={{ ...inputStyle, resize: "vertical", ...(mono ? { fontFamily: "var(--font-mono)", fontSize: 13 } : {}) }}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
      {hint && <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

// Ping the revalidate API so changes go live instantly (no redeploy / wait).
async function revalidate(path: string) {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return;
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ path }),
    });
  } catch {
    /* ISR (60s) is the safety net if this fails */
  }
}

// ============================================================
// 1) PER-PAGE SEO
// ============================================================
type PageForm = {
  meta_title: string; meta_description: string; keywords: string;
  og_title: string; og_description: string; og_image: string;
  canonical: string; noindex: boolean; custom_schema: string;
};
const EMPTY_PAGE: PageForm = {
  meta_title: "", meta_description: "", keywords: "",
  og_title: "", og_description: "", og_image: "", canonical: "", noindex: false, custom_schema: "",
};

function PerPageSeo() {
  const [path, setPath] = useState(PAGE_DEFAULTS[0].path);
  const [f, setF] = useState<PageForm>(EMPTY_PAGE);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const def = PAGE_DEFAULTS.find((p) => p.path === path);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setMsg("");
    supabase.from("page_seo").select("*").eq("path", path).limit(1).single().then(({ data }) => {
      if (!active) return;
      if (data) {
        setF({
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          keywords: (data.keywords || []).join(", "),
          og_title: data.og_title || "",
          og_description: data.og_description || "",
          og_image: data.og_image || "",
          canonical: data.canonical || "",
          noindex: !!data.noindex,
          custom_schema: data.custom_schema
            ? (typeof data.custom_schema === "string" ? data.custom_schema : JSON.stringify(data.custom_schema, null, 2))
            : "",
        });
      } else {
        // No saved row yet — prefill the code defaults so the admin edits the live values.
        setF({
          ...EMPTY_PAGE,
          meta_title: def?.metaTitle || "",
          meta_description: def?.metaDescription || "",
          keywords: (def?.keywords || []).join(", "),
        });
      }
      setLoading(false);
    });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const set = (k: keyof PageForm) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const save = async () => {
    setMsg(""); setBusy(true);

    // Validate custom schema JSON (if any) before saving.
    let schemaValue: unknown = null;
    if (f.custom_schema.trim()) {
      try {
        schemaValue = JSON.parse(f.custom_schema);
      } catch {
        setBusy(false);
        setMsg("Error: Custom schema is not valid JSON. Fix it or clear the field.");
        return;
      }
    }

    const payload = {
      path,
      meta_title: f.meta_title.trim(),
      meta_description: f.meta_description.trim(),
      keywords: f.keywords.split(",").map((t) => t.trim()).filter(Boolean),
      og_title: f.og_title.trim(),
      og_description: f.og_description.trim(),
      og_image: f.og_image.trim(),
      canonical: f.canonical.trim(),
      noindex: f.noindex,
      custom_schema: schemaValue,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("page_seo").upsert(payload, { onConflict: "path" });
    if (error) {
      setBusy(false);
      setMsg(`Error: ${error.message}`);
      return;
    }
    await revalidate(path);
    setBusy(false);
    setMsg("✓ Saved & pushed live. Refresh the page in a few seconds to see it.");
  };

  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={h2Style}>Per-page SEO</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 16, lineHeight: 1.5 }}>
        Pick a page and control its SEO. Saving pushes it live instantly — no redeploy needed.
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Page</label>
        <select value={path} onChange={(e) => setPath(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          {PAGE_DEFAULTS.map((p) => (
            <option key={p.path} value={p.path}>{p.label} — {p.path}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>
      ) : (
        <>
          <Field label="Meta title" value={f.meta_title} onChange={set("meta_title")} hint="The full title shown in the browser tab and Google results for this page." />
          <Field label="Meta description" value={f.meta_description} onChange={set("meta_description")} textarea hint="The summary Google shows under the title (~150–160 characters)." />
          <Field label="Keywords" value={f.keywords} onChange={set("keywords")} hint="Comma separated." />
          <Field label="Canonical URL" value={f.canonical} onChange={set("canonical")} hint={`Leave empty to use ${path}. Set only if this page should point elsewhere.`} />

          <h3 style={{ ...h2Style, fontSize: 12, margin: "22px 0 12px", color: "var(--color-text-muted)" }}>Social share preview (OG)</h3>
          <Field label="OG title" value={f.og_title} onChange={set("og_title")} hint="Title when shared on Facebook / WhatsApp / LinkedIn. Empty = uses meta title." />
          <Field label="OG description" value={f.og_description} onChange={set("og_description")} textarea hint="Empty = uses meta description." />
          <Field label="OG image URL" value={f.og_image} onChange={set("og_image")} hint="Full image URL for the share preview. Empty = site default." />

          <label className="flex items-center gap-2" style={{ margin: "8px 0 20px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text)" }}>
            <input type="checkbox" checked={f.noindex} onChange={(e) => setF((p) => ({ ...p, noindex: e.target.checked }))} style={{ accentColor: "var(--color-cyan)" }} />
            Hide this page from Google (noindex)
          </label>

          <Field label="Custom JSON-LD schema (advanced)" value={f.custom_schema} onChange={set("custom_schema")} textarea mono rows={8} hint="Optional extra structured data for this page. Must be valid JSON. Leave empty for none — invalid JSON is rejected on save." />

          {msg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: msg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "8px 0 16px" }}>{msg}</p>}

          <button onClick={save} disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
            {busy ? "Saving…" : `Save ${def?.label || path}`}
          </button>
        </>
      )}
    </div>
  );
}

// ============================================================
// 2) GLOBAL SETTINGS (site-wide: analytics, social, contact)
// ============================================================
type Settings = {
  meta_title: string; meta_title_template: string; meta_description: string; keywords: string;
  contact_email: string; whatsapp: string; instagram: string; facebook: string; linkedin: string; youtube: string; ga_id: string;
};
const EMPTY: Settings = {
  meta_title: "", meta_title_template: "%s | Auxilifiers", meta_description: "", keywords: "",
  contact_email: "", whatsapp: "", instagram: "", facebook: "", linkedin: "", youtube: "", ga_id: "",
};

function GlobalSettings() {
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
    if (error) { setBusy(false); setMsg(`Error: ${error.message}`); return; }
    await revalidate("/"); // global settings live in the shared layout
    setBusy(false);
    setMsg("✓ Saved & pushed live. Refresh in a few seconds to see it.");
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>;

  return (
    <div>
      <h2 style={h2Style}>Global — Analytics &amp; Social</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 16, lineHeight: 1.5 }}>
        Site-wide settings used on every page (footer, schema, tracking).
      </p>

      <Field label="Google Analytics ID" value={s.ga_id} onChange={set("ga_id")} hint="e.g. G-XXXXXXX. Leave empty to disable tracking." />
      <Field label="Title template" value={s.meta_title_template} onChange={set("meta_title_template")} hint="Use %s for the page name, e.g. %s | Auxilifiers" />

      <h3 style={{ ...h2Style, fontSize: 12, margin: "22px 0 12px", color: "var(--color-text-muted)" }}>Contact &amp; Social</h3>
      <Field label="Contact email" value={s.contact_email} onChange={set("contact_email")} />
      <Field label="WhatsApp link" value={s.whatsapp} onChange={set("whatsapp")} hint="Full link, e.g. https://wa.me/9231..." />
      <Field label="Instagram" value={s.instagram} onChange={set("instagram")} />
      <Field label="Facebook" value={s.facebook} onChange={set("facebook")} />
      <Field label="LinkedIn" value={s.linkedin} onChange={set("linkedin")} />
      <Field label="YouTube" value={s.youtube} onChange={set("youtube")} hint="Leave empty to hide the YouTube icon." />

      {msg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: msg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "8px 0 16px" }}>{msg}</p>}

      <button onClick={save} disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
        {busy ? "Saving…" : "Save global settings"}
      </button>
    </div>
  );
}

function SeoManager() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 5vw 80px" }}>
      <Link href="/admin" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>← Control panel</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28, color: "var(--color-text)", margin: "16px 0 8px" }}>
        SEO &amp; Site Settings
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 28, lineHeight: 1.5 }}>
        Edit SEO for any page or the site as a whole. Changes go live instantly — no redeploy.
      </p>

      <PerPageSeo />
      <div style={{ height: 1, background: "var(--color-border-subtle)", margin: "8px 0 36px" }} />
      <GlobalSettings />
    </div>
  );
}

export default function SeoPage() {
  return (
    <AdminGate>
      <SeoManager />
    </AdminGate>
  );
}

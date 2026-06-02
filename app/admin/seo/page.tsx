"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/admin/AdminGate";
import { supabase } from "@/lib/supabase";
import { PAGE_DEFAULTS } from "@/lib/page-seo-defaults";
import { MANAGED_IMAGES } from "@/lib/managed-images";
import { DEFAULT_SETTINGS, type NavLink } from "@/lib/settings-defaults";

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
// Fully brand-themed page picker. We can't reliably style a native <select>'s
// option list (the OS draws a white menu), so this is a custom dropdown built
// from a button + a styled list, using the site's dark theme tokens.
function PagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = PAGE_DEFAULTS.find((p) => p.path === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ ...inputStyle, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
      >
        <span>{current ? `${current.label} — ${current.path}` : "Select a page"}</span>
        <span aria-hidden="true" style={{ color: "var(--color-cyan)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-flex" }}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1,1 6,7 11,1" /></svg>
        </span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 50, background: "var(--color-surface)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "0 12px 32px -8px rgba(0,0,0,0.55)", maxHeight: 320, overflowY: "auto" }}>
          {PAGE_DEFAULTS.map((p) => {
            const active = p.path === value;
            return (
              <button
                key={p.path}
                type="button"
                onClick={() => { onChange(p.path); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 14px", fontFamily: "var(--font-body)", fontSize: 15, border: "none", cursor: "pointer", background: active ? "color-mix(in srgb, var(--color-cyan) 16%, transparent)" : "transparent", color: active ? "var(--color-cyan)" : "var(--color-text)" }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--color-input-bg)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {p.label} <span style={{ color: "var(--color-text-muted)" }}>— {p.path}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
async function revalidate(path: string, layout = false) {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return;
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ path, layout }),
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
  canonical: string; noindex: boolean; custom_schema: string; h1: string; intro: string;
};
const EMPTY_PAGE: PageForm = {
  meta_title: "", meta_description: "", keywords: "",
  og_title: "", og_description: "", og_image: "", canonical: "", noindex: false, custom_schema: "", h1: "", intro: "",
};

function PerPageSeo() {
  const [path, setPath] = useState(PAGE_DEFAULTS[0].path);
  const [f, setF] = useState<PageForm>(EMPTY_PAGE);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [ogUploading, setOgUploading] = useState(false);

  const def = PAGE_DEFAULTS.find((p) => p.path === path);

  // Upload an OG image to Supabase Storage (reuses the public blog-images
  // bucket) and return its public URL.
  const uploadOgImage = async (file: File): Promise<string | null> => {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const filePath = `og/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });
    if (error) {
      setMsg("Upload failed: " + error.message);
      return null;
    }
    return supabase.storage.from("blog-images").getPublicUrl(filePath).data.publicUrl;
  };

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
          h1: data.h1 || "",
          intro: data.intro || "",
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
      h1: f.h1.trim(),
      intro: f.intro.trim(),
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
        <PagePicker value={path} onChange={setPath} />
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>
      ) : (
        <>
          <Field label="Meta title" value={f.meta_title} onChange={set("meta_title")} hint="The full title shown in the browser tab and Google results for this page." />
          <Field label="H1 heading (on-page)" value={f.h1} onChange={set("h1")} hint="The main visible heading on the page. Leave EMPTY to keep the current designed heading. Set it to replace that heading with plain text." />
          <Field label="Intro / subheading text (on-page)" value={f.intro} onChange={set("intro")} textarea hint="The lead paragraph under the heading. Leave EMPTY to keep the current designed copy. Set it to replace the intro text on this page." />
          <Field label="Meta description" value={f.meta_description} onChange={set("meta_description")} textarea hint="The summary Google shows under the title (~150–160 characters)." />
          <Field label="Keywords" value={f.keywords} onChange={set("keywords")} hint="Comma separated." />
          <Field label="Canonical URL" value={f.canonical} onChange={set("canonical")} hint={`Leave empty to use ${path}. Set only if this page should point elsewhere.`} />

          <h3 style={{ ...h2Style, fontSize: 12, margin: "22px 0 12px", color: "var(--color-text-muted)" }}>Social share preview (OG)</h3>
          <Field label="OG title" value={f.og_title} onChange={set("og_title")} hint="Title when shared on Facebook / WhatsApp / LinkedIn. Empty = uses meta title." />
          <Field label="OG description" value={f.og_description} onChange={set("og_description")} textarea hint="Empty = uses meta description." />
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>OG image (social share preview)</label>
            {f.og_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.og_image} alt="OG preview" style={{ width: "100%", maxWidth: 360, aspectRatio: "1200 / 630", objectFit: "cover", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-default)", marginBottom: 10, display: "block" }} />
            )}
            <div className="flex items-center gap-3" style={{ marginBottom: 8, flexWrap: "wrap" }}>
              <label style={{ ...btnStyle, fontSize: 14, padding: "10px 20px", display: "inline-block", opacity: ogUploading ? 0.6 : 1 }}>
                {ogUploading ? "Uploading…" : f.og_image ? "Replace image" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  disabled={ogUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setMsg("");
                    setOgUploading(true);
                    const url = await uploadOgImage(file);
                    setOgUploading(false);
                    if (url) set("og_image")(url);
                    e.target.value = "";
                  }}
                />
              </label>
              {f.og_image && (
                <button type="button" onClick={() => set("og_image")("")} style={{ fontFamily: "var(--font-body)", fontSize: 14, padding: "10px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border-default)", background: "transparent", color: "var(--color-text-muted)", cursor: "pointer" }}>
                  Remove
                </button>
              )}
            </div>
            <input value={f.og_image} onChange={(e) => set("og_image")(e.target.value)} style={inputStyle} placeholder="…or paste an image URL" />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 5 }}>
              Recommended 1200×630px. Shown when this page is shared on WhatsApp, Facebook, LinkedIn, X. Empty = site default.
            </p>
          </div>

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
  contact_email: string; whatsapp: string; instagram: string; facebook: string; linkedin: string; youtube: string; x: string; threads: string; ga_id: string;
};
const EMPTY: Settings = {
  meta_title: "", meta_title_template: "%s | Auxilifiers", meta_description: "", keywords: "",
  contact_email: "", whatsapp: "", instagram: "", facebook: "", linkedin: "", youtube: "", x: "", threads: "", ga_id: "",
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
          x: data.x || "",
          threads: data.threads || "",
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
      x: s.x.trim(),
      threads: s.threads.trim(),
      ga_id: s.ga_id.trim(),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("site_settings").upsert(payload, { onConflict: "id" });
    if (error) { setBusy(false); setMsg(`Error: ${error.message}`); return; }
    await revalidate("/", true); // global settings live in the shared layout — refresh every page
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
      <Field label="X (Twitter)" value={s.x} onChange={set("x")} hint="Full link, e.g. https://x.com/auxilifiers. Empty = hide the icon." />
      <Field label="Threads" value={s.threads} onChange={set("threads")} hint="Full link, e.g. https://www.threads.net/@auxilifiers. Empty = hide the icon." />

      {msg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: msg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "8px 0 16px" }}>{msg}</p>}

      <button onClick={save} disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
        {busy ? "Saving…" : "Save global settings"}
      </button>
    </div>
  );
}

// ============================================================
// 3) TECHNICAL SEO (tracking scripts, robots, 301 redirects)
// ============================================================
type Redirect = { id: string; from_path: string; to_path: string; enabled: boolean };

function TechnicalSeo() {
  const [headScripts, setHeadScripts] = useState("");
  const [siteIndexable, setSiteIndexable] = useState(true);
  const [robotsExtra, setRobotsExtra] = useState("");
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [rMsg, setRMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("head_scripts, site_indexable, robots_extra").eq("id", 1).limit(1).single();
      if (data) {
        setHeadScripts(data.head_scripts || "");
        setSiteIndexable(data.site_indexable ?? true);
        setRobotsExtra(data.robots_extra || "");
      }
      const { data: reds } = await supabase.from("redirects").select("*").order("created_at", { ascending: false });
      if (reds) setRedirects(reds as Redirect[]);
      setLoading(false);
    })();
  }, []);

  const saveSettings = async () => {
    setMsg("");
    if (/<\/?script/i.test(headScripts)) {
      setMsg("Error: Remove the <script> and </script> tags — paste only the code that goes between them.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("site_settings").upsert(
      { id: 1, head_scripts: headScripts.trim(), site_indexable: siteIndexable, robots_extra: robotsExtra.trim(), updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) { setBusy(false); setMsg(`Error: ${error.message}`); return; }
    await revalidate("/", true);
    setBusy(false);
    setMsg("✓ Saved & pushed live. Refresh in a few seconds to see it.");
  };

  const addRedirect = async () => {
    setRMsg("");
    const from = newFrom.trim();
    const to = newTo.trim();
    if (!from.startsWith("/")) { setRMsg("Error: 'From' must start with / (e.g. /old-page)."); return; }
    if (!(to.startsWith("/") || to.startsWith("http"))) { setRMsg("Error: 'To' must be a path (/new-page) or full URL (https://…)."); return; }
    if (from === to) { setRMsg("Error: 'From' and 'To' can't be the same."); return; }
    if (redirects.some((r) => r.from_path === from)) { setRMsg("Error: A redirect for that 'From' path already exists."); return; }
    setBusy(true);
    const { data, error } = await supabase.from("redirects").insert({ from_path: from, to_path: to, enabled: true }).select().single();
    setBusy(false);
    if (error) { setRMsg(`Error: ${error.message}`); return; }
    setRedirects((r) => [data as Redirect, ...r]);
    setNewFrom(""); setNewTo("");
    setRMsg("✓ Added. Live within ~60 seconds.");
  };

  const deleteRedirect = async (id: string) => {
    const { error } = await supabase.from("redirects").delete().eq("id", id);
    if (!error) setRedirects((r) => r.filter((x) => x.id !== id));
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>;

  return (
    <div>
      <h2 style={h2Style}>Tracking scripts</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 16, lineHeight: 1.5 }}>
        Runs in the page &lt;head&gt; on every page — for Google Tag Manager, Meta Pixel, or other tracking.
      </p>
      <Field label="Custom head code (JavaScript only)" value={headScripts} onChange={setHeadScripts} textarea mono rows={6}
        hint="⚠️ Paste ONLY the code that goes INSIDE the <script> tags — not the <script> tags themselves. Wrong code can break the page; always test after saving. Leave empty for none." />

      <h2 style={{ ...h2Style, marginTop: 30 }}>Robots.txt</h2>
      <label className="flex items-center gap-2" style={{ margin: "4px 0 8px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text)" }}>
        <input type="checkbox" checked={siteIndexable} onChange={(e) => setSiteIndexable(e.target.checked)} style={{ accentColor: "var(--color-cyan)" }} />
        Allow search engines to index this site
      </label>
      {!siteIndexable && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#ff6b6b", marginBottom: 12, lineHeight: 1.5 }}>
          ⚠️ Unchecked = the ENTIRE site is hidden from Google. Only use this on a staging/test site, never on the live one.
        </p>
      )}
      <Field label="Extra Disallow paths (one per line)" value={robotsExtra} onChange={setRobotsExtra} textarea mono rows={4}
        hint="/api/ and /admin/ are always blocked automatically. Add more paths to hide from crawlers, one per line — e.g. /thank-you" />

      {msg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: msg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "8px 0 16px" }}>{msg}</p>}
      <button onClick={saveSettings} disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>
        {busy ? "Saving…" : "Save technical settings"}
      </button>

      <h2 style={{ ...h2Style, marginTop: 40 }}>301 Redirects</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 14, lineHeight: 1.5 }}>
        Permanently send an old URL to a new one (keeps the SEO value). Goes live within ~60 seconds — no redeploy.
      </p>
      <div className="flex gap-2 items-center" style={{ flexWrap: "wrap", marginBottom: 8 }}>
        <input value={newFrom} onChange={(e) => setNewFrom(e.target.value)} placeholder="/old-page" style={{ ...inputStyle, flex: "1 1 180px", fontFamily: "var(--font-mono)", fontSize: 14 }} />
        <span style={{ color: "var(--color-cyan)" }}>→</span>
        <input value={newTo} onChange={(e) => setNewTo(e.target.value)} placeholder="/new-page" style={{ ...inputStyle, flex: "1 1 180px", fontFamily: "var(--font-mono)", fontSize: 14 }} />
        <button onClick={addRedirect} disabled={busy} style={{ ...btnStyle, padding: "11px 22px", fontSize: 14, opacity: busy ? 0.6 : 1 }}>Add</button>
      </div>
      {rMsg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: rMsg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "4px 0 14px" }}>{rMsg}</p>}

      <div className="flex flex-col gap-2" style={{ marginTop: 8 }}>
        {redirects.length === 0 ? (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-muted)" }}>No redirects yet.</p>
        ) : (
          redirects.map((r) => (
            <div key={r.id} className="flex items-center gap-3" style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)", background: "var(--color-card-bg)", fontFamily: "var(--font-mono)", fontSize: 13.5 }}>
              <span style={{ color: "var(--color-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.from_path}</span>
              <span style={{ color: "var(--color-cyan)" }}>→</span>
              <span style={{ color: "var(--color-text-muted)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.to_path}</span>
              <button onClick={() => deleteRedirect(r.id)} aria-label="Delete redirect" style={{ border: "none", background: "transparent", color: "#ff6b6b", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 13 }}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// 4) IMAGE ALT TEXT
// ============================================================
function ImageAltManager() {
  const [alts, setAlts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("image_alts").select("image_path, alt").then(({ data }) => {
      const m: Record<string, string> = {};
      (data || []).forEach((r: { image_path: string; alt: string }) => {
        if (r.image_path) m[r.image_path] = r.alt || "";
      });
      setAlts(m);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setBusy(true); setMsg("");
    const rows = MANAGED_IMAGES
      .filter((m) => (alts[m.path] || "").trim())
      .map((m) => ({ image_path: m.path, alt: alts[m.path].trim(), updated_at: new Date().toISOString() }));
    if (rows.length) {
      const { error } = await supabase.from("image_alts").upsert(rows, { onConflict: "image_path" });
      if (error) { setBusy(false); setMsg(`Error: ${error.message}`); return; }
    }
    await revalidate("/", true);
    setBusy(false);
    setMsg("✓ Saved & pushed live. Refresh in a few seconds to see it.");
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>;

  return (
    <div>
      <h2 style={h2Style}>Image alt text</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 18, lineHeight: 1.5 }}>
        Describe each image for SEO &amp; screen readers. Leave empty to use the sensible default (shown faded in the box).
      </p>
      <div className="flex flex-col gap-3">
        {MANAGED_IMAGES.map((m) => (
          <div key={m.path} className="flex items-center gap-3" style={{ padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)", background: "var(--color-card-bg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.path} alt="" style={{ width: 64, height: 46, objectFit: "cover", borderRadius: 8, border: "1px solid var(--color-border-subtle)", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", marginBottom: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.label}</div>
              <input
                value={alts[m.path] ?? ""}
                onChange={(e) => setAlts((p) => ({ ...p, [m.path]: e.target.value }))}
                placeholder={m.defaultAlt}
                style={{ ...inputStyle, fontSize: 14, padding: "8px 12px" }}
              />
            </div>
          </div>
        ))}
      </div>
      {msg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: msg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "14px 0 8px" }}>{msg}</p>}
      <button onClick={save} disabled={busy} style={{ ...btnStyle, marginTop: 16, opacity: busy ? 0.6 : 1 }}>
        {busy ? "Saving…" : "Save alt text"}
      </button>
    </div>
  );
}

// ============================================================
// 5) NAVIGATION / INTERNAL LINKS
// ============================================================
function LinkListEditor({ title, links, setLinks }: { title: string; links: NavLink[]; setLinks: (l: NavLink[]) => void }) {
  const update = (i: number, key: keyof NavLink, val: string) => setLinks(links.map((l, idx) => (idx === i ? { ...l, [key]: val } : l)));
  const remove = (i: number) => setLinks(links.filter((_, idx) => idx !== i));
  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= links.length) return;
    const copy = [...links];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setLinks(copy);
  };
  const arrowBtn: React.CSSProperties = { border: "1px solid var(--color-border-default)", background: "transparent", color: "var(--color-text-muted)", borderRadius: "var(--radius-sm)", width: 30, height: 30, cursor: "pointer", flexShrink: 0 };
  return (
    <div style={{ marginBottom: 26 }}>
      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 12 }}>{title}</h3>
      <div className="flex flex-col gap-2">
        {links.map((l, i) => (
          <div key={i} className="flex gap-2 items-center" style={{ flexWrap: "wrap" }}>
            <input value={l.label} placeholder="Label" onChange={(e) => update(i, "label", e.target.value)} style={{ ...inputStyle, flex: "1 1 130px", fontSize: 14, padding: "8px 12px" }} />
            <input value={l.href} placeholder="/path, /#section or https://…" onChange={(e) => update(i, "href", e.target.value)} style={{ ...inputStyle, flex: "1 1 180px", fontFamily: "var(--font-mono)", fontSize: 13, padding: "8px 12px" }} />
            <button type="button" onClick={() => move(i, -1)} aria-label="Move up" style={arrowBtn}>↑</button>
            <button type="button" onClick={() => move(i, 1)} aria-label="Move down" style={arrowBtn}>↓</button>
            <button type="button" onClick={() => remove(i)} aria-label="Remove" style={{ ...arrowBtn, color: "#ff6b6b" }}>✕</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setLinks([...links, { label: "", href: "" }])} style={{ marginTop: 10, fontFamily: "var(--font-body)", fontSize: 13, padding: "8px 16px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border-default)", background: "transparent", color: "var(--color-cyan)", cursor: "pointer" }}>
        + Add link
      </button>
    </div>
  );
}

function NavManager() {
  const [nav, setNav] = useState<NavLink[]>([]);
  const [foot, setFoot] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("site_settings").select("nav_links, footer_links").eq("id", 1).limit(1).single().then(({ data }) => {
      setNav(Array.isArray(data?.nav_links) && data!.nav_links.length ? data!.nav_links : DEFAULT_SETTINGS.navLinks);
      setFoot(Array.isArray(data?.footer_links) && data!.footer_links.length ? data!.footer_links : DEFAULT_SETTINGS.footerLinks);
      setLoading(false);
    });
  }, []);

  const valid = (list: NavLink[]) => list.every((l) => l.label.trim() && /^(\/|#|https?:\/\/)/.test(l.href.trim()));

  const save = async () => {
    setMsg("");
    const cleanNav = nav.map((l) => ({ label: l.label.trim(), href: l.href.trim() })).filter((l) => l.label && l.href);
    const cleanFoot = foot.map((l) => ({ label: l.label.trim(), href: l.href.trim() })).filter((l) => l.label && l.href);
    if (!cleanNav.length || !cleanFoot.length) { setMsg("Error: Keep at least one link in each menu."); return; }
    if (!valid(cleanNav) || !valid(cleanFoot)) { setMsg("Error: Every link needs a label and a URL starting with /, #, or https://"); return; }
    setBusy(true);
    const { error } = await supabase.from("site_settings").upsert({ id: 1, nav_links: cleanNav, footer_links: cleanFoot, updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (error) { setBusy(false); setMsg(`Error: ${error.message}`); return; }
    await revalidate("/", true);
    setBusy(false);
    setMsg("✓ Saved & pushed live. Refresh in a few seconds to see it.");
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>;

  return (
    <div>
      <h2 style={h2Style}>Navigation &amp; internal links</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 20, lineHeight: 1.5 }}>
        Edit the header menu and footer links. Use <code>/about</code> for a page, <code>/#services</code> for a section, or a full <code>https://…</code> for external. Reorder with ↑ ↓.
      </p>
      <LinkListEditor title="Header menu" links={nav} setLinks={setNav} />
      <LinkListEditor title="Footer links" links={foot} setLinks={setFoot} />
      {msg && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: msg.startsWith("Error") ? "#ff6b6b" : "var(--color-cyan)", margin: "8px 0 12px" }}>{msg}</p>}
      <button onClick={save} disabled={busy} style={{ ...btnStyle, opacity: busy ? 0.6 : 1 }}>{busy ? "Saving…" : "Save navigation"}</button>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 12, lineHeight: 1.5 }}>
        ⚠️ Tip: the desktop header fits about 6 items comfortably — too many can crowd the bar.
      </p>
    </div>
  );
}

function SeoManager() {
  const [tab, setTab] = useState<"page" | "global" | "technical" | "images" | "nav">("page");
  const tabBtn = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
    padding: "10px 20px", borderRadius: "var(--radius-pill)", cursor: "pointer",
    border: active ? "1px solid transparent" : "1px solid var(--color-border-default)",
    background: active ? "var(--gradient)" : "transparent",
    color: active ? "var(--color-cta-text)" : "var(--color-text-muted)",
    transition: "all 0.2s",
  });
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 5vw 80px" }}>
      <Link href="/admin" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>← Control panel</Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28, color: "var(--color-text)", margin: "16px 0 8px" }}>
        SEO &amp; Site Settings
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 22, lineHeight: 1.5 }}>
        Edit SEO for any page or the site as a whole. Changes go live instantly — no redeploy.
      </p>

      {/* Tabs — keep per-page and global settings separate */}
      <div className="flex gap-3" style={{ marginBottom: 32, flexWrap: "wrap" }}>
        <button type="button" onClick={() => setTab("page")} style={tabBtn(tab === "page")}>Per-page SEO</button>
        <button type="button" onClick={() => setTab("global")} style={tabBtn(tab === "global")}>Global — Analytics &amp; Social</button>
        <button type="button" onClick={() => setTab("technical")} style={tabBtn(tab === "technical")}>Technical SEO</button>
        <button type="button" onClick={() => setTab("images")} style={tabBtn(tab === "images")}>Images &amp; Alt</button>
        <button type="button" onClick={() => setTab("nav")} style={tabBtn(tab === "nav")}>Navigation</button>
      </div>

      {tab === "page" ? <PerPageSeo /> : tab === "global" ? <GlobalSettings /> : tab === "technical" ? <TechnicalSeo /> : tab === "images" ? <ImageAltManager /> : <NavManager />}
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

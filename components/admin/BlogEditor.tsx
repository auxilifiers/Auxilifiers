"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { supabase } from "@/lib/supabase";

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  tags: string[];
  published: boolean;
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 15, padding: "12px 14px",
  borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-default)",
  background: "var(--color-input-bg)", color: "var(--color-text)", outline: "none", width: "100%",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
  color: "var(--color-text)", marginBottom: 6, display: "block",
};

function ToolbarButton({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "var(--font-body)", fontSize: 14, minWidth: 36, height: 34, padding: "0 10px",
        borderRadius: 8, cursor: "pointer",
        border: "1px solid var(--color-border-default)",
        background: active ? "var(--color-cyan)" : "transparent",
        color: active ? "var(--color-cta-text)" : "var(--color-text-muted)",
      }}
    >
      {children}
    </button>
  );
}

export default function BlogEditor({ existing }: { existing?: BlogPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(existing?.title || "");
  const [slug, setSlug] = useState(existing?.slug || "");
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const [excerpt, setExcerpt] = useState(existing?.excerpt || "");
  const [cover, setCover] = useState(existing?.cover_image || "");
  const [tags, setTags] = useState((existing?.tags || []).join(", "));
  const [published, setPublished] = useState(existing?.published || false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [bannerUploading, setBannerUploading] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const uploadToStorage = async (file: File): Promise<string | null> => {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) { alert("Upload failed: " + error.message); return null; }
    return supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
    ],
    content: existing?.content || "<p></p>",
    editorProps: {
      attributes: {
        class: "blog-content",
        style: "min-height:320px;outline:none;padding:18px;",
      },
    },
  });

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const save = async () => {
    setMsg("");
    if (!title.trim()) { setMsg("Title is required."); return; }
    if (!slug.trim()) { setMsg("Slug is required."); return; }
    setBusy(true);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: editor?.getHTML() || "",
      cover_image: cover.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      published,
      updated_at: new Date().toISOString(),
    };

    const query = existing?.id
      ? supabase.from("blog_posts").update(payload).eq("id", existing.id)
      : supabase.from("blog_posts").insert([payload]);

    const { error } = await query;
    setBusy(false);
    if (error) { setMsg(error.message); return; }
    router.push("/admin/blog");
    router.refresh();
  };

  const remove = async () => {
    if (!existing?.id) return;
    if (!confirm("Delete this post permanently?")) return;
    setBusy(true);
    const { error } = await supabase.from("blog_posts").delete().eq("id", existing.id);
    setBusy(false);
    if (error) { setMsg(error.message); return; }
    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 5vw 80px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28, color: "var(--color-text)", marginBottom: 24 }}>
        {existing ? "Edit post" : "New post"}
      </h1>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="How automation saves SMBs 20 hours a week" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>URL slug *</label>
        <input value={slug} onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }} style={inputStyle} placeholder="how-automation-saves-smbs" />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 6 }}>/blog/{slug || "…"}</p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Excerpt (short summary for SEO &amp; cards)</label>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="One or two lines that appear on Google and the blog list." />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Banner image</label>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="Banner preview" style={{ width: "100%", aspectRatio: "16 / 7", objectFit: "cover", borderRadius: "var(--radius-md)", marginBottom: 12, border: "1px solid var(--color-border-default)" }} />
        )}
        <div className="flex items-center gap-3 flex-wrap">
          <label style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, padding: "10px 22px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border-strong)", background: "transparent", color: "var(--color-cyan)", cursor: "pointer" }}>
            {bannerUploading ? "Uploading…" : cover ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setBannerUploading(true);
                const url = await uploadToStorage(f);
                setBannerUploading(false);
                if (url) setCover(url);
                e.target.value = "";
              }}
            />
          </label>
          {cover && (
            <button type="button" onClick={() => setCover("")} style={{ fontFamily: "var(--font-body)", fontSize: 14, padding: "10px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border-default)", background: "transparent", color: "var(--color-text-muted)", cursor: "pointer" }}>
              Remove
            </button>
          )}
        </div>
        <input value={cover} onChange={(e) => setCover(e.target.value)} style={{ ...inputStyle, marginTop: 10 }} placeholder="…or paste an image URL" />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 6 }}>Shown as the banner on the post and a thumbnail in the blog list. Recommended: wide image (e.g. 1600×700).</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Tags (comma separated)</label>
        <input value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} placeholder="automation, seo, web" />
      </div>

      <label style={labelStyle}>Content</label>

      {/* Formatting help note */}
      <div style={{ background: "var(--color-input-bg)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-md)", padding: "14px 16px", marginBottom: 10 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-cyan)", marginBottom: 8 }}>
          How to format
        </div>
        <ul style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-dim)", lineHeight: 1.7, margin: 0, paddingLeft: 18, listStyle: "disc" }}>
          <li>Big heading: type <code style={{ color: "var(--color-cyan)" }}>##</code> + space, then your text — or select the line and click <b>H2</b>.</li>
          <li>Small heading: type <code style={{ color: "var(--color-cyan)" }}>###</code> + space, or click <b>H3</b>.</li>
          <li>Bullet list: type <code style={{ color: "var(--color-cyan)" }}>-</code> + space. Numbered list: <code style={{ color: "var(--color-cyan)" }}>1.</code> + space.</li>
          <li>Bold / italic / link / image: select text and use the toolbar buttons.</li>
          <li><b>Pasting from elsewhere?</b> Paste your text first, then select each heading line and click <b>H2</b> (plain pasted text stays as normal paragraphs until you format it).</li>
        </ul>
      </div>

      <div style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {editor && (
          <div className="flex flex-wrap gap-2" style={{ padding: 10, borderBottom: "1px solid var(--color-border-subtle)", background: "var(--color-input-bg)" }}>
            <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></ToolbarButton>
            <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></ToolbarButton>
            <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
            <ToolbarButton active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
            <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
            <ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
            <ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</ToolbarButton>
            <ToolbarButton active={editor.isActive("link")} onClick={() => {
              const url = window.prompt("Link URL");
              if (url === null) return;
              if (url === "") editor.chain().focus().unsetLink().run();
              else editor.chain().focus().setLink({ href: url }).run();
            }}>🔗</ToolbarButton>
            <ToolbarButton onClick={() => imgInputRef.current?.click()}>🖼 Image</ToolbarButton>
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f || !editor) return;
                const url = await uploadToStorage(f);
                if (url) editor.chain().focus().setImage({ src: url }).run();
                e.target.value = "";
              }}
            />
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center gap-3" style={{ marginTop: 20 }}>
        <input id="pub" type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} style={{ width: 18, height: 18 }} />
        <label htmlFor="pub" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text)" }}>
          Published (visible on the site)
        </label>
      </div>

      {msg && <p style={{ color: "#ff6b6b", fontFamily: "var(--font-body)", fontSize: 14, marginTop: 16 }}>{msg}</p>}

      <div className="flex items-center gap-4" style={{ marginTop: 24 }}>
        <button onClick={save} disabled={busy} style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "12px 32px", borderRadius: "var(--radius-pill)", background: "var(--gradient)", color: "var(--color-cta-text)", border: "none", cursor: "pointer", opacity: busy ? 0.6 : 1 }}>
          {busy ? "Saving…" : existing ? "Update post" : "Create post"}
        </button>
        <button onClick={() => router.push("/admin/blog")} style={{ fontFamily: "var(--font-body)", fontSize: 15, padding: "12px 24px", borderRadius: "var(--radius-pill)", background: "transparent", color: "var(--color-text-muted)", border: "1px solid var(--color-border-default)", cursor: "pointer" }}>
          Cancel
        </button>
        {existing && (
          <button onClick={remove} disabled={busy} style={{ marginLeft: "auto", fontFamily: "var(--font-body)", fontSize: 14, padding: "12px 24px", borderRadius: "var(--radius-pill)", background: "transparent", color: "#ff6b6b", border: "1px solid #ff6b6b55", cursor: "pointer" }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

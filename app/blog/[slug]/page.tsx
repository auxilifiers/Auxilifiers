import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://auxilifiers.com";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string | null;
};

async function getPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .limit(1)
    .single();
  return (data as Post) || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false, follow: false } };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      url: `${SITE}/blog/${post.slug}`,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt || undefined },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image || `${SITE}/opengraph-image`,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Auxilifiers", url: SITE },
    publisher: { "@type": "Organization", name: "Auxilifiers", logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const date = fmt(post.created_at);
  const updated = post.updated_at ? new Date(post.updated_at) : null;
  const isUpdated = !!updated && updated.getTime() - new Date(post.created_at).getTime() > 60000;
  const updatedDate = updated ? fmt(post.updated_at!) : "";

  return (
    <article style={{ maxWidth: 920, margin: "0 auto", padding: "clamp(56px,8vw,110px) 5vw 90px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <a href="/blog" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>← Back to blog</a>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(30px,4.5vw,52px)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--color-text)", margin: "20px 0 14px", textAlign: "left" }}>
        {post.title}
      </h1>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 400, color: "var(--color-text-muted)", opacity: 0.8, marginBottom: 32, textAlign: "left" }}>
        {date}
        {post.tags && post.tags.length > 0 && <span> · {post.tags.join(" · ")}</span>}
        {isUpdated && <span> · Updated {updatedDate}</span>}
      </div>

      {post.cover_image && (
        <div style={{ width: "100%", aspectRatio: "16 / 7", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 44, border: "1px solid var(--color-border-subtle)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover_image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}

      <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

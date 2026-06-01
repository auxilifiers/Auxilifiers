import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, no-jargon ideas on websites, AI automation, SEO, and growth for ambitious small and mid-size businesses — from the Auxilifiers team.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | Auxilifiers", url: "/blog", type: "website" },
};

export const revalidate = 60;

type Card = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
  tags: string[] | null;
};

export default async function BlogIndex() {
  const { data } = await supabase
    .from("blog_posts")
    .select("slug,title,excerpt,cover_image,created_at,tags")
    .eq("published", true)
    .order("updated_at", { ascending: false });

  const posts = (data as Card[]) || [];

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 10vw, 120px) 5vw 90px" }}>
      <div className="text-center" style={{ marginBottom: 52 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px,2vw,14px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)", marginBottom: 16 }}>
          The Auxilifiers Blog
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--color-text)" }}>
          Ideas that move{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", background: "var(--gradient-soft)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            business
          </em>.
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-center" style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>
          No posts yet — check back soon.
        </p>
      ) : (
        <div className="flex flex-col gap-5" style={{ maxWidth: 860, margin: "0 auto" }}>
          {posts.map((p) => {
            const date = new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
            return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="flex flex-col min-[560px]:flex-row transition-colors duration-200 overflow-hidden"
                style={{
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border-subtle)",
                  borderLeft: "3px solid var(--color-cyan)",
                  background: "var(--color-card-bg)",
                }}
              >
                {/* Thumbnail — same image, small + consistent shape */}
                <div className="shrink-0 w-full min-[560px]:w-[200px]" style={{ aspectRatio: "4 / 3", background: "var(--gradient-soft)" }}>
                  {p.cover_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover_image} alt={p.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  )}
                </div>

                <div className="flex flex-col" style={{ flex: 1, padding: "22px 26px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-muted)", opacity: 0.75, marginBottom: 8 }}>
                    {date}
                    {p.tags && p.tags.length > 0 && <span> · {p.tags.join(" · ")}</span>}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(19px,2.4vw,24px)", color: "var(--color-text)", letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: p.excerpt ? 8 : 0, textAlign: "left" }}>
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="no-justify" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text-muted)", lineHeight: 1.55, textAlign: "left" }}>
                      {p.excerpt}
                    </p>
                  )}
                  <span style={{ marginTop: "auto", paddingTop: 12, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-cyan)" }}>
                    Read more →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

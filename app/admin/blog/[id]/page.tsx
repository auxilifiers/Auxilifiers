"use client";

import { useEffect, useState, use } from "react";
import AdminGate from "@/components/admin/AdminGate";
import BlogEditor, { type BlogPost } from "@/components/admin/BlogEditor";
import { supabase } from "@/lib/supabase";

function EditLoader({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setPost({
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || "",
            content: data.content || "",
            cover_image: data.cover_image || "",
            tags: data.tags || [],
            published: data.published,
          });
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: 80, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>;
  }
  if (!post) {
    return <div style={{ padding: 80, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Post not found.</div>;
  }
  return <BlogEditor existing={post} />;
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AdminGate>
      <EditLoader id={id} />
    </AdminGate>
  );
}

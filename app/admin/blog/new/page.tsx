"use client";

import AdminGate from "@/components/admin/AdminGate";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewPostPage() {
  return (
    <AdminGate>
      <BlogEditor />
    </AdminGate>
  );
}

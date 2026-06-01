"use client";

import Link from "next/link";
import AdminGate from "@/components/admin/AdminGate";

const modules = [
  { href: "/admin/blog", title: "Blog", desc: "Write, edit and publish blog posts.", icon: "✍️" },
  { href: "/admin/seo", title: "SEO & Site Settings", desc: "Meta title, description, keywords, social links, Analytics, contact.", icon: "🔍" },
  { href: "/admin/testimonials", title: "Testimonials", desc: "Review, hide or delete customer testimonials.", icon: "💬" },
  { href: "/admin/leads", title: "Leads / Enquiries", desc: "Contact-form submissions from your website.", icon: "📥" },
];

function Dashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 5vw 80px", minHeight: "75vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="text-center" style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 32, color: "var(--color-text)", marginBottom: 10 }}>
          Control panel
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text-muted)" }}>
          Manage your website content and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 min-[600px]:grid-cols-2 gap-5">
        {modules.map((m) => (
          <Link key={m.href} href={m.href} className="flex flex-col gap-2 transition-colors duration-200"
            style={{ padding: "24px 26px", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border-default)", borderLeft: "3px solid var(--color-cyan)", background: "var(--color-card-bg)" }}>
            <span style={{ fontSize: 26 }}>{m.icon}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 19, color: "var(--color-text)" }}>{m.title}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5 }}>{m.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function AdminHome() {
  return (
    <AdminGate>
      <Dashboard />
    </AdminGate>
  );
}

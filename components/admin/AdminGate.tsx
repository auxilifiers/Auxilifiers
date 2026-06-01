"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const card: React.CSSProperties = {
  background: "var(--color-card-bg)",
  border: "1px solid var(--color-border-default)",
  borderRadius: "var(--radius-xl)",
};
const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 15, padding: "12px 14px",
  borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-default)",
  background: "var(--color-input-bg)", color: "var(--color-text)", outline: "none", width: "100%",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
  color: "var(--color-text)", marginBottom: 6, display: "block",
};
const btn: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500,
  padding: "12px 28px", borderRadius: "var(--radius-pill)",
  background: "var(--gradient)", color: "var(--color-cta-text)", border: "none", cursor: "pointer",
};

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setError(error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div style={{ padding: 80, textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>Loading…</div>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "70vh", padding: "5vw" }}>
        <form onSubmit={signIn} className="w-full p-8" style={{ ...card, maxWidth: 420 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 26, color: "var(--color-text)", marginBottom: 6 }}>
            Admin login
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)", marginBottom: 22 }}>
            Sign in to manage the blog.
          </p>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="you@auxilifiers.com" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "#ff6b6b", fontFamily: "var(--font-body)", fontSize: 13, marginBottom: 14 }}>{error}</p>}
          <button type="submit" disabled={busy} style={{ ...btn, width: "100%", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between" style={{ padding: "16px 5vw", borderBottom: "1px solid var(--color-border-subtle)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
          {session.user.email}
        </span>
        <button onClick={signOut} style={{ fontFamily: "var(--font-body)", fontSize: 14, padding: "8px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border-default)", background: "transparent", color: "var(--color-text-muted)", cursor: "pointer" }}>
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}

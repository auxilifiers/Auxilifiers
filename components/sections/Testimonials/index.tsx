"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  createdAt: number;
};

const SEED: Testimonial[] = [
  { id: "s-1", name: "Hina Riaz", role: "Founder", company: "Lumière Atelier", quote: "Our new site looks like something a Series-B startup would have. Orders went up 38% in the first month. They actually delivered.", rating: 5, createdAt: 0 },
  { id: "s-2", name: "Omar Khalid", role: "Operations Lead", company: "Riverstone Logistics", quote: "The inbox triage automation saved my team something like 25 hours a week. I genuinely don't know how we ran the company before.", rating: 5, createdAt: 0 },
  { id: "s-3", name: "Aisha Mahmood", role: "Marketing Director", company: "Verda Skincare", quote: "Five agencies told us SEO would take a year. Auxilifiers had us ranking for our money keyword in three months. No tricks, just real work.", rating: 5, createdAt: 0 },
  { id: "s-4", name: "Bilal Sheikh", role: "Founder", company: "MetroFit Studios", quote: "The AI calling agent picks up at 2am and books classes. Our front desk is no longer a bottleneck. I sleep again.", rating: 5, createdAt: 0 },
  { id: "s-5", name: "Sara Imran", role: "Co-Founder", company: "Tiffin Box Co.", quote: "They didn't just build us a website — they fixed our whole ordering flow. Customer complaints dropped to almost zero.", rating: 5, createdAt: 0 },
  { id: "s-6", name: "Daniyal Ahmed", role: "Founder", company: "Clarity Legal", quote: "Plain language is real. They explained every technical decision in a way my non-tech partners understood. Refreshing.", rating: 5, createdAt: 0 },
  { id: "s-7", name: "Maham Tariq", role: "Head of Growth", company: "Stride Apparel", quote: "Meta ad creatives that actually convert. Our CPA dropped 41% over two months — and the new creative comes in every Monday like clockwork.", rating: 5, createdAt: 0 },
  { id: "s-8", name: "Faisal Qureshi", role: "CEO", company: "Northwind Realty", quote: "They rebuilt our CRM sync in a week. We had 6 conflicting customer records per lead before. Now: one source of truth. Game changer.", rating: 5, createdAt: 0 },
  { id: "s-9", name: "Zara Iqbal", role: "Founder", company: "Bloom Stationery", quote: "I had a half-finished Shopify store and ten tabs of confusion. Two weeks later I had a real store and orders. Just… on it.", rating: 5, createdAt: 0 },
  { id: "s-10", name: "Hassan Javed", role: "Operations Manager", company: "Pinewood Cafe Group", quote: "The chatbot answers reservation queries while my team focuses on the floor. Reviews mention how fast we reply now. Worth every rupee.", rating: 5, createdAt: 0 },
];

// Local storage helper functions removed in favor of Supabase backend

function Stars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange?.(n)}
          aria-label={`${n} star`}
          style={{
            background: "none", border: "none", padding: 0,
            cursor: onChange ? "none" : "default",
            color: n <= value ? "var(--color-cyan)" : "var(--color-border-default)",
            fontSize: 18, lineHeight: 1,
          }}>★</button>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className="relative flex flex-col gap-4 p-7 min-[768px]:p-8 shrink-0 svc-testimonial-card overflow-hidden"
      style={{
        background: "var(--color-card-bg)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-xl)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Decorative quote glyph */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -16,
          right: 16,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 120,
          lineHeight: 1,
          color: "var(--color-cyan)",
          opacity: 0.18,
          pointerEvents: "none",
          fontStyle: "italic",
        }}
      >
        &ldquo;
      </span>

      <Stars value={t.rating} />

      <p
        className="no-justify"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: 19,
          lineHeight: 1.5,
          color: "var(--color-text-dim)",
          flex: 1,
          textAlign: "left",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div
        className="flex items-center gap-3.5 pt-4"
        style={{ borderTop: "1px solid var(--color-border-subtle)" }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "var(--gradient)",
            color: "var(--color-cta-text)",
            fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500,
            boxShadow: "0 0 16px color-mix(in srgb, var(--color-cyan) 35%, transparent)",
          }}
        >
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500,
            color: "var(--color-text)", letterSpacing: "-0.01em", lineHeight: 1.2,
          }}>
            {t.name}
          </div>
          <div style={{
            fontFamily: "var(--font-body)", fontSize: 13,
            color: "var(--color-text-muted)", marginTop: 2,
          }}>
            {t.role} <span style={{ color: "var(--color-cyan)" }}>·</span> {t.company}
          </div>
        </div>
      </div>
    </article>
  );
}

function TestimonialMarquee({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0, lastX: 0, lastT: 0, velocity: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    let rafId: number;
    const speed = reverse ? 0.7 : -0.7;

    const animate = () => {
      const halfWidth = track.scrollWidth / 2;
      if (!dragRef.current.active && !pausedRef.current) {
        if (Math.abs(dragRef.current.velocity) > 0.1) {
          xRef.current += dragRef.current.velocity;
          dragRef.current.velocity *= 0.94;
        } else {
          xRef.current += speed;
        }
      }
      if (xRef.current <= -halfWidth) xRef.current += halfWidth;
      else if (xRef.current > 0) xRef.current -= halfWidth;
      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragRef.current.active = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startOffset = xRef.current;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastT = performance.now();
      dragRef.current.velocity = 0;
      try { wrap.setPointerCapture(e.pointerId); } catch {}
      wrap.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      xRef.current = dragRef.current.startOffset + dx;
      const now = performance.now();
      const dt = Math.max(1, now - dragRef.current.lastT);
      dragRef.current.velocity = ((e.clientX - dragRef.current.lastX) / dt) * 16;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastT = now;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      try { wrap.releasePointerCapture(e.pointerId); } catch {}
      wrap.style.cursor = "grab";
    };
    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };

    rafId = requestAnimationFrame(animate);
    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerup", onPointerUp);
    wrap.addEventListener("pointercancel", onPointerUp);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerup", onPointerUp);
      wrap.removeEventListener("pointercancel", onPointerUp);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reverse]);

  return (
    <div ref={wrapRef} className="overflow-hidden w-full select-none" style={{ cursor: "grab", touchAction: "pan-y" }}>
      <div ref={trackRef} className="flex gap-5" style={{ willChange: "transform" }}>
        {items.map((t) => <TestimonialCard key={`a-${t.id}`} t={t} />)}
        {items.map((t) => <TestimonialCard key={`b-${t.id}`} t={t} />)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [userSubs, setUserSubs] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", rating: 5 });
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const json = await res.json();
        if (json.ok && Array.isArray(json.data)) {
          setUserSubs(json.data);
        }
      } catch (err) {
        console.error("Error loading testimonials:", err);
      }
    }
    fetchTestimonials();
  }, []);

  const list: Testimonial[] = [...userSubs, ...SEED];
  // Split into two rows for variety
  const half = Math.ceil(list.length / 2);
  const row1 = list.slice(0, half);
  const row2 = list.slice(half);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) return;
    
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          role: form.role.trim() || "Customer",
          company: form.company.trim() || "—",
          quote: form.quote.trim(),
          rating: form.rating,
        }),
      });
      const json = await res.json();
      if (json.ok && json.data) {
        setUserSubs((prev) => [json.data, ...prev]);
        setForm({ name: "", role: "", company: "", quote: "", rating: 5 });
        setJustSubmitted(true);
        setTimeout(() => setJustSubmitted(false), 3500);
        setShowForm(false);
      } else {
        alert(json.error || "Failed to submit testimonial.");
      }
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontSize: 15,
    padding: "12px 14px", borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-input-bg)", color: "var(--color-text)",
    outline: "none", width: "100%",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
    color: "var(--color-text)", marginBottom: 6, display: "block", textAlign: "left",
  };

  return (
    <section
      id="testimonials"
      style={{
        padding: "clamp(32px, 5vw, 56px) 0 clamp(8px, 1.5vw, 16px)",
        maxWidth: "100%",
        margin: "0 auto",
        scrollMarginTop: 56,
        overflow: "hidden",
      }}
    >
      <div className="text-center mb-6 min-[768px]:mb-8 px-[5vw]">
        <div
          className="flex items-center justify-center gap-3 mb-4"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(10px, 2vw, 14px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-cyan)",
          }}
        >
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
          What clients say
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(34px, 5.5vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--color-text)",
            textShadow: "var(--text-shadow-safety)",
          }}
        >
          Words from the{" "}
          <em
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic", fontWeight: 400,
              background: "var(--gradient-soft)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            orbit
          </em>.
        </h2>
        <p className="mt-4 mx-auto" style={{
          fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.8vw, 17px)",
          color: "var(--color-text-muted)", maxWidth: 560, lineHeight: 1.55,
        }}>
          Real feedback from real founders. Hover or drag to read at your own pace.
        </p>
      </div>

      {/* Two rows, opposite directions */}
      <div className="flex flex-col gap-5">
        <TestimonialMarquee items={row1} />
        <TestimonialMarquee items={row2} reverse />
      </div>

      {/* Submit CTA */}
      <div className="flex flex-col items-center gap-4 mt-10 px-[5vw]">
        {justSubmitted && (
          <div className="text-center p-3" style={{
            background: "rgba(0, 245, 255, 0.08)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-lg)",
            color: "var(--color-cyan)",
            fontFamily: "var(--font-body)", fontSize: 14,
          }}>
            ✓ Thanks for sharing — your testimonial is live in the carousel above.
          </div>
        )}
        {!showForm ? (
          <button onClick={() => setShowForm(true)}
            style={{
              fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500,
              padding: "12px 28px", borderRadius: "var(--radius-pill)",
              border: "1px solid var(--color-border-strong)",
              background: "transparent", color: "var(--color-cyan)", cursor: "none",
            }}>
            + Share your testimonial
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="w-full p-6 min-[640px]:p-8" style={{
            maxWidth: 640, background: "var(--color-card-bg)",
            border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-xl)",
          }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22,
                color: "var(--color-text)", letterSpacing: "-0.02em",
              }}>Share your experience</h3>
              <button type="button" onClick={() => setShowForm(false)} style={{
                width: 32, height: 32, borderRadius: "50%",
                border: "1px solid var(--color-border-default)",
                background: "transparent", color: "var(--color-text-muted)",
                cursor: "none", fontSize: 16,
              }}>×</button>
            </div>
            <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-4 mb-4">
              <div>
                <label style={labelStyle}>Your name <span style={{ color: "var(--color-cyan)" }}>*</span></label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ayesha Khan" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Founder, Marketing Lead..." style={inputStyle} />
              </div>
            </div>
            <div className="mb-4">
              <label style={labelStyle}>Company</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Acme Co." style={inputStyle} />
            </div>
            <div className="mb-4">
              <label style={labelStyle}>Your testimonial <span style={{ color: "var(--color-cyan)" }}>*</span></label>
              <textarea required minLength={10} maxLength={400} rows={4}
                value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="What did we do, what changed, and would you recommend us?"
                style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} />
            </div>
            <div className="mb-5">
              <label style={labelStyle}>Rating</label>
              <Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
            </div>
            <button type="submit" style={{
              fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500,
              padding: "12px 28px", borderRadius: "var(--radius-pill)",
              background: "var(--gradient)", color: "var(--color-cta-text)",
              border: "none", cursor: "none",
            }}>
              Submit testimonial →
            </button>
            <p className="mt-3" style={{
              fontFamily: "var(--font-body)", fontSize: 12,
              color: "var(--color-text-muted)", lineHeight: 1.5,
            }}>
              Your testimonial is stored in your browser and appears instantly in the carousel. We&apos;ll review and feature genuine ones globally.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

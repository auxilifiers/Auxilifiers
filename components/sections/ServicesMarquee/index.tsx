"use client";

import { useEffect, useRef } from "react";

const items = [
  { text: "Web Development", italic: false },
  { text: "Mobile Apps", italic: true },
  { text: "Shopify Stores", italic: false },
  { text: "AI Workflows", italic: true },
  { text: "Chatbots", italic: false },
  { text: "Calling Agents", italic: true },
  { text: "Voice-on-Site", italic: false },
  { text: "SEO", italic: true },
  { text: "Google Ads", italic: false },
  { text: "Meta Ads", italic: true },
  { text: "Social Media Handling", italic: false },
  { text: "Content Strategy", italic: true },
  { text: "Integrations", italic: false },
  { text: "CRM Sync", italic: true },
];

function MarqueeTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const speedRef = useRef(1);
  const directionRef = useRef(1);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId: number;
    const baseSpeed = 0.8;
    const animate = () => {
      const halfWidth = track.scrollWidth / 2;
      xRef.current -= baseSpeed * speedRef.current * directionRef.current;
      if (xRef.current <= -halfWidth) xRef.current = 0;
      else if (xRef.current > 0) xRef.current = -halfWidth;
      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current) { directionRef.current = -1; speedRef.current = 2; }
      else { directionRef.current = 1; speedRef.current = 1.5; }
      lastScrollY.current = currentY;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => { directionRef.current = 1; speedRef.current = 1; }, 200);
    };
    rafId = requestAnimationFrame(animate);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("scroll", onScroll); if (scrollTimeout.current) clearTimeout(scrollTimeout.current); };
  }, []);

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-6 shrink-0">
        <span className="marquee-item whitespace-nowrap" style={{
          fontFamily: item.italic ? "'Instrument Serif', serif" : "var(--font-display)",
          fontStyle: item.italic ? "italic" : "normal",
          fontWeight: item.italic ? 400 : 300,
          fontSize: "clamp(32px, 4.5vw, 64px)",
          color: "var(--color-text-dim)", letterSpacing: "-0.02em",
        }}>{item.text}</span>
        <span className="text-cyan shrink-0" style={{ fontSize: "clamp(16px, 2vw, 24px)", opacity: 0.5 }}>✦</span>
      </span>
    ));

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex items-center gap-6" style={{ willChange: "transform" }}>
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
}

export default function ServicesMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const section = sectionRef.current;
      if (!section) return;

      // Slide in from left with scale
      gsap.fromTo(section.querySelector(".svc-eyebrow"), { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
      gsap.fromTo(section.querySelector(".svc-heading"), { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: section, start: "top 80%" } });
      gsap.fromTo(section.querySelector(".svc-sub"), { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: section, start: "top 80%" } });
    };
    init();
  }, []);

  return (
    <div id="services" style={{ scrollMarginTop: 68, marginTop: 60 }}>
      <section ref={sectionRef} style={{ padding: "100px 6vw 50px", maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
        <div className="svc-eyebrow flex items-center justify-center gap-4 mb-5 opacity-0" style={{
          fontFamily: "var(--font-mono)", fontSize: 14,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
        }}>
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
          Services
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        </div>
        <h2 className="svc-heading opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.025em",
          lineHeight: 1.05, color: "white", textShadow: "var(--text-shadow-safety)", marginBottom: 12,
        }}>
          Everything you need, under one roof.
        </h2>
        <p className="svc-sub opacity-0" style={{
          fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55,
          color: "var(--color-text-muted)", maxWidth: 560, margin: "0 auto",
        }}>
          Build, automate, and grow — all under one roof.
        </p>
      </section>

      <section className="relative w-full overflow-hidden" style={{
        padding: "56px 0", marginTop: 20,
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
        background: "rgba(0, 0, 0, 0.25)", backdropFilter: "blur(8px)",
      }}>
        <MarqueeTrack />
      </section>
    </div>
  );
}

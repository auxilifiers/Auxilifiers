"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import BuildViz from "./viz/BuildViz";
import AutomateViz from "./viz/AutomateViz";
import GrowViz from "./viz/GrowViz";
import { services, type Service } from "@/data/services";

type PillarData = {
  id: "build" | "automate" | "grow";
  label: string;
  counter: number;
  title: React.ReactNode;
  description: React.ReactNode;
  tags: { id: string; label: string }[];
  viz: React.ReactNode;
  rotation: number;
  featured?: boolean;
};

const pillars: PillarData[] = [
  {
    id: "build",
    label: "PILLAR/01",
    counter: 14,
    title: "Build",
    description: (
      <>
        The products, platforms, and stores your customers actually touch.{" "}
        <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "white" }}>Tap a tag</em>{" "}
        for details.
      </>
    ),
    tags: [
      { id: "web-dev", label: "Web Dev" },
      { id: "mobile-apps", label: "Mobile Apps" },
      { id: "shopify", label: "Shopify" },
      { id: "integrations", label: "Integrations" },
    ],
    viz: <BuildViz />,
    rotation: -0.4,
  },
  {
    id: "automate",
    label: "PILLAR/02",
    counter: 42,
    title: (
      <>
        The{" "}
        <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>unfair</em>{" "}
        advantage.
      </>
    ),
    description: (
      <>
        The operations that drain your team — turned into systems that run themselves.
        Workflows, chatbots, voice agents, AI integrations. We&apos;re an{" "}
        <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "white" }}>n8n + Claude + Vapi</em>{" "}
        shop. That stack is most of why our clients call us in the first place.{" "}
        <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "white" }}>Tap a tag</em>{" "}
        for details.
      </>
    ),
    tags: [
      { id: "ai-workflows", label: "AI Workflows" },
      { id: "chatbots", label: "Chatbots" },
      { id: "voice-agents", label: "Voice Agents" },
      { id: "voice-on-site", label: "Voice-on-Site" },
      { id: "crm-sync", label: "CRM Sync" },
      { id: "inbox-triage", label: "Inbox Triage" },
    ],
    viz: <AutomateViz />,
    rotation: 0.3,
    featured: true,
  },
  {
    id: "grow",
    label: "PILLAR/03",
    counter: 28,
    title: "Grow",
    description: (
      <>
        The audiences and revenue that compound — engineered, not gambled. Last quarter: +47% organic traffic across portfolio.{" "}
        <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "white" }}>Tap a tag</em>{" "}
        for details.
      </>
    ),
    tags: [
      { id: "seo", label: "SEO" },
      { id: "google-ads", label: "Google Ads" },
      { id: "meta-ads", label: "Meta Ads" },
      { id: "social", label: "Social" },
      { id: "content", label: "Content" },
    ],
    viz: <GrowViz />,
    rotation: 0.4,
  },
];

function PillarCard({ pillar }: { pillar: PillarData }) {
  const [flipped, setFlipped] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pillarServices = services.filter((s) => s.pillar === pillar.id);

  const flipTo = useCallback((serviceId: string) => {
    const svc = services.find((s) => s.id === serviceId);
    if (svc) { setActiveService(svc); setFlipped(true); }
  }, []);

  const flipBack = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setActiveService(null), 750);
  }, []);

  const switchService = useCallback((serviceId: string) => {
    const svc = services.find((s) => s.id === serviceId);
    if (svc) setActiveService(svc);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") flipBack(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipBack]);

  useEffect(() => {
    if (!flipped) return;
    const startY = window.scrollY;
    const onScroll = () => { if (Math.abs(window.scrollY - startY) > 240) flipBack(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [flipped, flipBack]);

  return (
    <div
      ref={cardRef}
      className="pillar relative h-full"
      style={{ perspective: 1800, transform: `rotate(${pillar.rotation}deg)`, transition: "transform 0.3s ease" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = `rotate(${pillar.rotation}deg) translateY(-4px)`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = `rotate(${pillar.rotation}deg)`; }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {/* FRONT — S6b: bumped typography */}
        <div
          className="relative w-full flex flex-col p-6 overflow-hidden"
          style={{
            backfaceVisibility: "hidden", background: "var(--color-surface-elevated)",
            borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border-subtle)",
            minHeight: pillar.featured ? 600 : 420,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              {pillar.label}
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--color-cyan)", fontWeight: 400 }}>
              {pillar.counter}
            </span>
          </div>
          <h3 className="mb-3" style={{
            fontFamily: "var(--font-display)", fontSize: pillar.featured ? 64 : 44,
            fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1, color: "white",
          }}>
            {pillar.title}
          </h3>
          <p className="mb-5" style={{
            fontFamily: "var(--font-body)", fontSize: pillar.featured ? 18 : 16,
            lineHeight: 1.65, color: "var(--color-text-muted)",
          }}>
            {pillar.description}
          </p>
          <div className="flex-1 flex items-center justify-center mb-5 min-h-[100px]">
            {pillar.viz}
          </div>
          <div className="flex flex-wrap gap-2">
            {pillar.tags.map((tag) => (
              <button
                key={tag.id}
                className="tag flex items-center gap-1.5 transition-all duration-200"
                data-service={tag.id}
                onClick={() => flipTo(tag.id)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 13,
                  padding: "7px 14px", borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--color-border-strong)", color: "var(--color-cyan)",
                  background: "rgba(0, 245, 255, 0.06)", letterSpacing: "0.04em", cursor: "none",
                }}
              >
                {tag.label}
                <span style={{ fontSize: 10, opacity: 0.6 }}>↗</span>
              </button>
            ))}
          </div>
        </div>

        {/* BACK — S7: consistent typography, S8: styled scrollbar */}
        <div
          className="pillar-back absolute inset-0 flex flex-col p-6 overflow-y-auto"
          style={{
            backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            background: "var(--color-surface-elevated)", borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border-strong)",
          }}
        >
          {activeService && (
            <>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--color-cyan)", textTransform: "uppercase" }}>
                    {pillar.id} · service
                  </span>
                  <h4 className="mt-1" style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, letterSpacing: "-0.025em", color: "white" }}>
                    {activeService.title}
                  </h4>
                </div>
                <button
                  onClick={flipBack}
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--color-border-default)", color: "var(--color-text-muted)", fontSize: 16, background: "transparent", cursor: "none" }}
                >
                  ×
                </button>
              </div>
              <p className="mb-5" style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--color-text-dim)" }}>
                {activeService.pitch}
              </p>
              <div className="mb-5">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                  What you get
                </span>
                <ul className="mt-3 flex flex-col gap-2">
                  {activeService.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--color-text-dim)", padding: "3px 0" }}>
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
                <span className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                  Switch service
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {pillarServices.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => switchService(svc.id)}
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: 11,
                        padding: "4px 10px", borderRadius: "var(--radius-pill)",
                        border: `1px solid ${svc.id === activeService.id ? "var(--color-border-active)" : "var(--color-border-subtle)"}`,
                        color: svc.id === activeService.id ? "var(--color-cyan)" : "var(--color-text-muted)",
                        background: svc.id === activeService.id ? "rgba(0,245,255,0.1)" : "transparent",
                        cursor: "none", letterSpacing: "0.04em",
                      }}
                    >
                      {svc.title}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(section.querySelector(".pillars-eyebrow"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%" } });
      gsap.fromTo(section.querySelector(".pillars-headline"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%" } });
      gsap.fromTo(section.querySelectorAll(".pillar"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: section, start: "top 60%" } });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "160px 6vw", maxWidth: 1400, margin: "0 auto" }}>
      <div className="pillars-eyebrow flex items-center gap-4 mb-6 opacity-0" style={{
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
      }}>
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        How we work · three pillars
      </div>

      <h2 className="pillars-headline mb-16 opacity-0" style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.05 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(40px, 6.5vw, 96px)", letterSpacing: "-0.035em", color: "white" }}>
          Three pillars.{" "}
        </span>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px, 6.5vw, 96px)", background: "var(--gradient-soft)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          One
        </span>{" "}
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(56px, 9vw, 134px)", letterSpacing: "-0.035em", color: "white" }}>
          mission.
        </span>
      </h2>

      {/* S6a: grid rows auto so Grow extends */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-5" style={{ gridAutoRows: "minmax(420px, auto)" }}>
        <PillarCard pillar={pillars[0]} />
        <div className="min-[900px]:row-span-2">
          <PillarCard pillar={pillars[1]} />
        </div>
        <PillarCard pillar={pillars[2]} />
      </div>
    </section>
  );
}

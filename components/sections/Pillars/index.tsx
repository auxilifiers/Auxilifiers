"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { pillars, getServicesByPillar } from "@/data/services";
import { altFor } from "@/lib/managed-images";

export default function Pillars({ alts = {} }: { alts?: Record<string, string> }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector(".pillars-eyebrow"),
        { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } }
      );

      const hWords = section.querySelectorAll(".pillar-hword");
      gsap.fromTo(
        hWords,
        { opacity: 0, scale: 0.3, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)", stagger: 0.1, scrollTrigger: { trigger: section, start: "top 75%" } }
      );

      gsap.fromTo(
        section.querySelectorAll(".pillar"),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: section, start: "top 65%" } }
      );
    };
    init();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ padding: "clamp(32px, 5vw, 60px) 5vw clamp(40px, 6vw, 72px)", maxWidth: 1600, margin: "0 auto", scrollMarginTop: 56 }}
    >
      <div
        className="pillars-eyebrow flex items-center justify-center gap-3 mb-5 opacity-0"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(9px, 2.2vw, 14px)",
          letterSpacing: "clamp(0.08em, 1vw, 0.18em)",
          textTransform: "uppercase",
          color: "var(--color-cyan)",
        }}
      >
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        How we work · three pillars
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
      </div>

      <h2 className="mb-10" style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.05, textAlign: "center", perspective: 800 }}>
        <span className="pillar-hword inline-block opacity-0" style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(40px, 6.5vw, 96px)", letterSpacing: "-0.035em", color: "var(--color-text)", marginRight: "0.15em" }}>
          Three
        </span>
        <span className="pillar-hword inline-block opacity-0" style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(40px, 6.5vw, 96px)", letterSpacing: "-0.035em", color: "var(--color-text)", marginRight: "0.3em" }}>
          pillars.
        </span>
        <span className="pillar-hword inline-block opacity-0" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px, 6.5vw, 96px)", background: "var(--gradient-soft)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginRight: "0.3em" }}>
          One
        </span>
        <span className="pillar-hword inline-block opacity-0" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(56px, 9vw, 134px)", letterSpacing: "-0.035em", color: "var(--color-text)" }}>
          mission.
        </span>
      </h2>

      {/* 3 image cards in one row */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-6" style={{ gridAutoRows: "1fr" }}>
        {pillars.map((pillar) => {
          const count = getServicesByPillar(pillar.id).length;
          return (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="pillar svc-card group relative flex flex-col overflow-hidden opacity-0"
              style={{
                background: "var(--color-card-bg)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border-subtle)",
                textDecoration: "none",
                color: "inherit",
                cursor: "none",
              }}
            >
              {/* Image */}
              <div className="relative" style={{ height: 240, overflow: "hidden" }}>
                <Image
                  src={pillar.image}
                  alt={altFor(alts, pillar.image, `${pillar.title} services illustration`)}
                  fill
                  sizes="(max-width: 900px) 100vw, 30vw"
                  style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                  className="group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "var(--color-card-img-overlay)" }} />
                <span
                  className="absolute top-4 left-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-cyan)",
                    padding: "6px 12px",
                    background: "rgba(0,0,0,0.78)",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--color-cyan)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {pillar.label}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-7 gap-3">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 4.5vw, 40px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                    color: "var(--color-text)",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(18px, 2.4vw, 22px)",
                    color: "var(--color-cyan)",
                    lineHeight: 1.3,
                    marginTop: -4,
                  }}
                >
                  {pillar.tagline}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(14px, 2.6vw, 16px)",
                    lineHeight: 1.6,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {pillar.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-5" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {count} services
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "var(--color-cyan)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    View all <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

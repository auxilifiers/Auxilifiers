"use client";

import { useEffect, useRef } from "react";

export default function Declaration() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector(".decl-eyebrow"),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%" } }
      );

      gsap.fromTo(
        section.querySelectorAll(".word-anim"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.18, scrollTrigger: { trigger: section, start: "top 70%" } }
      );
    };

    init();
  }, []);

  const base = "clamp(40px, 6.5vw, 96px)";

  return (
    <section ref={sectionRef} style={{ padding: "200px 6vw", maxWidth: 1400, margin: "0 auto" }}>
      {/* S5: Centered eyebrow, new text */}
      <div
        className="decl-eyebrow flex items-center justify-center gap-4 mb-16 opacity-0"
        style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
        }}
      >
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        What we believe.
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
      </div>

      {/* S5: Center-aligned statement */}
      <div style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.15, textAlign: "center" }}>
        <div className="word-anim opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: `calc(${base} * 0.6)`, color: "var(--color-text-dim)", marginBottom: "0.15em",
        }}>
          We don&apos;t
        </div>
        <div className="word-anim opacity-0" style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
          fontSize: `calc(${base} * 1.1)`, color: "var(--color-text-strike)",
          textDecoration: "line-through", textDecorationThickness: 2,
          textDecorationColor: "var(--color-text-strike)", marginBottom: "0.15em",
        }}>
          take the spotlight.
        </div>
        <div className="word-anim opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: `calc(${base} * 1.15)`, color: "white", marginBottom: "0.15em",
        }}>
          We orbit{" "}
          <span style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
            background: "var(--gradient-soft)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            your business
          </span>
        </div>
        <div className="word-anim opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: `calc(${base} * 0.55)`, color: "var(--color-text-dim)",
        }}>
          — amplifying what&apos;s already yours.
        </div>
      </div>
    </section>
  );
}

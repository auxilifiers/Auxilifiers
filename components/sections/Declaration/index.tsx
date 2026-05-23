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

      gsap.fromTo(section.querySelector(".decl-eyebrow"), { opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%" } });

      const rows = section.querySelectorAll(".word-anim");
      rows.forEach((row, i) => {
        const directions = [{ x: -60, y: 0 }, { x: 0, y: 40 }, { x: -40, y: 0 }, { x: 0, y: -30 }];
        const dir = directions[i] || { x: 0, y: 40 };
        gsap.fromTo(row, { opacity: 0, x: dir.x, y: dir.y },
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.15,
            scrollTrigger: { trigger: section, start: "top 70%" } });
      });

      gsap.fromTo(section.querySelector(".about-right"), { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: section, start: "top 70%" } });
    };
    init();
  }, []);

  const base = "clamp(36px, 5.5vw, 80px)";

  return (
    <section id="about" ref={sectionRef} style={{ padding: "160px 6vw", maxWidth: 1400, margin: "0 auto", scrollMarginTop: 68 }}>
      <div className="decl-eyebrow flex items-center gap-4 mb-16 opacity-0" style={{
        fontFamily: "var(--font-mono)", fontSize: 14,
        letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
      }}>
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        About us
      </div>

      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-20 items-start">
        {/* Left — Philosophy, left-aligned */}
        <div style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.15 }}>
          <div className="word-anim opacity-0" style={{
            fontFamily: "var(--font-display)", fontWeight: 300,
            fontSize: `calc(${base} * 0.6)`, color: "var(--color-text-dim)", marginBottom: "0.15em",
          }}>We don&apos;t</div>
          <div className="word-anim opacity-0" style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
            fontSize: `calc(${base} * 1.1)`, color: "var(--color-text-strike)",
            textDecoration: "line-through", textDecorationThickness: 2,
            textDecorationColor: "var(--color-text-strike)", marginBottom: "0.15em",
          }}>take the spotlight.</div>
          <div className="word-anim opacity-0" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: `calc(${base} * 1.15)`, color: "white", marginBottom: "0.15em",
          }}>
            We support{" "}
            <span style={{
              fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
              background: "var(--gradient-soft)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>your business</span>
          </div>
          <div className="word-anim opacity-0" style={{
            fontFamily: "var(--font-display)", fontWeight: 300,
            fontSize: `calc(${base} * 0.55)`, color: "var(--color-text-dim)",
          }}>— amplifying what&apos;s already yours.</div>
        </div>

        {/* Right — About details */}
        <div className="about-right opacity-0" style={{ paddingTop: 8 }}>
          {/* Quick stats — on top */}
          <div className="flex gap-10 flex-wrap mb-10">
            {[
              { num: "15+", label: "Services" },
              { num: "4", label: "Continents" },
              { num: "24/7", label: "Support" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400,
                  color: "var(--color-cyan)", letterSpacing: "-0.03em", lineHeight: 1,
                }}>{s.num}</span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em",
                  color: "var(--color-text-dim)", textTransform: "uppercase", marginTop: 6,
                }}>{s.label}</span>
              </div>
            ))}
          </div>

          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28,
            color: "white", marginBottom: 20, letterSpacing: "-0.02em",
          }}>
            Who we are
          </h3>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7,
            color: "var(--color-text-dim)", marginBottom: 20,
          }}>
            Auxilifiers is a tech and growth agency that works as your extended team. We build the products your customers use, automate the operations that drain your time, and grow the channels that bring in revenue.
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7,
            color: "var(--color-text-dim)", marginBottom: 20,
          }}>
            We&apos;re not here to take over — we&apos;re here to amplify. Your brand, your vision, your growth. We just make it happen faster.
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7,
            color: "var(--color-text-dim)",
          }}>
            From custom websites and mobile apps to AI-powered workflows and full-scale digital marketing — we handle the entire stack so you can focus on what you do best: running your business.
          </p>
        </div>
      </div>
    </section>
  );
}

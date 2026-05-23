"use client";

import { useEffect, useRef } from "react";

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const outcomesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".whyus-anim"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: section, start: "top 70%" } }
      );

      if (outcomesRef.current) {
        gsap.fromTo(
          outcomesRef.current,
          { backgroundPosition: "100% 0" },
          { backgroundPosition: "0% 0", ease: "power2.inOut", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.8 } }
        );
      }
    };
    init();
  }, []);

  const base = "clamp(40px, 6.5vw, 96px)";

  return (
    <section id="whyus" ref={sectionRef} style={{ minHeight: "160vh", position: "relative", scrollMarginTop: 56 }}>
      <div className="sticky top-0 flex flex-col justify-center" style={{ minHeight: "100vh", padding: "56px 5vw 0", maxWidth: 1400, margin: "0 auto" }}>
        {/* S9: Center-aligned eyebrow */}
        <div className="whyus-anim flex items-center justify-center gap-4 mb-8 min-[768px]:mb-16 opacity-0" style={{
          fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
        }}>
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
          Why us, briefly
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        </div>

        {/* S9: Center-aligned text */}
        <div style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.15, textAlign: "center" }}>
          <div className="whyus-anim opacity-0" style={{
            fontFamily: "var(--font-display)", fontWeight: 300, fontSize: base, color: "white", marginBottom: "0.15em",
          }}>
            While agencies
          </div>
          <div className="whyus-anim opacity-0" style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
            fontSize: `calc(${base} * 1.05)`, color: "var(--color-text-strike)",
            textDecoration: "line-through", textDecorationThickness: 2,
            textDecorationColor: "var(--color-text-strike)", marginBottom: "0.15em",
          }}>
            bill hours,
          </div>
          <div className="whyus-anim opacity-0" style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
            fontSize: `calc(${base} * 1.2)`,
          }}>
            <span ref={outcomesRef} style={{
              background: "linear-gradient(90deg, #00F5FF 0%, #0066FF 50%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.35) 100%)",
              backgroundSize: "200% 100%", backgroundPosition: "100% 0",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              we ship outcomes.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

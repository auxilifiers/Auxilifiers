"use client";

import { useEffect, useRef, useState } from "react";
import OrbitDot from "./OrbitDot";
import Drifter from "./Drifter";

function useCountUp(target: number, duration = 1800, suffix = "") {
  const [value, setValue] = useState("0" + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setValue(current + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    setTimeout(() => requestAnimationFrame(tick), 2200);
  }, [target, duration, suffix]);

  return { value, ref };
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const drifterRef = useRef<HTMLDivElement>(null);

  const stat1 = useCountUp(12, 1800);
  const stat2 = useCountUp(38, 2000);
  const stat3 = useCountUp(73, 1600, "%");

  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import("gsap")).default;
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(".hero-line1 .char", { opacity: 0, y: -50, rotation: -8 },
        { opacity: 1, y: 0, rotation: 0, duration: 0.9, ease: "back.out(1.4)", stagger: 0.04 }, 0);

      tl.fromTo(".hero-line2 .char", { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", stagger: 0.03 }, 0.5);

      const line3El = document.querySelector(".hero-line3") as HTMLElement;
      if (line3El) {
        const finalText = "your success.";
        const chars = "!@#$%^&*<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let startTime = 0;
        const scramble = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / 1400, 1);
          const revealCount = Math.floor(progress * finalText.length);
          let display = "";
          for (let i = 0; i < finalText.length; i++) {
            if (finalText[i] === " ") display += " ";
            else if (i < revealCount) display += finalText[i];
            else display += chars[Math.floor(Math.random() * chars.length)];
          }
          const textSpan = line3El.querySelector(".scramble-text");
          if (textSpan) textSpan.textContent = display.slice(0, -1);
          if (progress < 1) requestAnimationFrame(scramble);
          else if (textSpan) textSpan.textContent = "your success";
        };
        tl.fromTo(line3El, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.7);
        tl.add(() => requestAnimationFrame(scramble), 0.7);
        tl.fromTo(".hero-period", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 1.6);
      }

      tl.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.4);
      tl.fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 1.6);
      tl.fromTo(".hero-stat", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }, 2.0);

      if (drifterRef.current) {
        gsap.fromTo(drifterRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 2.2 });
        setTimeout(() => {
          const vw = window.innerWidth;
          gsap.fromTo(drifterRef.current, { x: 0 }, {
            x: vw + 200, duration: 18, ease: "none", repeat: -1,
            onRepeat: () => { if (drifterRef.current) drifterRef.current.style.top = `${10 + Math.random() * 50}%`; },
          });
        }, 2600);
      }
    };
    initAnimations();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
    e.currentTarget.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    setTimeout(() => { e.currentTarget.style.transition = ""; }, 400);
  };

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: "transform, opacity" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const stats = [
    { counter: stat1, label: "Live projects right now" },
    { counter: stat2, label: "Avg hrs/week saved per client" },
    { counter: stat3, label: "Of pitches we win on outcomes" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "calc(100dvh - 68px)", padding: "0 6vw", overflow: "hidden" }}
    >
      <div className="relative z-10 max-w-[1400px] h-full flex flex-col justify-center">
        {/* Headline */}
        <div style={{ marginBottom: 20 }}>
          <div className="hero-line1" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(44px, 7vw, 100px)", lineHeight: 0.95,
            letterSpacing: "-0.045em", color: "white",
            transform: "rotate(-0.5deg)", textShadow: "var(--text-shadow-safety)",
          }}>
            {splitChars("Orbit")}
            <span className="char inline-block" style={{ willChange: "transform, opacity" }}>
              <span className="relative inline-block">
                <span style={{ fontFamily: "var(--font-display)" }}>ı</span>
                <span className="absolute" style={{ top: "-0.15em", left: "50%", transform: "translateX(-50%)" }}>
                  <OrbitDot size={12} />
                </span>
              </span>
            </span>
            {splitChars("ng")}
          </div>
          <div className="hero-line2" style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(28px, 4.5vw, 64px)", lineHeight: 1.1,
            color: "var(--color-text-dim)", letterSpacing: "-0.02em",
            textShadow: "var(--text-shadow-safety)",
          }}>
            {splitChars("around")}
          </div>
          <div className="hero-line3 opacity-0" style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(48px, 9vw, 128px)", lineHeight: 0.95,
            letterSpacing: "-0.02em", transform: "rotate(0.5deg)",
            textShadow: "var(--text-shadow-safety)",
            background: "var(--gradient-soft)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            <span className="scramble-text">your success</span>
            <span className="hero-period" style={{
              fontFamily: "var(--font-display)", color: "#00F5FF", fontSize: "0.7em",
              verticalAlign: "-0.05em", display: "inline-block", WebkitTextFillColor: "#00F5FF",
            }}>.</span>
          </div>
        </div>

        {/* Sub paragraph */}
        <p className="hero-sub opacity-0" style={{
          fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.5,
          color: "var(--color-text-dim)", textShadow: "var(--text-shadow-safety)",
          maxWidth: 500, marginBottom: 20,
        }}>
          We{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "white" }}>build</em>{" "}
          the tech,{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "white" }}>automate</em>{" "}
          the operations, and{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "white" }}>grow</em>{" "}
          the reach — for businesses ready to scale beyond what their team alone can carry.
        </p>

        {/* CTA */}
        <a
          href="#services"
          className="hero-cta opacity-0 inline-flex items-center text-black self-start"
          style={{
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
            padding: "12px 24px", borderRadius: "var(--radius-pill)",
            background: "var(--gradient)", transition: "box-shadow 0.2s",
            marginBottom: 28,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          See what services we offer&nbsp;→
        </a>

        {/* Stats — horizontal row below CTA */}
        <div className="flex flex-wrap justify-between gap-6" style={{ maxWidth: 700 }}>
          {stats.map((stat, i) => (
            <div key={i} className="hero-stat opacity-0 flex items-baseline gap-3">
              <span ref={stat.counter.ref} style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400, color: "white", letterSpacing: "-0.03em",
                lineHeight: 1, textShadow: "var(--text-shadow-safety)",
              }}>{stat.counter.value}</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em",
                color: "var(--color-text-dim)", textTransform: "uppercase",
                maxWidth: 130,
              }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drifter — absolutely positioned */}
      <div ref={drifterRef} className="opacity-0 absolute" style={{ top: 0, left: 0 }}>
        <Drifter />
      </div>
    </section>
  );
}

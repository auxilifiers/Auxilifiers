"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTORS = "a, button, .tag, .pillar, .marquee-item";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show cursor on first mouse move (proves it's not touch-only)
    const onFirstMove = () => {
      setVisible(true);
      window.removeEventListener("mousemove", onFirstMove);
    };
    window.addEventListener("mousemove", onFirstMove);

    return () => window.removeEventListener("mousemove", onFirstMove);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    };

    const onEnter = () => {
      isHovering.current = true;
      if (ring) {
        ring.style.width = "70px";
        ring.style.height = "70px";
        ring.style.borderColor = "rgba(0, 245, 255, 0.4)";
        ring.style.backgroundColor = "rgba(0, 245, 255, 0.08)";
      }
      if (dot) {
        dot.style.opacity = "0.3";
        dot.style.transform += " scale(0.5)";
      }
    };

    const onLeave = () => {
      isHovering.current = false;
      if (ring) {
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "rgba(0, 245, 255, 0.5)";
        ring.style.backgroundColor = "transparent";
      }
      if (dot) {
        dot.style.opacity = "1";
      }
    };

    const bindListeners = () => {
      document.querySelectorAll(INTERACTIVE_SELECTORS).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    const observer = new MutationObserver(bindListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMouseMove);
    bindListeners();

    let rafId: number;
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
      const size = isHovering.current ? 35 : 20;
      ring.style.transform = `translate3d(${ringPos.current.x - size}px, ${ringPos.current.y - size}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Hide native cursor
    document.body.style.cursor = "none";
    document.querySelectorAll("*").forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll(INTERACTIVE_SELECTORS).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00F5FF",
          boxShadow: "0 0 12px rgba(0, 245, 255, 0.7)",
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 245, 255, 0.5)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s",
        }}
      />
    </>
  );
}

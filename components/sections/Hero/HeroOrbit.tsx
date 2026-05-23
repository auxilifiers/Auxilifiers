"use client";

export default function HeroOrbit() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        right: "-5vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(280px, 35vw, 500px)",
        height: "clamp(280px, 35vw, 500px)",
        opacity: 0.5,
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 500 500" fill="none">
        {/* Outer pulsing ring */}
        <circle cx="250" cy="250" r="240" stroke="rgba(0,245,255,0.06)" strokeWidth="0.5">
          <animate attributeName="r" values="238;242;238" dur="6s" repeatCount="indefinite" />
        </circle>

        {/* Main orbit ring */}
        <circle cx="250" cy="250" r="180" stroke="rgba(0,245,255,0.1)" strokeWidth="1" />

        {/* Dashed middle ring — rotating */}
        <circle cx="250" cy="250" r="130" stroke="rgba(0,102,255,0.12)" strokeWidth="0.8" strokeDasharray="4 16">
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="60s" repeatCount="indefinite" />
        </circle>

        {/* Inner ring */}
        <circle cx="250" cy="250" r="70" stroke="rgba(0,245,255,0.08)" strokeWidth="0.5" />

        {/* Satellite 1 — large, slow, outer */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="15s" repeatCount="indefinite" />
          <circle cx="430" cy="250" r="6" fill="rgba(0,245,255,0.6)">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="430" cy="250" r="12" fill="none" stroke="rgba(0,245,255,0.15)" strokeWidth="0.5" />
        </g>

        {/* Satellite 2 — medium, counter-clockwise */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="360 250 250" to="0 250 250" dur="22s" repeatCount="indefinite" />
          <circle cx="380" cy="250" r="4" fill="rgba(0,102,255,0.7)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Satellite 3 — small, fast, inner */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="9s" repeatCount="indefinite" />
          <circle cx="320" cy="250" r="3" fill="rgba(125,211,252,0.6)">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Center core — breathing */}
        <circle cx="250" cy="250" r="3" fill="rgba(0,245,255,0.4)">
          <animate attributeName="r" values="2;5;2" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* Arc segments — decorative */}
        <path d="M 250 70 A 180 180 0 0 1 430 250" fill="none" stroke="rgba(0,245,255,0.04)" strokeWidth="1">
          <animate attributeName="opacity" values="0;0.08;0" dur="8s" repeatCount="indefinite" />
        </path>
        <path d="M 70 250 A 180 180 0 0 1 250 430" fill="none" stroke="rgba(0,102,255,0.04)" strokeWidth="1">
          <animate attributeName="opacity" values="0;0.06;0" dur="10s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}

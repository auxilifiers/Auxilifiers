"use client";

export default function HeroOrbit() {
  return (
    <div
      className="absolute pointer-events-none hidden min-[900px]:block"
      style={{ right: "4vw", top: "50%", transform: "translateY(-50%)", width: 340, height: 340 }}
      aria-hidden="true"
    >
      <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
        {/* Outer ring */}
        <circle cx="170" cy="170" r="160" stroke="rgba(0,245,255,0.08)" strokeWidth="1" />
        {/* Middle ring */}
        <circle cx="170" cy="170" r="110" stroke="rgba(0,245,255,0.12)" strokeWidth="1" strokeDasharray="8 12" >
          <animateTransform attributeName="transform" type="rotate" from="0 170 170" to="360 170 170" dur="40s" repeatCount="indefinite" />
        </circle>
        {/* Inner ring */}
        <circle cx="170" cy="170" r="60" stroke="rgba(0,102,255,0.15)" strokeWidth="1" />

        {/* Orbiting satellite 1 — outer ring */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 170 170" to="360 170 170" dur="12s" repeatCount="indefinite" />
          <circle cx="330" cy="170" r="5" fill="#00F5FF" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="330" cy="170" r="10" fill="none" stroke="rgba(0,245,255,0.3)" strokeWidth="0.5" />
        </g>

        {/* Orbiting satellite 2 — middle ring, opposite direction */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="360 170 170" to="0 170 170" dur="18s" repeatCount="indefinite" />
          <circle cx="280" cy="170" r="4" fill="#0066FF" opacity="0.7">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Orbiting satellite 3 — inner ring */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 170 170" to="360 170 170" dur="8s" repeatCount="indefinite" />
          <circle cx="230" cy="170" r="3" fill="#7DD3FC" opacity="0.6">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Center glow */}
        <circle cx="170" cy="170" r="4" fill="#00F5FF" opacity="0.3">
          <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Connecting lines — subtle */}
        <line x1="170" y1="10" x2="170" y2="60" stroke="rgba(0,245,255,0.06)" strokeWidth="1">
          <animate attributeName="opacity" values="0;0.15;0" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="10" y1="170" x2="110" y2="170" stroke="rgba(0,245,255,0.06)" strokeWidth="1">
          <animate attributeName="opacity" values="0;0.12;0" dur="8s" repeatCount="indefinite" />
        </line>
        <line x1="230" y1="170" x2="330" y2="170" stroke="rgba(0,102,255,0.06)" strokeWidth="1">
          <animate attributeName="opacity" values="0;0.1;0" dur="7s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
}

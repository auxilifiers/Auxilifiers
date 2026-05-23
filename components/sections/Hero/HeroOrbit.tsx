"use client";

export default function HeroOrbit() {
  return (
    <div
      className="absolute pointer-events-none hidden min-[768px]:block"
      style={{
        right: "3vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(250px, 30vw, 420px)",
        height: "clamp(250px, 30vw, 420px)",
        opacity: 0.45,
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 420 420" fill="none">
        {/* Outer circle */}
        <circle cx="210" cy="210" r="200" stroke="rgba(0,245,255,0.08)" strokeWidth="1" />

        {/* Triangle frame — like the logo */}
        <path
          d="M210 40 L380 340 L40 340 Z"
          fill="none"
          stroke="rgba(0,245,255,0.12)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Inner triangle */}
        <path
          d="M210 120 L320 300 L100 300 Z"
          fill="none"
          stroke="rgba(0,102,255,0.1)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Circuit paths — connecting nodes like the logo */}
        {/* Top to right */}
        <path d="M210 40 Q310 120 330 200" fill="none" stroke="rgba(0,245,255,0.15)" strokeWidth="1" strokeDasharray="4 8">
          <animate attributeName="stroke-dashoffset" from="48" to="0" dur="4s" repeatCount="indefinite" />
        </path>
        {/* Top to left */}
        <path d="M210 40 Q110 120 90 200" fill="none" stroke="rgba(0,245,255,0.15)" strokeWidth="1" strokeDasharray="4 8">
          <animate attributeName="stroke-dashoffset" from="48" to="0" dur="5s" repeatCount="indefinite" />
        </path>
        {/* Bottom arc */}
        <path d="M90 300 Q210 380 330 300" fill="none" stroke="rgba(0,102,255,0.12)" strokeWidth="1" strokeDasharray="4 8">
          <animate attributeName="stroke-dashoffset" from="48" to="0" dur="6s" repeatCount="indefinite" />
        </path>

        {/* Main nodes — triangle vertices */}
        {/* Top node */}
        <circle cx="210" cy="40" r="6" fill="rgba(0,245,255,0.5)">
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="40" r="12" fill="none" stroke="rgba(0,245,255,0.2)" strokeWidth="0.5" />

        {/* Bottom-left node */}
        <circle cx="40" cy="340" r="5" fill="rgba(0,102,255,0.5)">
          <animate attributeName="r" values="4;7;4" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="340" r="10" fill="none" stroke="rgba(0,102,255,0.2)" strokeWidth="0.5" />

        {/* Bottom-right node */}
        <circle cx="380" cy="340" r="5" fill="rgba(0,245,255,0.5)">
          <animate attributeName="r" values="4;7;4" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="380" cy="340" r="10" fill="none" stroke="rgba(0,245,255,0.2)" strokeWidth="0.5" />

        {/* Mid nodes — circuit junctions */}
        <circle cx="160" cy="180" r="3" fill="rgba(0,245,255,0.4)">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="260" cy="180" r="3" fill="rgba(0,102,255,0.4)">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="260" r="3" fill="rgba(125,211,252,0.4)">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Inner circuit lines */}
        <line x1="160" y1="180" x2="260" y2="180" stroke="rgba(0,245,255,0.1)" strokeWidth="0.5" />
        <line x1="160" y1="180" x2="210" y2="260" stroke="rgba(0,245,255,0.1)" strokeWidth="0.5" />
        <line x1="260" y1="180" x2="210" y2="260" stroke="rgba(0,102,255,0.1)" strokeWidth="0.5" />

        {/* Orbiting satellite on outer circle */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 210 210" to="360 210 210" dur="20s" repeatCount="indefinite" />
          <circle cx="410" cy="210" r="4" fill="rgba(0,245,255,0.6)">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Orbiting satellite — counter direction */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="360 210 210" to="0 210 210" dur="28s" repeatCount="indefinite" />
          <circle cx="10" cy="210" r="3" fill="rgba(0,102,255,0.5)">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Center glow */}
        <circle cx="210" cy="210" r="3" fill="rgba(0,245,255,0.3)">
          <animate attributeName="r" values="2;5;2" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

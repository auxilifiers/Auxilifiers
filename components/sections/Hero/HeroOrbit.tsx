"use client";

export default function HeroOrbit() {
  return (
    <div
      className="absolute pointer-events-none hidden min-[768px]:block"
      style={{
        right: "6vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(250px, 28vw, 380px)",
        height: "clamp(250px, 28vw, 380px)",
        opacity: 0.55,
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
        {/* Outer circle */}
        <circle cx="200" cy="200" r="190" stroke="url(#grad1)" strokeWidth="3" opacity="0.5" />

        {/* 3 curved circuit arms — triskelion shape like the logo */}
        {/* Arm 1 — top-left (cyan) */}
        <path
          d="M200 30 C140 30, 60 80, 60 160 C60 200, 90 230, 130 220 C150 215, 165 195, 160 175 C155 155, 135 145, 120 155"
          stroke="url(#grad1)" strokeWidth="3.5" strokeLinecap="round" opacity="0.7"
          strokeDasharray="400" strokeDashoffset="400"
        >
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="3s" fill="freeze" />
        </path>

        {/* Arm 2 — right (blue) */}
        <path
          d="M340 160 C340 100, 310 40, 240 30 C210 26, 185 50, 195 75 C200 90, 220 100, 240 95 C260 90, 265 70, 250 60"
          stroke="url(#grad2)" strokeWidth="3.5" strokeLinecap="round" opacity="0.7"
          strokeDasharray="400" strokeDashoffset="400"
        >
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="3s" begin="0.3s" fill="freeze" />
        </path>

        {/* Arm 3 — bottom (cyan-blue) */}
        <path
          d="M130 340 C200 370, 290 340, 330 280 C345 255, 325 230, 300 235 C280 238, 270 260, 280 275 C290 290, 310 285, 310 270"
          stroke="url(#grad1)" strokeWidth="3.5" strokeLinecap="round" opacity="0.7"
          strokeDasharray="400" strokeDashoffset="400"
        >
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="3s" begin="0.6s" fill="freeze" />
        </path>

        {/* Center connecting curves */}
        <path
          d="M160 175 C170 200, 190 210, 200 200 C210 190, 220 170, 240 175"
          stroke="rgba(0,245,255,0.3)" strokeWidth="2" strokeLinecap="round"
        />
        <path
          d="M240 95 C230 120, 220 150, 200 200"
          stroke="rgba(0,102,255,0.3)" strokeWidth="2" strokeLinecap="round"
        />
        <path
          d="M280 275 C260 250, 230 220, 200 200"
          stroke="rgba(0,245,255,0.25)" strokeWidth="2" strokeLinecap="round"
        />

        {/* Circuit nodes — large dots at arm ends */}
        <circle cx="120" cy="155" r="8" fill="url(#grad1)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="60" r="8" fill="url(#grad2)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="310" cy="270" r="8" fill="url(#grad1)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Mid-arm nodes */}
        <circle cx="160" cy="175" r="6" fill="#00F5FF" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="95" r="6" fill="#0066FF" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="275" r="6" fill="#00F5FF" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Small junction nodes along arms */}
        <circle cx="130" cy="220" r="4" fill="#7DD3FC" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="195" cy="75" r="4" fill="#00F5FF" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="235" r="4" fill="#0066FF" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Outer ring nodes */}
        <circle cx="200" cy="30" r="10" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="30" r="5" fill="#00F5FF" opacity="0.6" />

        <circle cx="60" cy="160" r="5" fill="#00F5FF" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="340" cy="160" r="5" fill="#0066FF" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="130" cy="340" r="5" fill="#00F5FF" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Center core */}
        <circle cx="200" cy="200" r="6" fill="url(#grad1)" opacity="0.5">
          <animate attributeName="r" values="4;8;4" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Slow rotation on entire structure */}
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="60s" repeatCount="indefinite" />

        {/* Gradients */}
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

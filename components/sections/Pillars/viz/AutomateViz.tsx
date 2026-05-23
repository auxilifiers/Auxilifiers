"use client";

export default function AutomateViz() {
  const nodes = [
    { x: 30, y: 50, label: "INPUT" },
    { x: 100, y: 30, label: "CLASSIFY" },
    { x: 170, y: 50, label: "ENRICH" },
    { x: 240, y: 20, label: "DISPATCH" },
    { x: 240, y: 55, label: "" },
    { x: 240, y: 85, label: "" },
  ];

  return (
    <div className="relative w-full flex justify-center">
      <svg width="280" height="110" viewBox="0 0 280 110">
        {/* Curved paths */}
        <path
          d="M30,50 Q65,20 100,30"
          fill="none"
          stroke="rgba(0,245,255,0.3)"
          strokeWidth={1}
          strokeDasharray="6 18"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" repeatCount="indefinite" />
        </path>
        <path
          d="M100,30 Q135,40 170,50"
          fill="none"
          stroke="rgba(0,245,255,0.3)"
          strokeWidth={1}
          strokeDasharray="6 18"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </path>
        <path
          d="M170,50 Q205,15 240,20"
          fill="none"
          stroke="rgba(0,245,255,0.3)"
          strokeWidth={1}
          strokeDasharray="6 18"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </path>
        <path
          d="M170,50 Q205,52 240,55"
          fill="none"
          stroke="rgba(0,102,255,0.3)"
          strokeWidth={1}
          strokeDasharray="6 18"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" begin="0.8s" repeatCount="indefinite" />
        </path>
        <path
          d="M170,50 Q205,75 240,85"
          fill="none"
          stroke="rgba(0,102,255,0.3)"
          strokeWidth={1}
          strokeDasharray="6 18"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
        </path>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={4} fill="#00F5FF" opacity={0.6}>
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            {n.label && (
              <text
                x={n.x}
                y={n.y + 16}
                fill="rgba(255,255,255,0.4)"
                fontSize={6}
                fontFamily="var(--font-mono)"
                textAnchor="middle"
                letterSpacing="0.1em"
              >
                {n.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

"use client";

export default function GrowViz() {
  const bars = [20, 35, 30, 50, 45, 70];
  const barWidth = 24;
  const gap = 12;
  const svgW = bars.length * (barWidth + gap) - gap + 20;
  const svgH = 100;

  return (
    <div className="relative w-full flex justify-center">
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
        {/* Bars */}
        {bars.map((h, i) => (
          <rect
            key={i}
            x={10 + i * (barWidth + gap)}
            y={svgH - h}
            width={barWidth}
            height={h}
            rx={3}
            fill="rgba(0,245,255,0.15)"
            stroke="rgba(0,245,255,0.3)"
            strokeWidth={0.5}
          >
            <animate
              attributeName="height"
              from="0"
              to={h}
              dur="1.2s"
              begin={`${i * 0.15}s`}
              fill="freeze"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              from={svgH}
              to={svgH - h}
              dur="1.2s"
              begin={`${i * 0.15}s`}
              fill="freeze"
              repeatCount="indefinite"
            />
          </rect>
        ))}

        {/* Growth curve */}
        <path
          d={`M${10 + barWidth / 2},${svgH - bars[0]} Q${10 + 2 * (barWidth + gap)},${svgH - 55} ${10 + 5 * (barWidth + gap) + barWidth / 2},${svgH - bars[5]}`}
          fill="none"
          stroke="rgba(0,245,255,0.5)"
          strokeWidth={1.5}
          strokeDasharray="400"
          strokeDashoffset="400"
        >
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </path>

        {/* Milestone markers */}
        {[1, 3, 5].map((bi, i) => (
          <circle
            key={i}
            cx={10 + bi * (barWidth + gap) + barWidth / 2}
            cy={svgH - bars[bi] - 5}
            r={3}
            fill="#00F5FF"
            opacity={0.6}
          >
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <span
        className="absolute bottom-1 left-1/2 -translate-x-1/2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 8,
          letterSpacing: "0.15em",
          color: "var(--color-text-dim)",
          opacity: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        // COMPOUND GROWTH · Q1-Q4
      </span>
    </div>
  );
}

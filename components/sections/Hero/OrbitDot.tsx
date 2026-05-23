"use client";

export default function OrbitDot({ size = 12 }: { size?: number }) {
  const satelliteR = size / 2 + 1;
  return (
    <span
      className="relative inline-block"
      style={{
        width: size + 4,
        height: size + 4,
        verticalAlign: "top",
        marginTop: "-0.08em",
      }}
    >
      <svg
        width={size + 4}
        height={size + 4}
        viewBox={`0 0 ${size + 4} ${size + 4}`}
        className="absolute top-0 left-0"
        style={{ filter: "drop-shadow(0 0 4px rgba(0,245,255,0.6))" }}
      >
        <circle
          cx={(size + 4) / 2}
          cy={(size + 4) / 2}
          r={size / 2}
          fill="none"
          stroke="#00F5FF"
          strokeWidth={1.2}
        />
        <g
          style={{
            transformOrigin: `${(size + 4) / 2}px ${(size + 4) / 2}px`,
            animation: "orbit-rotate 5s linear infinite",
          }}
        >
          <circle
            cx={(size + 4) / 2 + satelliteR}
            cy={(size + 4) / 2}
            r={2}
            fill="#00F5FF"
          />
        </g>
      </svg>
    </span>
  );
}

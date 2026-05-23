"use client";

export default function BuildViz() {
  const nodes = [
    [0, 0], [1, 0], [2, 0],
    [0, 1], [1, 1], [2, 1],
    [0, 2], [1, 2], [2, 2],
  ];
  const lines = [
    [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
    [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8],
  ];
  const spacing = 36;
  const pad = 20;

  return (
    <div className="relative w-full flex justify-center">
      <svg width={spacing * 2 + pad * 2} height={spacing * 2 + pad * 2} viewBox={`0 0 ${spacing * 2 + pad * 2} ${spacing * 2 + pad * 2}`}>
        {lines.map((l, i) => {
          const [a, b] = l;
          return (
            <line
              key={i}
              x1={nodes[a][0] * spacing + pad}
              y1={nodes[a][1] * spacing + pad}
              x2={nodes[b][0] * spacing + pad}
              y2={nodes[b][1] * spacing + pad}
              stroke="rgba(0,245,255,0.25)"
              strokeWidth={1}
              strokeDasharray="40"
              strokeDashoffset="40"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="40"
                to="0"
                dur="4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n[0] * spacing + pad}
            cy={n[1] * spacing + pad}
            r={3}
            fill="#00F5FF"
            opacity={0.7}
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
            />
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
        // WIREFRAME ASSEMBLY
      </span>
    </div>
  );
}

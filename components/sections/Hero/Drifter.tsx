"use client";

export default function Drifter() {
  return (
    <div
      className="absolute pointer-events-none hidden min-[600px]:block"
      style={{
        left: -80,
        top: "18%",
        width: 60,
        height: 60,
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        style={{
          animation: "drifter-spin 12s linear infinite",
          filter: "drop-shadow(0 0 6px rgba(0,245,255,0.4))",
        }}
      >
        <circle
          cx={30}
          cy={30}
          r={22}
          fill="none"
          stroke="rgba(0,245,255,0.3)"
          strokeWidth={1}
        />
        <circle cx={52} cy={30} r={3} fill="#00F5FF" opacity={0.8} />
        <circle cx={8} cy={30} r={2.5} fill="#0066FF" opacity={0.6} />
      </svg>
    </div>
  );
}

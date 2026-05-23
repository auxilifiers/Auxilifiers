export default function Aurora() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full opacity-[0.32]"
        style={{
          width: 620,
          height: 620,
          background: "#00F5FF",
          top: -120,
          left: -140,
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animation: "aurora-drift-1 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.32]"
        style={{
          width: 720,
          height: 720,
          background: "#0066FF",
          bottom: -220,
          right: -180,
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animation: "aurora-drift-2 38s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.32]"
        style={{
          width: 480,
          height: 480,
          background: "#7DD3FC",
          top: "30%",
          right: "18%",
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animation: "aurora-drift-3 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.32]"
        style={{
          width: 400,
          height: 400,
          background: "#0066FF",
          bottom: "5%",
          left: "18%",
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animation: "aurora-drift-4 42s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export default function Aurora() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full opacity-[0.18] min-[768px]:opacity-[0.28]"
        style={{
          width: "clamp(300px, 50vw, 620px)",
          height: "clamp(300px, 50vw, 620px)",
          background: "#00F5FF",
          top: -120,
          left: -140,
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animation: "aurora-drift-1 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.18] min-[768px]:opacity-[0.28]"
        style={{
          width: "clamp(350px, 55vw, 720px)",
          height: "clamp(350px, 55vw, 720px)",
          background: "#0066FF",
          bottom: -220,
          right: -180,
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animation: "aurora-drift-2 38s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.15] min-[768px]:opacity-[0.25]"
        style={{
          width: "clamp(250px, 40vw, 480px)",
          height: "clamp(250px, 40vw, 480px)",
          background: "#7DD3FC",
          top: "30%",
          right: "18%",
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animation: "aurora-drift-3 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.15] min-[768px]:opacity-[0.25]"
        style={{
          width: "clamp(200px, 35vw, 400px)",
          height: "clamp(200px, 35vw, 400px)",
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

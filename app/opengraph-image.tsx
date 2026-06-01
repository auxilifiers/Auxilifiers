import { ImageResponse } from "next/og";

// Branded 1200x630 social-share card, generated at build/request time.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Auxilifiers — Orbiting around your success.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 600px at 80% -10%, rgba(0,180,216,0.25), transparent), linear-gradient(135deg, #060a14 0%, #0a0f1a 60%, #0d1b2e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "30px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#00B4D8",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0066FF, #00B4D8)",
              display: "flex",
            }}
          />
          Auxilifiers
        </div>

        <div
          style={{
            marginTop: "40px",
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            maxWidth: "900px",
          }}
        >
          Build the tech. Automate the ops. Grow the reach.
        </div>

        <div
          style={{
            marginTop: "32px",
            fontSize: "34px",
            color: "#9fb3c8",
            maxWidth: "850px",
          }}
        >
          Tech &amp; growth agency for ambitious small and mid-size businesses.
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: "28px",
            fontStyle: "italic",
            color: "#00B4D8",
          }}
        >
          Orbiting around your success.
        </div>
      </div>
    ),
    { ...size }
  );
}

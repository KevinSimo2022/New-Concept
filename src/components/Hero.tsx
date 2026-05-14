"use client";

import { useWaveformStore } from "@/store/useWaveformStore";

export function Hero() {
  const triggerPing = useWaveformStore((s) => s.triggerPing);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      {/* Headline */}
      <h1
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 500,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        A sound so precise,
        <br />
        silence finally makes sense.
      </h1>

      {/* Sub-headline */}
      <p
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "16px",
          color: "#A0A0A8",
          marginTop: "16px",
          marginBottom: 0,
        }}
      >
        Three years. Two studies. One ping.
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "32px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={triggerPing}
          style={{
            background: "#00E5CC",
            color: "#001a17",
            border: "none",
            borderRadius: "9999px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Play the ping
        </button>

        <button
          style={{
            background: "transparent",
            color: "#A0A0A8",
            border: "1px solid #2A2A2D",
            borderRadius: "9999px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4A4A52";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#2A2A2D";
            e.currentTarget.style.color = "#A0A0A8";
          }}
        >
          Join waitlist
        </button>
      </div>

      {/* Stat strip */}
      <p
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "13px",
          color: "#4A4A52",
          marginTop: "24px",
          marginBottom: 0,
          letterSpacing: "0.01em",
        }}
      >
        3,847 teams · 12.4M pings · 0.3ms latency · 0 CVEs
      </p>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Syntax-highlighted code lines ─────────────────────────────────────── */
function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const raw = `GET /v1/ping\nAuthorization: Bearer sk-pngd-...\n\nResponse:\n{\n  "ping": true,\n  "latency_ms": 0.31,\n  "timbre": "classic",\n  "frequency_hz": 880\n}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(raw).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#111113",
        border: "1px solid #2A2A2D",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: "1px solid #2A2A2D",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 7,
            border: "1px solid #2A2A2D",
            background: copied ? "rgba(0,229,204,0.1)" : "transparent",
            color: copied ? "#00E5CC" : "#4A4A52",
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "var(--font-geist-mono)",
            transition: "all 0.2s",
          }}
        >
          {copied ? <Check style={{ width: 11, height: 11 }} /> : <Copy style={{ width: 11, height: 11 }} />}
          {copied ? "Copied" : "Copy"}
        </motion.button>
      </div>

      {/* Code content */}
      <div style={{ padding: "24px 24px 28px", fontFamily: "var(--font-geist-mono)", fontSize: 13, lineHeight: 1.75 }}>
        {/* Request line */}
        <div>
          <span style={{ color: "#00E5CC", fontWeight: 600 }}>GET</span>
          <span style={{ color: "#FFFFFF" }}> /v1/ping</span>
        </div>

        {/* Header */}
        <div style={{ marginTop: 2 }}>
          <span style={{ color: "#71717A" }}>Authorization: </span>
          <span style={{ color: "#A0A0A8" }}>Bearer </span>
          <span style={{ color: "#7dd3fc" }}>sk-pngd-...</span>
        </div>

        {/* Spacer */}
        <div style={{ height: 16 }} />

        {/* Response label */}
        <div>
          <span style={{ color: "#4A4A52", fontStyle: "italic" }}>{"// Response:"}</span>
        </div>

        {/* JSON */}
        <div style={{ marginTop: 4 }}>
          <span style={{ color: "#71717A" }}>{"{"}</span>
        </div>
        {[
          { key: "ping",          value: "true",       valueColor: "#00E5CC",  type: "bool"   },
          { key: "latency_ms",    value: "0.31",       valueColor: "#f0a040",  type: "num"    },
          { key: "timbre",        value: '"classic"',  valueColor: "#7dd3fc",  type: "string" },
          { key: "frequency_hz",  value: "880",        valueColor: "#f0a040",  type: "num"    },
        ].map(({ key, value, valueColor }, i, arr) => (
          <div key={key} style={{ paddingLeft: 22 }}>
            <span style={{ color: "#A0A0A8" }}>"{key}"</span>
            <span style={{ color: "#71717A" }}>: </span>
            <span style={{ color: valueColor }}>{value}</span>
            {i < arr.length - 1 && <span style={{ color: "#71717A" }}>,</span>}
          </div>
        ))}
        <div>
          <span style={{ color: "#71717A" }}>{"}"}</span>
        </div>
      </div>

      {/* Subtle glow at bottom of code block */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,229,204,0.2), transparent)",
        }}
      />
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export function APISection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="api"
      style={{
        padding: "160px 40px",
        background: "transparent",
        position: "relative",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#00E5CC",
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: "var(--font-geist-sans)", marginBottom: 20,
          }}>
            API Reference
          </p>

          <h2 style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "0 0 24px",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            fontFamily: "var(--font-geist-sans)",
          }}>
            The entire<br />
            <span style={{
              background: "linear-gradient(135deg,#ffffff 0%,rgba(0,229,204,0.85) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              API.
            </span>
          </h2>

          <p style={{
            fontSize: 15,
            color: "#A0A0A8",
            lineHeight: 1.75,
            maxWidth: 380,
            fontFamily: "var(--font-geist-sans)",
          }}>
            <code style={{ color: "#00E5CC", fontFamily: "var(--font-geist-mono)", fontSize: 13 }}>
              GET /v1/ping
            </code>
            <br /><br />
            That is the endpoint. We spent four months on the documentation.
          </p>

          {/* Tiny badge row */}
          <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap" }}>
            {["REST", "JSON", "0ms cold start", "SDK coming soon*"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  color: "#4A4A52",
                  border: "1px solid #2A2A2D",
                  borderRadius: 9999,
                  padding: "4px 12px",
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "0.03em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p style={{
            fontSize: 10,
            color: "#27272A",
            marginTop: 14,
            fontFamily: "var(--font-geist-sans)",
            letterSpacing: "0.04em",
          }}>
            * SDK is Adobe Audition
          </p>
        </motion.div>

        {/* Right — code block */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
        >
          <CodeBlock />
        </motion.div>
      </div>
    </section>
  );
}

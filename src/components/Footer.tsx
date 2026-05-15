"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Research", href: "#research" },
  { label: "GitHub", href: "#" },
  { label: "Product Hunt", href: "#" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "rgba(10,10,11,0.55)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 32,
          alignItems: "start",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontSize: "18px",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              marginBottom: 4,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            PNGD™
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "#4A4A52",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Built by Kevin
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p
            style={{
              fontStyle: "italic",
              fontSize: "13px",
              lineHeight: 1.7,
              textAlign: "center",
              maxWidth: 340,
              color: "#71717A",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            &ldquo;We got you to read the fine print on a ping sound.
            Imagine what we can do for your brand.&rdquo;
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: "#FFFFFF", x: -2 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: "13px",
                color: "#4A4A52",
                textDecoration: "none",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#27272A",
            fontFamily: "var(--font-geist-sans)",
            letterSpacing: "0.04em",
          }}
        >
          * Adobe Audition
        </span>
      </div>
    </footer>
  );
}

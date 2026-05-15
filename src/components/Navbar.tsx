"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Research", href: "#research" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Enterprise", href: "#enterprise" },
  { label: "API",     href: "#api"       },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        /* Fully transparent at top; barely-there glass after scroll */
        background: scrolled ? "rgba(10,10,11,0.35)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
        }}
      >
        {/* Logo */}
        <motion.a
          href="/"
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.15 }}
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: "#FFFFFF",
            textDecoration: "none",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          PNGD™
        </motion.a>

        {/* Centre links */}
        <div
          className="hidden md:flex"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 36,
          }}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: "#FFFFFF" }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "0.01em",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#get-started"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 9999,
            padding: "7px 18px",
            fontSize: 12,
            fontWeight: 500,
            textDecoration: "none",
            fontFamily: "var(--font-geist-sans)",
            letterSpacing: "0.02em",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,229,204,0.4)";
            (e.currentTarget as HTMLAnchorElement).style.color = "#00E5CC";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
          }}
        >
          Get started
        </motion.a>
      </div>
    </motion.nav>
  );
}

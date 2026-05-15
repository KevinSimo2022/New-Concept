"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { BorderBeam } from "./effects/BorderBeam";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const tiers = [
  {
    name: "Starter",
    price: "$9",
    period: "/mo",
    description: "For individuals who need one good ping.",
    features: ["5 pings / month", "Basic waveform analytics", "48-hour support", "1 GB storage", "API* access"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For teams who take their ping seriously.",
    features: ["Unlimited pings", "Advanced waveform analytics", "Priority support", "25 GB storage", "API* access", "Custom timbre controls", "Team collaboration"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    description: "For mission-critical pings.",
    features: ["Everything in Pro", "Dedicated account manager", "Unlimited storage", "Custom SLA", "99.99% uptime", "On-premise"],
    featured: false,
  },
];

/* ── Side card — minimal, recessed ──────────────────────────────────────── */
function SideCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 10}deg)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }, []);

  const handleLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          borderRadius: 20,
          padding: "32px 28px",
          background: "rgba(12,12,14,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
          transition: "transform 0.15s ease",
          position: "relative",
          overflow: "hidden",
        } as React.CSSProperties}
      >
        {/* Mouse inner glow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
          background: "radial-gradient(180px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.025), transparent)",
        }} />

        <p style={{ fontSize: 12, color: "#4A4A52", fontFamily: "var(--font-geist-sans)", marginBottom: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {tier.name}
        </p>

        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.03em" }}>
            {tier.price}
          </span>
          <span style={{ fontSize: 13, color: "#4A4A52", fontFamily: "var(--font-geist-sans)", marginLeft: 4 }}>{tier.period}</span>
        </div>

        <p style={{ fontSize: 13, color: "#71717A", marginBottom: 24, lineHeight: 1.5, fontFamily: "var(--font-geist-sans)" }}>
          {tier.description}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          {tier.features.map((f) => (
            <li key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Check style={{ width: 12, height: 12, color: "#4A4A52", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#71717A", fontFamily: "var(--font-geist-sans)" }}>{f}</span>
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.12)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            width: "100%", padding: "11px 0", borderRadius: 10,
            fontWeight: 600, fontSize: 13, cursor: "pointer",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "transparent", color: "#71717A",
            fontFamily: "var(--font-geist-sans)", letterSpacing: "0.02em",
          }}
        >
          Get started
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── Featured card — the centerpiece, dramatically larger ──────────────── */
function FeaturedCard({ tier }: { tier: typeof tiers[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) scale3d(1.01,1.01,1.01)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }, []);

  const handleLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: EASE }}
      style={{ position: "relative", zIndex: 2 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          position: "relative",
          borderRadius: 28,
          padding: "56px 44px",
          /* Cuts slightly into adjacent side cards using negative margin */
          margin: "-24px -8px",
          background: "rgba(10,10,11,0.95)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(0,229,204,0.22)",
          boxShadow:
            "0 0 0 1px rgba(0,229,204,0.08), 0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(0,229,204,0.08)",
          transition: "transform 0.18s ease",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        } as React.CSSProperties}
      >
        {/* Traveling border beam */}
        <BorderBeam duration={5} size={120} color="#00E5CC" />

        {/* Inner mouse glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
          background: "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(0,229,204,0.05), transparent)",
        }} />

        {/* Top flush gradient stripe */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #00E5CC, transparent)",
          borderRadius: "28px 28px 0 0",
        }} />

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, color: "#00E5CC",
            letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: "var(--font-geist-sans)", margin: 0,
          }}>
            Pro
          </p>
          <span style={{
            background: "rgba(0,229,204,0.1)", color: "#00E5CC",
            fontSize: 11, fontWeight: 700, padding: "4px 12px",
            borderRadius: 9999, letterSpacing: "0.06em",
            fontFamily: "var(--font-geist-sans)",
            border: "1px solid rgba(0,229,204,0.2)",
          }}>
            Most Popular
          </span>
        </div>

        {/* Huge price */}
        <div style={{ marginBottom: 10 }}>
          <span style={{
            fontSize: "clamp(60px, 8vw, 96px)",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            fontFamily: "var(--font-geist-sans)",
            background: "linear-gradient(135deg, #00E5CC 0%, #7fffef 60%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(0,229,204,0.4))",
          }}>
            $29
          </span>
          <span style={{ fontSize: 15, color: "#4A4A52", fontFamily: "var(--font-geist-sans)", marginLeft: 6 }}>/mo</span>
        </div>

        <p style={{ fontSize: 14, color: "#71717A", marginBottom: 36, fontFamily: "var(--font-geist-sans)", lineHeight: 1.55 }}>
          {tier.description}
        </p>

        {/* Glowing divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,229,204,0.25) 50%, transparent)",
          marginBottom: 32,
        }} />

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 14 }}>
          {tier.features.map((f) => (
            <li key={f} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{
                flexShrink: 0, width: 20, height: 20, borderRadius: "50%",
                background: "rgba(0,229,204,0.12)", border: "1px solid rgba(0,229,204,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Check style={{ width: 10, height: 10, color: "#00E5CC" }} />
              </div>
              <span style={{ fontSize: 14, color: "#A0A0A8", fontFamily: "var(--font-geist-sans)" }}>{f}</span>
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            width: "100%", padding: "16px 0", borderRadius: 14,
            fontWeight: 700, fontSize: 15, cursor: "pointer", border: "none",
            background: "linear-gradient(135deg, #00E5CC 0%, #00c4ae 100%)",
            color: "#001a17", fontFamily: "var(--font-geist-sans)",
            letterSpacing: "0.02em",
            boxShadow: "0 0 40px rgba(0,229,204,0.35), 0 4px 20px rgba(0,229,204,0.2)",
          }}
        >
          Get started — free for 14 days
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export function PricingCards() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      style={{ padding: "160px 40px", background: "transparent", position: "relative", overflow: "hidden" }}
    >
      {/* Background radial */}
      <div style={{
        position: "absolute", width: 1000, height: 500, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,229,204,0.035) 0%, transparent 70%)",
        filter: "blur(80px)", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        {/* Heading — asymmetric again */}
        <div ref={headingRef} style={{ marginBottom: 80 }}>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 600, color: "#00E5CC", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-geist-sans)", marginBottom: 14 }}
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
            style={{
              fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, margin: 0,
              letterSpacing: "-0.035em", lineHeight: 1.0,
              fontFamily: "var(--font-geist-sans)", color: "#FFFFFF",
            }}
          >
            One ping,<br />
            <span style={{ color: "#4A4A52", fontWeight: 400, fontStyle: "italic", fontSize: "0.7em" }}>
              priced for everyone.
            </span>
          </motion.h2>
        </div>

        {/* 3-column layout — featured card overlaps its neighbors */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr 1fr",
          gap: 0,
          alignItems: "center",
        }}>
          <SideCard tier={tiers[0]} index={0} />
          <FeaturedCard tier={tiers[1]} />
          <SideCard tier={tiers[2]} index={2} />
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: "center", color: "#27272A", fontSize: 11, marginTop: 60, letterSpacing: "0.05em", fontFamily: "var(--font-geist-sans)" }}
        >
          * Adobe Audition
        </motion.p>
      </div>
    </section>
  );
}

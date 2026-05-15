"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── Data ────────────────────────────────────────────────────────────────── */
const quotes = [
  {
    text: 'The "AI*" handles our 3am critical-path pings with a consistency we hadn\'t achieved in-house.',
    aiStar: true,
    name: "Emily Rodriguez",
    title: "CEO · Notion",
    size: "hero",
  },
  {
    text: "Our mean time to ping dropped by 60%.",
    stat: "60%",
    statLabel: "mean-time-to-ping reduction",
    name: "David Kim",
    title: "CTO · Vercel",
    size: "stat",
  },
  {
    text: "We switched from a competing ping provider. The latency improvement was imperceptible, but our team felt it.",
    name: "Sarah Chen",
    title: "Eng Lead · Stripe",
    size: "md",
  },
  {
    text: "Finally, a ping solution with genuine enterprise SLA. The 30-day refund policy gave us confidence.",
    name: "Marcus Johnson",
    title: "PM · Linear",
    size: "md",
  },
  {
    text: "The waveform analytics alone justified the contract. Everything else was a bonus.",
    name: "Rachel Park",
    title: "Ops · Slack",
    size: "md",
  },
  {
    text: "The only platform that understood our timbre requirements.",
    name: "Alex Thompson",
    title: "Design Director · Figma",
    size: "sm",
  },
];

/* ─── Spotlight card: cursor radial gradient follows mouse ────────────────── */
function SpotlightCard({
  children,
  delay = 0,
  extraStyle = {},
}: {
  children: React.ReactNode;
  delay?: number;
  extraStyle?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPos((p) => ({ ...p, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        borderRadius: 16,
        background: "rgba(14,14,16,0.72)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        overflow: "hidden",
        cursor: "default",
        ...extraStyle,
      }}
    >
      {/* Spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: pos.opacity,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(0,229,204,0.08), transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      {/* Gradient border shimmer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: pos.opacity * 0.6,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(0,229,204,0.2), transparent 55%)`,
          borderRadius: 16,
          pointerEvents: "none",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: 1,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Tilt card: 3D perspective tilt on hover ────────────────────────────── */
function TiltCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (cy - 0.5) * -12, y: (cx - 0.5) * 12 });
    setGlare({ x: cx * 100, y: cy * 100, opacity: 0.15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        cursor: "default",
      }}
      className={className}
    >
      <div
        style={{
          borderRadius: 16,
          background: "rgba(14,14,16,0.72)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          overflow: "hidden",
          position: "relative",
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01,1.01,1.01)`,
          transition: "transform 0.15s ease",
          willChange: "transform",
          height: "100%",
        }}
      >
        {/* Glare overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: glare.opacity,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Attribution ─────────────────────────────────────────────────────────── */
function Attribution({ name, title }: { name: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(0,229,204,0.3), rgba(0,229,204,0.05))",
        border: "1px solid rgba(0,229,204,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: "#00E5CC", fontWeight: 600, fontFamily: "var(--font-geist-sans)" }}>
          {name[0]}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-geist-sans)", lineHeight: 1.3 }}>
          {name}
        </div>
        <div style={{ fontSize: 11, color: "#4A4A52", fontFamily: "var(--font-geist-sans)", lineHeight: 1.3 }}>
          {title}
        </div>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export function TestimonialsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  const heroQ = quotes[0];
  const statQ = quotes[1];
  const mdQ = quotes.slice(2, 5);
  const smQ = quotes[5];

  const heroBody = heroQ.aiStar
    ? heroQ.text.replace(
        '"AI*"',
        `<span style="color:#00E5CC;font-style:normal;font-weight:700">"AI*"</span>`
      )
    : heroQ.text;

  return (
    <section
      id="research"
      style={{ padding: "140px 40px 120px", background: "transparent", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: 64 }}
        >
          <p style={{
            fontSize: 11, fontWeight: 600, color: "#00E5CC",
            letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: "var(--font-geist-sans)", margin: "0 0 14px",
          }}>
            Social Proof
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <h2 style={{
              fontSize: "clamp(44px,7vw,88px)", fontWeight: 700, color: "#FFFFFF",
              margin: 0, letterSpacing: "-0.04em", lineHeight: 0.95,
              fontFamily: "var(--font-geist-sans)",
            }}>
              People
            </h2>
            <span style={{
              fontSize: "clamp(16px,2.2vw,26px)", color: "#4A4A52",
              fontFamily: "var(--font-geist-sans)", fontWeight: 400, fontStyle: "italic",
            }}>
              have heard
            </span>
            <h2 style={{
              fontSize: "clamp(44px,7vw,88px)", fontWeight: 700, margin: 0,
              letterSpacing: "-0.04em", lineHeight: 0.95,
              fontFamily: "var(--font-geist-sans)",
              background: "linear-gradient(135deg,#ffffff 0%,rgba(0,229,204,0.8) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              the ping.
            </h2>
          </div>
        </motion.div>

        {/* ── Row 1: hero quote (2/3) + stat (1/3) ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          {/* Hero quote — spans 2 cols */}
          <SpotlightCard delay={0.05} extraStyle={{ gridColumn: "span 2" }}>
            <div style={{ padding: "44px 48px 40px" }}>
              <div style={{
                fontSize: 72, lineHeight: 0.8, color: "rgba(0,229,204,0.12)",
                fontFamily: "Georgia,serif", fontWeight: 700, marginBottom: 8,
                userSelect: "none",
              }}>&ldquo;</div>
              <p
                style={{
                  fontSize: "clamp(20px,2.4vw,28px)", fontStyle: "italic",
                  fontWeight: 400, lineHeight: 1.5,
                  color: "rgba(255,255,255,0.90)",
                  fontFamily: "var(--font-geist-sans)", margin: 0,
                }}
                dangerouslySetInnerHTML={{ __html: heroBody }}
              />
              <Attribution name={heroQ.name} title={heroQ.title} />
            </div>
          </SpotlightCard>

          {/* Stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1, duration: 0.65, ease: EASE }}
            style={{
              borderRadius: 16,
              background: "linear-gradient(145deg, rgba(0,229,204,0.07) 0%, rgba(14,14,16,0.72) 60%)",
              border: "1px solid rgba(0,229,204,0.14)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "44px 36px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Radial glow */}
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 140, height: 140, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,229,204,0.18) 0%, transparent 70%)",
              filter: "blur(20px)",
              pointerEvents: "none",
            }} />
            <div>
              <p style={{
                fontSize: "clamp(56px,7vw,80px)", fontWeight: 700,
                color: "#00E5CC", margin: "0 0 4px",
                letterSpacing: "-0.04em", lineHeight: 1,
                fontFamily: "var(--font-geist-sans)",
                filter: "drop-shadow(0 0 24px rgba(0,229,204,0.45))",
              }}>
                {statQ.stat}
              </p>
              <p style={{
                fontSize: 13, color: "#71717A", margin: 0,
                fontFamily: "var(--font-geist-sans)", lineHeight: 1.5,
              }}>
                {statQ.statLabel}
              </p>
            </div>
            <Attribution name={statQ.name} title={statQ.title} />
          </motion.div>
        </div>

        {/* ── Row 2: three equal cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
        }}>
          {/* Card 1: Spotlight */}
          <SpotlightCard delay={0.15}>
            <div style={{ padding: "32px 28px" }}>
              <p style={{
                fontSize: 14, fontStyle: "italic",
                color: "rgba(255,255,255,0.72)", lineHeight: 1.7,
                margin: "0 0 0", fontFamily: "var(--font-geist-sans)",
              }}>
                &ldquo;{mdQ[0].text}&rdquo;
              </p>
              <Attribution name={mdQ[0].name} title={mdQ[0].title} />
            </div>
          </SpotlightCard>

          {/* Card 2: Tilt */}
          <TiltCard delay={0.2}>
            <div style={{ padding: "32px 28px" }}>
              <p style={{
                fontSize: 14, fontStyle: "italic",
                color: "rgba(255,255,255,0.72)", lineHeight: 1.7,
                margin: 0, fontFamily: "var(--font-geist-sans)",
              }}>
                &ldquo;{mdQ[1].text}&rdquo;
              </p>
              <Attribution name={mdQ[1].name} title={mdQ[1].title} />
            </div>
          </TiltCard>

          {/* Card 3: Spotlight (different gradient angle) */}
          <SpotlightCard delay={0.25}>
            <div style={{ padding: "32px 28px" }}>
              {/* Five dot rating */}
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#00E5CC" style={{ filter: "drop-shadow(0 0 4px rgba(0,229,204,0.6))" }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p style={{
                fontSize: 14, fontStyle: "italic",
                color: "rgba(255,255,255,0.72)", lineHeight: 1.7,
                margin: 0, fontFamily: "var(--font-geist-sans)",
              }}>
                &ldquo;{mdQ[2].text}&rdquo;
              </p>
              <Attribution name={mdQ[2].name} title={mdQ[2].title} />
            </div>
          </SpotlightCard>
        </div>

        {/* ── Row 3: pull-quote in full width ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          style={{
            marginTop: 16,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.04)",
            padding: "36px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            background: "rgba(10,10,11,0.3)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            flexWrap: "wrap",
          }}
        >
          <p style={{
            fontSize: "clamp(15px,2vw,20px)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "var(--font-geist-sans)",
            margin: 0,
            flex: 1,
            minWidth: 240,
          }}>
            &ldquo;{smQ.text}&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 1, height: 32,
              background: "linear-gradient(to bottom, transparent, rgba(0,229,204,0.3), transparent)",
            }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-geist-sans)" }}>
                {smQ.name}
              </div>
              <div style={{ fontSize: 11, color: "#4A4A52", fontFamily: "var(--font-geist-sans)" }}>
                {smQ.title}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{
            fontSize: 10, color: "#27272A", textAlign: "center",
            marginTop: 48, letterSpacing: "0.06em",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          * Adobe Audition &nbsp;·&nbsp; Testimonials may contain traces of irony
        </motion.p>
      </div>
    </section>
  );
}

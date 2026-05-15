"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useWaveformStore } from "@/store/useWaveformStore";
import { Meteors } from "./effects/Meteors";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.75, ease: EASE },
  }),
};

export function Hero() {
  const triggerPing = useWaveformStore((s) => s.triggerPing);
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: "50%", y: "40%" });
  const [pingActive, setPingActive] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSpotlight({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handlePing = () => {
    triggerPing();
    setPingActive(true);
    setTimeout(() => setPingActive(false), 1500);
  };

  return (
    <section
      ref={sectionRef}
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
        overflow: "hidden",
      }}
    >
      {/* Meteors streaking across hero */}
      <Meteors count={20} />

      {/* Deep radial vignette — gives the model a "stage" to sit on */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(10,10,11,0.55) 60%, rgba(10,10,11,0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Cursor spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(600px circle at ${spotlight.x} ${spotlight.y}, rgba(0,229,204,0.055), transparent 45%)`,
          transition: "background 0.08s ease",
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Floating cyan orbs for depth */}
      {[
        { w: 550, h: 550, top: "-18%", right: "-6%", anim: "float-slow", delay: "0s", opacity: 0.18 },
        { w: 420, h: 420, bottom: "-12%", left: "-8%", anim: "float-medium", delay: "2s", opacity: 0.13 },
        { w: 300, h: 300, top: "38%", left: "12%", anim: "float-fast", delay: "1s", opacity: 0.08 },
      ].map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: orb.w,
            height: orb.h,
            borderRadius: "50%",
            background: i === 1
              ? "radial-gradient(circle, rgba(100,60,255,0.6) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,229,204,0.6) 0%, transparent 70%)",
            filter: "blur(70px)",
            opacity: orb.opacity,
            pointerEvents: "none",
            ...("top" in orb ? { top: orb.top } : {}),
            ...("bottom" in orb ? { bottom: (orb as {bottom: string}).bottom } : {}),
            ...("left" in orb ? { left: (orb as {left: string}).left } : {}),
            ...("right" in orb ? { right: (orb as {right: string}).right } : {}),
            animation: `${orb.anim} ${orb.anim === "float-fast" ? "7s" : orb.anim === "float-medium" ? "10s" : "13s"} ease-in-out ${orb.delay} infinite`,
          }}
        />
      ))}

      {/* ── Content ── */}

      {/* Live badge */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "5px 14px",
          borderRadius: 9999,
          background: "rgba(0,229,204,0.06)",
          border: "1px solid rgba(0,229,204,0.18)",
          marginBottom: 28,
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00E5CC",
            boxShadow: "0 0 8px #00E5CC",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#00E5CC",
            letterSpacing: "0.08em",
            fontFamily: "var(--font-geist-sans)",
            textTransform: "uppercase",
          }}
        >
          Public Beta — AI* Audio Engine
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1.06,
          margin: 0,
          maxWidth: 780,
        }}
      >
        <span style={{ color: "#FFFFFF" }}>A sound so precise,</span>
        <br />
        <span
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #a0fdf0 50%, #00E5CC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(0,229,204,0.3))",
          }}
        >
          silence finally makes sense.
        </span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: 16,
          color: "#A0A0A8",
          marginTop: 18,
          marginBottom: 0,
          letterSpacing: "0.01em",
          lineHeight: 1.6,
        }}
      >
        Three years. Two studies. One ping.
      </motion.p>

      {/* Buttons */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{
          display: "flex",
          gap: 12,
          marginTop: 36,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Play the ping */}
        <div style={{ position: "relative" }}>
          {pingActive && (
            <>
              <span
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: 9999,
                  border: "2px solid rgba(0,229,204,0.7)",
                  animation: "ping-ring 1s ease-out forwards",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: 9999,
                  border: "1px solid rgba(0,229,204,0.3)",
                  animation: "ping-ring 1.2s ease-out 0.1s forwards",
                }}
              />
            </>
          )}
          <motion.button
            onClick={handlePing}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            style={{
              background: "#00E5CC",
              color: "#001a17",
              border: "none",
              borderRadius: 9999,
              padding: "13px 30px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-geist-sans)",
              boxShadow: "0 0 40px rgba(0,229,204,0.45), 0 4px 24px rgba(0,229,204,0.25)",
              position: "relative",
              letterSpacing: "0.01em",
            }}
          >
            Play the ping
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, borderColor: "#4A4A52", color: "#FFFFFF" }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            color: "#A0A0A8",
            border: "1px solid #2A2A2D",
            borderRadius: 9999,
            padding: "13px 30px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-geist-sans)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          Join waitlist
        </motion.button>
      </motion.div>

      {/* Stat strip */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{
          marginTop: 28,
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          justifyContent: "center",
          fontFamily: "var(--font-geist-sans)",
          fontSize: 12,
          color: "#4A4A52",
          letterSpacing: "0.04em",
        }}
      >
        {["3,847 teams", "·", "12.4M pings", "·", "0.3ms latency", "·", "0 CVEs"].map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{
            width: 20,
            height: 32,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "5px 0",
          }}
        >
          <div
            style={{
              width: 2,
              height: 8,
              borderRadius: 2,
              background: "rgba(0,229,204,0.5)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

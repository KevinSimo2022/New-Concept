"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWaveformStore } from "@/store/useWaveformStore";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const burst = useWaveformStore((s) => s.burst);

  /* ── Ping flash ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!burst || !videoRef.current) return;
    const v = videoRef.current;
    gsap.killTweensOf(v);
    gsap.fromTo(
      v,
      { filter: "brightness(0.65) saturate(1) contrast(1)" },
      {
        filter: "brightness(2.8) saturate(3) contrast(1.25)",
        duration: 0.1,
        ease: "power3.out",
        onComplete: () =>
          gsap.to(v, {
            filter: "brightness(0.65) saturate(1) contrast(1)",
            duration: 1.4,
            ease: "expo.out",
          }),
      }
    );
  }, [burst]);

  /* ── Smooth playbackRate scrubbing ─────────────────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const v = videoRef.current;
    if (!v) return;

    /* The video plays at a variable speed — scroll velocity controls the rate.
       We lerp toward the target so acceleration/deceleration feel organic.    */
    const IDLE_RATE = 0.35; // gentle ambient speed when not scrolling
    let targetRate = IDLE_RATE;
    let currentRate = IDLE_RATE;
    let lastScrollMs = 0;
    let rafId = 0;

    const tick = () => {
      const idle = Date.now() - lastScrollMs > 200;
      if (idle) targetRate = IDLE_RATE;

      currentRate = lerp(currentRate, targetRate, 0.07);

      if (v.readyState >= 2) {
        v.playbackRate = Math.min(4, Math.max(0.1, currentRate));
        if (v.paused) v.play().catch(() => {});
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    /* ScrollTrigger maps velocity → target playback rate */
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity());
        targetRate = Math.min(3.5, vel / 400); // fast scroll = 3× speed
        lastScrollMs = Date.now();
      },
    });

    /* 3-D perspective tilt — independent of playback */
    const tiltCtx = gsap.context(() => {
      gsap.to(v, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
        },
        rotateX: 9,
        scale: 1.13,
        ease: "none",
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      tiltCtx.revert();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        perspective: "900px",
        perspectiveOrigin: "50% 38%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: "-6%",
          left: "-5%",
          width: "110%",
          height: "112%",
          objectFit: "cover",
          filter: "brightness(0.65) saturate(1) contrast(1)",
          transformOrigin: "50% 50%",
          willChange: "transform, filter",
        }}
      />
      {/* Radial vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 90% 65% at 50% 36%, rgba(10,10,11,0.18) 0%, rgba(10,10,11,0.58) 100%)",
      }} />
      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28vh",
        background: "linear-gradient(to bottom, transparent, rgba(10,10,11,0.97))",
      }} />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

interface Props {
  duration?: number;
  size?: number;
  color?: string;
  delay?: number;
}

/* Renders a glowing point that travels around the card border on a canvas */
export function BorderBeam({
  duration = 6,
  size = 80,
  color = "#00E5CC",
  delay = 0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let start: number | null = null;

    const getPerimeter = (w: number, h: number) => 2 * (w + h);

    const draw = (timestamp: number) => {
      if (!start) start = timestamp + delay * 1000;
      const elapsed = Math.max(0, timestamp - start);
      const progress = (elapsed / (duration * 1000)) % 1;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      const perimeter = getPerimeter(w, h);
      const dist = progress * perimeter;

      // Convert perimeter distance → x,y position on the border
      let x = 0;
      let y = 0;
      if (dist < w) {
        x = dist; y = 0;
      } else if (dist < w + h) {
        x = w; y = dist - w;
      } else if (dist < 2 * w + h) {
        x = w - (dist - w - h); y = h;
      } else {
        x = 0; y = h - (dist - 2 * w - h);
      }

      // Draw glowing beam head
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, color.replace(")", ", 0.9)").replace("rgb", "rgba"));
      gradient.addColorStop(0.3, color.replace(")", ", 0.3)").replace("rgb", "rgba"));
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [duration, size, color, delay]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, borderRadius: "inherit" }}
      />
    </div>
  );
}

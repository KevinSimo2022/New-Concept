"use client";

import { useEffect, useState } from "react";

interface MeteorData {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

export function Meteors({ count = 18 }: { count?: number }) {
  const [meteors, setMeteors] = useState<MeteorData[]>([]);

  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 70,
        left: Math.random() * 120 - 10,
        delay: Math.random() * 12,
        duration: Math.random() * 4 + 5,
      }))
    );
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes meteor-fall {
          0%   { opacity: 0; transform: translateX(0) translateY(0); }
          5%   { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateX(-400px) translateY(400px); }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {meteors.map((m) => (
          <span
            key={m.id}
            style={{
              position: "absolute",
              top: `${m.top}%`,
              left: `${m.left}%`,
              width: 1.5,
              height: 90,
              background:
                "linear-gradient(to bottom, rgba(0,229,204,0), rgba(0,229,204,0.7) 40%, rgba(255,255,255,0.9) 50%, rgba(0,229,204,0.7) 60%, rgba(0,229,204,0))",
              borderRadius: 9999,
              transform: "rotate(-35deg)",
              animation: `meteor-fall ${m.duration}s linear ${m.delay}s infinite`,
              boxShadow: "0 0 8px 1px rgba(0,229,204,0.3)",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </>
  );
}

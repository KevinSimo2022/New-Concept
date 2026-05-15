"use client";

import { useState, useEffect } from "react";

type CanvasComponent = React.ComponentType;

export function ClientCanvas() {
  const [Canvas, setCanvas] = useState<CanvasComponent | null>(null);

  useEffect(() => {
    // Import only runs in the browser — useEffect never executes server-side
    import("./WaveformCanvas")
      .then((m) => setCanvas(() => m.WaveformCanvas))
      .catch(() => {});
  }, []);

  if (!Canvas) return null;
  return <Canvas />;
}

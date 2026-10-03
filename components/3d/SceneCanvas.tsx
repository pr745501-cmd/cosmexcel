"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { SceneQuality } from "@/hooks/useSceneQuality";

interface Props {
  quality: SceneQuality;
  children: React.ReactNode;
  fallback: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
}

const DPR_MAX: Record<SceneQuality, number> = { high: 1.75, medium: 1.4, low: 1.15, none: 1 };

/**
 * Shared canvas shell: caps DPR by quality tier, pauses rendering when scrolled off-screen
 * and swaps in a static fallback if the GPU context is lost.
 */
export function SceneCanvas({ quality, children, fallback, cameraPosition = [0, 0.4, 9], fov = 32, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (lost) return <>{fallback}</>;

  return (
    <div ref={wrap} className={className}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, DPR_MAX[quality]]}
        gl={{ antialias: quality !== "low", alpha: true, powerPreference: "high-performance" }}
        camera={{ position: cameraPosition, fov, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setLost(true);
          });
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}

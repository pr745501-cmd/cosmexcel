"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

/** Deterministic PRNG so geometry is stable across renders (and lint-pure). */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let spriteCache: THREE.CanvasTexture | null = null;
export function getSoftSprite() {
  if (spriteCache) return spriteCache;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,244,220,1)");
    g.addColorStop(0.35, "rgba(240,205,140,0.55)");
    g.addColorStop(1, "rgba(240,205,140,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }
  spriteCache = new THREE.CanvasTexture(c);
  return spriteCache;
}

interface Props {
  count: number;
  innerRadius?: number;
  outerRadius?: number;
  size?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  animate?: boolean;
  seed?: number;
}

/** Fine champagne-gold dust drifting around the scene. */
export function ParticleField({
  count,
  innerRadius = 2.4,
  outerRadius = 7,
  size = 0.055,
  color = "#e8cf9e",
  opacity = 0.85,
  speed = 0.02,
  animate = true,
  seed = 7,
}: Props) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(seed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = innerRadius + rand() * (outerRadius - innerRadius);
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.25;
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.8;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count, innerRadius, outerRadius, seed]);

  useFrame((_, delta) => {
    const p = ref.current;
    if (!p || !animate) return;
    p.rotation.y += delta * speed;
    p.position.y = sceneState.scroll * 1.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={getSoftSprite()}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

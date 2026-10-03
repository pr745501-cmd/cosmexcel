"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { ScenePoster } from "./SceneLoader";
import { BeautyGlobe } from "./BeautyGlobe";
import { ParticleField, getSoftSprite } from "./ParticleField";
import type { SceneQuality } from "@/hooks/useSceneQuality";

const SHELL = 2.6;
const COUNT = 5;
const GOLD = new THREE.Color("#e8cf9e");
const DIM = new THREE.Color("#7a5a86");

const nodeAngle = (i: number) => (i / COUNT) * Math.PI * 2;
const nodePosition = (i: number): [number, number, number] => {
  const a = nodeAngle(i);
  const lift = [0.6, -0.5, 0.8, -0.35, 0.25][i % 5];
  return [Math.sin(a) * SHELL, lift, Math.cos(a) * SHELL];
};

/** One leadership category: a node, its spoke to the globe, and a halo that lights when active. */
function LeaderNode({ index, active, animate }: { index: number; active: boolean; animate: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Sprite>(null);
  const line = useRef<THREE.LineBasicMaterial>(null);
  const pos = useMemo(() => nodePosition(index), [index]);
  const spoke = useMemo(() => new Float32Array([0, 0, 0, ...pos]), [pos]);
  const sprite = getSoftSprite();

  useFrame((state, dt) => {
    const k = active ? 1 : 0;
    const pulse = active && animate ? 1 + Math.sin(state.clock.elapsedTime * 3) * 0.12 : 1;
    if (mesh.current) {
      const s = THREE.MathUtils.damp(mesh.current.scale.x, (0.55 + k * 0.7) * pulse, 6, dt);
      mesh.current.scale.setScalar(s);
      (mesh.current.material as THREE.MeshBasicMaterial).color.lerpColors(DIM, GOLD, k);
    }
    if (halo.current) {
      const s = THREE.MathUtils.damp(halo.current.scale.x, 0.5 + k * 1.3, 5, dt);
      halo.current.scale.set(s, s, s);
      halo.current.material.opacity = THREE.MathUtils.damp(halo.current.material.opacity, 0.15 + k * 0.85, 5, dt);
    }
    if (line.current) line.current.opacity = THREE.MathUtils.damp(line.current.opacity, 0.12 + k * 0.75, 5, dt);
  });

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[spoke, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={line} color="#e8cf9e" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
      <sprite ref={halo} position={pos}>
        <spriteMaterial map={sprite} color="#ffe2a8" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <mesh ref={mesh} position={pos} scale={0.55}>
        <sphereGeometry args={[0.14, 20, 16]} />
        <meshBasicMaterial color="#7a5a86" />
      </mesh>
    </group>
  );
}

function Scene({ active, quality, animate }: { active: number; quality: SceneQuality; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    // Turn the constellation so the active category faces the viewer.
    const target = -nodeAngle(active) + (animate ? Math.sin(state.clock.elapsedTime * 0.4) * 0.05 : 0);
    let diff = target - g.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    g.rotation.y += diff * Math.min(1, dt * 2.4);
  });

  return (
    <>
      <group ref={group} rotation={[0.18, 0, 0]}>
        <BeautyGlobe radius={1.5} points={quality === "low" ? 450 : 900} arcs={quality === "low" ? 6 : 12} packets={quality === "low" ? 6 : 12} animate={animate} seed={23} />
        <mesh rotation={[Math.PI / 2.15, 0, 0]}>
          <torusGeometry args={[SHELL, 0.004, 6, 200]} />
          <meshBasicMaterial color="#d6aa63" transparent opacity={0.35} />
        </mesh>
        {Array.from({ length: COUNT }, (_, i) => (
          <LeaderNode key={i} index={i} active={i === active} animate={animate} />
        ))}
      </group>
      <ParticleField count={quality === "low" ? 80 : 240} innerRadius={3} outerRadius={6.5} size={0.045} animate={animate} seed={31} />
    </>
  );
}

interface Props {
  active: number;
  quality: SceneQuality;
  animate: boolean;
}

export default function NetworkScene({ active, quality, animate }: Props) {
  return (
    <SceneCanvas quality={quality} cameraPosition={[0, 0.6, 8.2]} fov={34} fallback={<ScenePoster className="absolute inset-0" />} className="absolute inset-0">
      <Scene active={active} quality={quality} animate={animate} />
    </SceneCanvas>
  );
}

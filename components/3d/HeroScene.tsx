"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { ScenePoster } from "./SceneLoader";
import { CosmeticObject } from "./CosmeticObject";
import { ParticleField, getSoftSprite } from "./ParticleField";
import { BeautyGlobe } from "./BeautyGlobe";
import type { SceneQuality } from "@/hooks/useSceneQuality";
import { sceneState } from "@/lib/scroll";

const PARTICLES: Record<SceneQuality, number> = { high: 650, medium: 320, low: 130, none: 0 };

/** A thin gold orbit with small light nodes travelling along it (the "global connection" layer). */
function OrbitRing({ radius, tilt, spin, nodes, animate }: { radius: number; tilt: [number, number, number]; spin: number; nodes: number; animate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const sprite = getSoftSprite();
  useFrame((_, dt) => {
    if (ref.current && animate) ref.current.rotation.z += dt * spin;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.004, 6, 220]} />
          <meshBasicMaterial color="#d6aa63" transparent opacity={0.45} />
        </mesh>
        {Array.from({ length: nodes }, (_, i) => {
          const a = (i / nodes) * Math.PI * 2 + radius;
          return (
            <sprite key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]} scale={[0.22, 0.22, 0.22]}>
              <spriteMaterial map={sprite} color="#fff1cf" transparent blending={THREE.AdditiveBlending} depthWrite={false} />
            </sprite>
          );
        })}
      </group>
    </group>
  );
}

/** Abstract molecular lattice: wireframe icosahedron with glowing vertices. */
function Lattice({ animate, detail }: { animate: boolean; detail: number }) {
  const ref = useRef<THREE.Group>(null);
  const { edges, verts } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1, detail);
    return { edges: new THREE.EdgesGeometry(ico), verts: ico.getAttribute("position").array as Float32Array };
  }, [detail]);
  useFrame((_, dt) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.y += dt * 0.08;
    ref.current.rotation.x += dt * 0.03;
  });
  return (
    <group ref={ref} scale={3.1}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#c99c58" transparent opacity={0.22} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[verts, 3]} />
        </bufferGeometry>
        <pointsMaterial map={getSoftSprite()} color="#ffe9bd" size={0.07} sizeAttenuation transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

function Scene({ quality, animate }: { quality: SceneQuality; animate: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const world = useRef<THREE.Group>(null);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const fit = THREE.MathUtils.clamp(aspect * 1.05, 0.5, 1.08);
  const portrait = aspect < 0.9;

  useFrame((state, dt) => {
    const rigGroup = rig.current;
    const worldGroup = world.current;
    if (!rigGroup || !worldGroup) return;
    const t = animate ? state.clock.elapsedTime : 0;
    const s = sceneState.scroll;
    const px = animate ? sceneState.pointerX : 0;
    const py = animate ? sceneState.pointerY : 0;

    // Scroll gradually turns the still-life away and lifts it out of frame.
    rigGroup.rotation.y = THREE.MathUtils.damp(rigGroup.rotation.y, s * Math.PI * 0.85 + px * 0.28 + Math.sin(t * 0.3) * 0.06, 3, dt);
    rigGroup.position.y = THREE.MathUtils.damp(rigGroup.position.y, (portrait ? 0.15 : -1.85) + s * 1.1 + Math.sin(t * 0.7) * 0.04, 3, dt);
    const sc = fit * (1 - s * 0.18);
    rigGroup.scale.setScalar(THREE.MathUtils.damp(rigGroup.scale.x, sc, 4, dt));
    worldGroup.rotation.y += animate ? dt * 0.02 : 0;
    worldGroup.scale.setScalar(1 + s * 0.35);

    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, px * 0.6, 2.5, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 1.1 + py * 0.3 + s * 0.8, 2.5, dt);
    cam.position.z = 9 + s * 2.5;
    cam.lookAt(0, 0.1 + s * 0.4, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} color="#f3e6ff" />
      <spotLight position={[4, 7, 5]} angle={0.55} penumbra={1} intensity={260} color="#ffe3b0" />
      <pointLight position={[-6, 2, 3]} intensity={70} color="#9a4592" />
      <pointLight position={[0, -1, 5]} intensity={26} color="#e8cf9e" />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} color="#fff0d6" position={[3, 4, 4]} scale={[7, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#b06aa8" position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[3, 7, 1]} />
        <Lightformer form="ring" intensity={3} color="#e8cf9e" position={[0, 5, -3]} scale={4} />
      </Environment>

      {/* Distant globe + dust: depth behind the product */}
      <group ref={world} position={[0, 0.2, -3.2]}>
        <BeautyGlobe radius={4.2} points={quality === "high" ? 1400 : quality === "medium" ? 800 : 380} arcs={quality === "low" ? 6 : 12} packets={quality === "low" ? 6 : 14} opacity={0.55} animate={animate} />
      </group>

      <group ref={rig}>
        <group position={[0, 1.7, 0]}>
          <Lattice animate={animate} detail={quality === "low" ? 0 : 1} />
        </group>
        <OrbitRing radius={3.3} tilt={[1.25, 0.2, 0.3]} spin={0.12} nodes={5} animate={animate} />
        {quality !== "low" && <OrbitRing radius={4.1} tilt={[1.05, -0.35, -0.2]} spin={-0.08} nodes={4} animate={animate} />}
        <CosmeticObject quality={quality} />
      </group>

      <ParticleField count={PARTICLES[quality]} animate={animate} />
    </>
  );
}

interface Props {
  quality: SceneQuality;
  animate: boolean;
}

export default function HeroScene({ quality, animate }: Props) {
  return (
    <SceneCanvas quality={quality} fallback={<ScenePoster className="absolute inset-0" />} className="absolute inset-0">
      <Scene quality={quality} animate={animate} />
    </SceneCanvas>
  );
}

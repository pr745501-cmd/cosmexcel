"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { SceneQuality } from "@/hooks/useSceneQuality";

type Profile = ReadonlyArray<readonly [number, number]>;

/* Procedural vessel profiles (radius, height). Revolved with LatheGeometry — no model downloads. */
const TALL_BODY: Profile = [[0, 0], [0.5, 0], [0.55, 0.05], [0.56, 0.14], [0.56, 1.75], [0.5, 1.98], [0.32, 2.14], [0.25, 2.22], [0.25, 2.45], [0, 2.45]];
const TALL_CAP: Profile = [[0, 2.42], [0.32, 2.42], [0.32, 3.1], [0.3, 3.15], [0, 3.15]];
const DROPPER_BODY: Profile = [[0, 0], [0.42, 0], [0.46, 0.05], [0.46, 1.0], [0.38, 1.3], [0.2, 1.42], [0.2, 1.55], [0, 1.55]];
const DROPPER_COLLAR: Profile = [[0, 1.5], [0.25, 1.5], [0.25, 1.88], [0.22, 1.92], [0, 1.92]];
const DROPPER_BULB: Profile = [[0, 1.9], [0.14, 1.9], [0.17, 2.2], [0.11, 2.45], [0.04, 2.55], [0, 2.55]];
const JAR_BODY: Profile = [[0, 0], [0.95, 0], [1.0, 0.05], [1.0, 0.64], [0, 0.64]];
const JAR_LID: Profile = [[0, 0.62], [1.03, 0.62], [1.03, 1.0], [0.99, 1.05], [0, 1.05]];
const PUMP_BODY: Profile = [[0, 0], [0.48, 0], [0.5, 0.05], [0.5, 1.9], [0.42, 2.1], [0.22, 2.2], [0, 2.2]];
const PUMP_COLLAR: Profile = [[0, 2.15], [0.25, 2.15], [0.25, 2.55], [0, 2.55]];

function Lathe({ profile, segments, material, castShadow = false }: { profile: Profile; segments: number; material: THREE.Material; castShadow?: boolean }) {
  const geometry = useMemo(() => new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), segments), [profile, segments]);
  return <mesh geometry={geometry} material={material} castShadow={castShadow} />;
}

interface Props {
  quality: SceneQuality;
}

/** A premium still-life: serum bottle, dropper, jar and pump on a pale stone plinth with gold detailing. */
export function CosmeticObject({ quality }: Props) {
  const seg = quality === "high" ? 72 : quality === "medium" ? 48 : 32;
  const materials = useMemo(() => {
    const glass =
      quality === "high"
        ? new THREE.MeshPhysicalMaterial({ color: "#5b2350", roughness: 0.06, metalness: 0, transmission: 0.82, thickness: 1.1, ior: 1.48, clearcoat: 1, clearcoatRoughness: 0.05, attenuationColor: new THREE.Color("#3a1236"), attenuationDistance: 1.2, envMapIntensity: 1.3 })
        : new THREE.MeshStandardMaterial({ color: "#4b1c43", roughness: 0.14, metalness: 0.35, envMapIntensity: 1.5 });
    const gold = new THREE.MeshStandardMaterial({ color: "#d6aa63", metalness: 1, roughness: 0.2, envMapIntensity: 1.6 });
    const cream = new THREE.MeshPhysicalMaterial({ color: "#f1e4cf", roughness: 0.32, clearcoat: 0.7, clearcoatRoughness: 0.2, envMapIntensity: 1 });
    const rubber = new THREE.MeshStandardMaterial({ color: "#150a1c", roughness: 0.5, metalness: 0.1 });
    const stone = new THREE.MeshStandardMaterial({ color: "#e9dcc6", roughness: 0.38, metalness: 0.08, envMapIntensity: 0.9 });
    return { glass, gold, cream, rubber, stone };
  }, [quality]);

  return (
    <group>
      {/* Plinth */}
      <mesh material={materials.stone} position={[0, -0.12, 0]}>
        <cylinderGeometry args={[2.45, 2.55, 0.24, seg]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.002, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.45, 0.012, 8, 160]} />
      </mesh>

      {/* Serum bottle */}
      <group position={[-0.15, 0, -0.25]}>
        <Lathe profile={TALL_BODY} segments={seg} material={materials.glass} />
        <Lathe profile={TALL_CAP} segments={seg} material={materials.gold} />
      </group>

      {/* Dropper */}
      <group position={[1.15, 0, 0.75]} scale={0.95}>
        <Lathe profile={DROPPER_BODY} segments={seg} material={materials.glass} />
        <Lathe profile={DROPPER_COLLAR} segments={seg} material={materials.gold} />
        <Lathe profile={DROPPER_BULB} segments={seg} material={materials.rubber} />
      </group>

      {/* Jar */}
      <group position={[-1.2, 0, 0.8]} scale={0.88}>
        <Lathe profile={JAR_BODY} segments={seg} material={materials.glass} />
        <Lathe profile={JAR_LID} segments={seg} material={materials.gold} />
      </group>

      {/* Pump bottle */}
      <group position={[1.35, 0, -0.75]} scale={0.98}>
        <Lathe profile={PUMP_BODY} segments={seg} material={materials.cream} />
        <Lathe profile={PUMP_COLLAR} segments={seg} material={materials.gold} />
        <mesh material={materials.gold} position={[0, 2.78, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />
        </mesh>
        <mesh material={materials.gold} position={[0.14, 3.08, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.26]} />
        </mesh>
      </group>
    </group>
  );
}

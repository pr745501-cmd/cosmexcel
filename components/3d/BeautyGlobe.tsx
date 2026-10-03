"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getSoftSprite, mulberry32 } from "./ParticleField";

interface Props {
  radius?: number;
  points?: number;
  arcs?: number;
  packets?: number;
  opacity?: number;
  animate?: boolean;
  seed?: number;
}

/** Abstract globe: clustered surface dots, great-circle arcs and light packets travelling between points. */
export function BeautyGlobe({ radius = 1.6, points = 900, arcs = 14, packets = 14, opacity = 1, animate = true, seed = 11 }: Props) {
  const group = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.Points>(null);

  const { dotPositions, arcPositions, curves } = useMemo(() => {
    const rand = mulberry32(seed);
    const dots: number[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    const total = points * 2.4;
    for (let i = 0; i < total && dots.length < points * 3; i++) {
      const y = 1 - (i / (total - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      // Low-frequency noise carves the sphere into continent-like clusters.
      const n = Math.sin(x * 3.1 + 1.3) + Math.sin(y * 4.2 - 0.7) * Math.cos(z * 3.6) + Math.sin((x + z) * 2.3);
      if (n > -0.15) dots.push(x * radius, y * radius, z * radius);
    }

    const anchors: THREE.Vector3[] = [];
    for (let i = 0; i < arcs + 4; i++) {
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(2 * rand() - 1);
      anchors.push(new THREE.Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)));
    }
    const curveList: THREE.QuadraticBezierCurve3[] = [];
    const lines: number[] = [];
    for (let i = 0; i < arcs; i++) {
      const a = anchors[i];
      const b = anchors[(i * 3 + 5) % anchors.length];
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const lift = 1 + 0.18 + a.distanceTo(b) * 0.22;
      mid.normalize().multiplyScalar(radius * lift);
      const curve = new THREE.QuadraticBezierCurve3(a.clone().multiplyScalar(radius), mid, b.clone().multiplyScalar(radius));
      curveList.push(curve);
      const pts = curve.getPoints(28);
      for (let j = 0; j < pts.length - 1; j++) lines.push(pts[j].x, pts[j].y, pts[j].z, pts[j + 1].x, pts[j + 1].y, pts[j + 1].z);
    }
    return { dotPositions: new Float32Array(dots), arcPositions: new Float32Array(lines), curves: curveList };
  }, [points, arcs, radius, seed]);

  const packetState = useMemo(() => {
    const rand = mulberry32(seed + 3);
    return Array.from({ length: packets }, (_, i) => ({ curve: i % curves.length, t: rand(), speed: 0.07 + rand() * 0.1 }));
  }, [packets, curves.length, seed]);
  const packetPositions = useMemo(() => new Float32Array(packets * 3), [packets]);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (group.current && animate) group.current.rotation.y += delta * 0.07;
    const pts = packetRef.current;
    if (!pts) return;
    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    packetState.forEach((p, i) => {
      if (animate) p.t = (p.t + delta * p.speed) % 1;
      curves[p.curve].getPoint(p.t, tmp);
      attr.setXYZ(i, tmp.x, tmp.y, tmp.z);
    });
    attr.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[radius * 0.985, 48, 32]} />
        <meshBasicMaterial color="#2b1535" transparent opacity={0.55 * opacity} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e8cf9e" size={0.028} sizeAttenuation transparent opacity={0.8 * opacity} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[arcPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#d6aa63" transparent opacity={0.4 * opacity} depthWrite={false} />
      </lineSegments>
      <points ref={packetRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packetPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={getSoftSprite()} color="#fff1cf" size={0.2} sizeAttenuation transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

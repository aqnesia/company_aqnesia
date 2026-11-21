"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Single Reusable Flag Monolith Plate for the Orbital Silk Wave
function SilkFlagMonolith({
  texture,
  edgeColor = "#ffffff",
}: {
  texture: THREE.Texture;
  edgeColor?: string;
}) {
  return (
    <group scale={0.84}>
      {/* Front Face */}
      <mesh position={[0, 0, 0.102]}>
        <planeGeometry args={[3.0, 2.0]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Back Face */}
      <mesh position={[0, 0, -0.102]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.0, 2.0]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Thick Acrylic / Glass Monolith Slab */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.08, 2.08, 0.2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          roughness={0.14}
          metalness={0.08}
          thickness={0.8}
          ior={1.52}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Luminous Edge Line */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.09, 2.09, 0.205)]} />
        <lineBasicMaterial color={edgeColor} linewidth={1.5} opacity={0.75} transparent />
      </lineSegments>
    </group>
  );
}

export default function TriFlagAllianceTriangle({
  position = [4.0, 23.2, -3],
  scrollProgress = 0,
}: {
  position?: [number, number, number];
  scrollProgress?: number;
}) {
  const clusterRef = useRef<THREE.Group>(null);
  const flag0Ref = useRef<THREE.Group>(null);
  const flag1Ref = useRef<THREE.Group>(null);
  const flag2Ref = useRef<THREE.Group>(null);

  // Textures for 3 Flags
  const texIndonesia = useTexture("/emblems/indonesia.png");
  const texJapan = useTexture("/emblems/japan.png");
  const texTaiwan = useTexture("/emblems/taiwan.png");

  texIndonesia.colorSpace = THREE.SRGBColorSpace;
  texJapan.colorSpace = THREE.SRGBColorSpace;
  texTaiwan.colorSpace = THREE.SRGBColorSpace;

  // Damped pointer tilt tracking
  const tiltRef = useRef({ x: 0, y: 0 });

  // Soft luminous silk orbit wave path preview
  const silkPathLine = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 120;
    for (let i = 0; i <= count; i++) {
      const th = (i / count) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.sin(th) * 2.8,
          Math.sin(th * 2) * 0.75,
          Math.cos(th) * 2.2
        )
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: "#ffd700",
      transparent: true,
      opacity: 0.22,
      linewidth: 1.5,
    });
    return new THREE.LineLoop(geo, mat);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * 0.45; // Smooth flowing wave speed

    // Interactive mouse tilt response
    tiltRef.current.x = THREE.MathUtils.lerp(tiltRef.current.x, -state.pointer.y * 0.26, 0.05);
    tiltRef.current.y = THREE.MathUtils.lerp(tiltRef.current.y, state.pointer.x * 0.38, 0.05);

    if (clusterRef.current) {
      clusterRef.current.rotation.x = tiltRef.current.x;
      clusterRef.current.rotation.y = tiltRef.current.y;
    }

    // Helper to calculate position and dynamic banking angle on the 3D wave loop
    const updateWaveNode = (node: THREE.Group | null, offset: number) => {
      if (!node) return;
      const th = t + offset;

      // 3D Undulating Wave Coordinates
      const x = Math.sin(th) * 2.8;
      const y = Math.sin(th * 2) * 0.75;
      const z = Math.cos(th) * 2.2;

      node.position.set(x, y, z);

      // Tangent velocity vector to naturally orient the flag along the wave flow
      const vx = Math.cos(th) * 2.8;
      const vy = 2 * Math.cos(th * 2) * 0.75;
      const vz = -Math.sin(th) * 2.2;

      const yaw = Math.atan2(vx, vz);
      const pitch = -Math.atan2(vy, Math.hypot(vx, vz)) * 0.6;
      const roll = -Math.sin(th * 2) * 0.24; // banking into the curve

      node.rotation.set(pitch, yaw, roll);
    };

    // 1. INDONESIA: Lead node
    updateWaveNode(flag0Ref.current, 0);

    // 2. JEPANG: 120 deg phase offset (2 * PI / 3)
    updateWaveNode(flag1Ref.current, (2 * Math.PI) / 3);

    // 3. TAIWAN: 240 deg phase offset (4 * PI / 3)
    updateWaveNode(flag2Ref.current, (4 * Math.PI) / 3);
  });

  // Scale in smoothly when entering Stage 4 (scrollProgress >= 0.86)
  const isVisible = scrollProgress >= 0.86;
  const scale = isVisible ? THREE.MathUtils.smoothstep(scrollProgress, 0.86, 0.94) : 0;

  if (scale <= 0.005) return null;

  return (
    <group position={position} scale={scale}>
      <group ref={clusterRef}>
        {/* Soft flowing wave trajectory guide */}
        <primitive object={silkPathLine} />

        {/* 1. INDONESIA 🇮🇩 (Wave Traveler) */}
        <group ref={flag0Ref}>
          <SilkFlagMonolith texture={texIndonesia} edgeColor="#ed1c24" />
        </group>

        {/* 2. JEPANG 🇯🇵 (Wave Traveler) */}
        <group ref={flag1Ref}>
          <SilkFlagMonolith texture={texJapan} edgeColor="#bc002d" />
        </group>

        {/* 3. TAIWAN 🇹🇼 (Wave Traveler) */}
        <group ref={flag2Ref}>
          <SilkFlagMonolith texture={texTaiwan} edgeColor="#000095" />
        </group>

        {/* Warm core illumination */}
        <pointLight color="#ffe8aa" intensity={2.4} distance={8} decay={2} position={[0, 0, 0]} />

        {/* Gentle ambient floating sparkles */}
        <Sparkles count={20} scale={6.5} size={2.0} speed={0.3} opacity={0.35} color="#ffd700" />
      </group>
    </group>
  );
}

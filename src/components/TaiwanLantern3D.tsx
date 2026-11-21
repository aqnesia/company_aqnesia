"use client";

import React, { useRef, useMemo } from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function TaiwanLantern3D({
  position = [5.1, 22, -3],
  scale = 1.15,
  rotation = [0.05, 0.3, 0],
}: {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Vertical Rib Rings Wrapping the Spherical Balloon
  const ribAngles = useMemo(() => [0, Math.PI / 3, (2 * Math.PI) / 3], []);

  // Hanging Tassel Silk Strands
  const tasselFringes = useMemo(() => {
    const arr = [];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.16;
      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
      });
    }
    return arr;
  }, []);

  return (
    <Float speed={2.0} rotationIntensity={0.35} floatIntensity={0.7} floatingRange={[-0.15, 0.15]}>
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        {/* === 1. TOP SUSPENSION WIRE & HOOK === */}
        {/* Hanging Wire Stem */}
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.6, 12]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Top Brass Hook Loop */}
        <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.065, 0.014, 12, 24, Math.PI * 1.5]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* === 2. TOP GOLDEN CAP / COLLAR === */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.46, 0.18, 32]} />
          <meshPhysicalMaterial
            color="#ffd700"
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.8}
          />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <torusGeometry args={[0.43, 0.024, 12, 32]} />
          <meshStandardMaterial color="#e5b838" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* === 3. RED SILK LANTERN SPHERICAL BODY === */}
        {/* Squashed Oblate Spheroid (Traditional Lantern Profile) */}
        <mesh position={[0, 0, 0]} scale={[1.15, 0.95, 1.15]} castShadow receiveShadow>
          <sphereGeometry args={[1.0, 36, 36]} />
          <meshPhysicalMaterial
            color="#d61c1c"
            roughness={0.38}
            metalness={0.1}
            transmission={0.32}
            thickness={0.6}
            ior={1.48}
            clearcoat={0.4}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Internal Warm Lantern Glow */}
        <pointLight color="#ff7b2b" intensity={3.5} distance={4.5} decay={2} position={[0, 0, 0]} />

        {/* Vertical Gold Meridian Ribs */}
        {ribAngles.map((ang, idx) => (
          <mesh key={idx} rotation={[0, ang, 0]} scale={[1.16, 0.96, 1.16]}>
            <torusGeometry args={[1.0, 0.016, 12, 64]} />
            <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.2} />
          </mesh>
        ))}

        {/* Golden Calligraphy / Medallion Insignia on Front and Back */}
        <mesh position={[0, 0, 1.17]}>
          <ringGeometry args={[0.22, 0.32, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 1.175]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, -1.17]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.22, 0.32, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>

        {/* === 4. BOTTOM GOLDEN COLLAR & CAP === */}
        <mesh position={[0, -0.96, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.38, 0.16, 32]} />
          <meshPhysicalMaterial
            color="#ffd700"
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.8}
          />
        </mesh>
        <mesh position={[0, -1.04, 0]}>
          <torusGeometry args={[0.4, 0.024, 12, 32]} />
          <meshStandardMaterial color="#e5b838" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* === 5. JADE BEAD & TASSEL STRANDS (TRADITIONAL FRINGE) === */}
        {/* Jade Green Decorative Bead Accent */}
        <mesh position={[0, -1.18, 0]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshPhysicalMaterial
            color="#1fb27a"
            roughness={0.15}
            metalness={0.1}
            transmission={0.4}
            thickness={0.4}
            clearcoat={1.0}
          />
        </mesh>
        {/* Jade Spacers Gold Beads */}
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, -1.26, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Main Central Yellow Silk Tassel Core */}
        <mesh position={[0, -1.82, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.17, 1.0, 24]} />
          <meshStandardMaterial color="#fedc3d" roughness={0.5} />
        </mesh>
        {/* Cascading Yellow Fringe Strands */}
        {tasselFringes.map((tf, i) => (
          <mesh key={i} position={[tf.x, -1.85, tf.z]}>
            <cylinderGeometry args={[0.015, 0.018, 1.05, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

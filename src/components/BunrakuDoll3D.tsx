"use client";

import React, { useRef, useMemo } from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function BunrakuDoll3D({
  position = [-0.6, 9.8, 8],
  scale = 1.0,
  rotation = [0.1, -0.4, 0.05],
}: {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Red Kimono Body Silhouette (Tapered Flared Gown)
  const kimonoRobeGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.38, 0.72, 1.85, 32, 4);
  }, []);

  return (
    <Float speed={1.9} rotationIntensity={0.3} floatIntensity={0.6} floatingRange={[-0.12, 0.12]}>
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        {/* === 1. HEAD & PORCELAIN FACE === */}
        {/* Porcelain Face / Head */}
        <mesh position={[0, 1.22, 0]} castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshPhysicalMaterial
            color="#f7f3ec"
            roughness={0.25}
            metalness={0.05}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Neck Column */}
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.22, 16]} />
          <meshStandardMaterial color="#f2eee7" roughness={0.3} />
        </mesh>

        {/* Traditional Black Hair Sides & Top Knot */}
        {/* Top Hair Volume */}
        <mesh position={[0, 1.34, -0.04]} castShadow>
          <sphereGeometry args={[0.23, 24, 24]} />
          <meshStandardMaterial color="#111115" roughness={0.6} />
        </mesh>
        {/* Left Hair Falls */}
        <mesh position={[-0.18, 1.05, -0.02]} rotation={[0, 0, 0.12]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.48, 16]} />
          <meshStandardMaterial color="#111115" roughness={0.6} />
        </mesh>
        {/* Right Hair Falls */}
        <mesh position={[0.18, 1.05, -0.02]} rotation={[0, 0, -0.12]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.48, 16]} />
          <meshStandardMaterial color="#111115" roughness={0.6} />
        </mesh>

        {/* === 2. ORNATE KANZASHI CROWN (GOLDEN HEADDRESS) === */}
        {/* Arching Tiara Band */}
        <mesh position={[0, 1.36, 0.14]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.19, 0.028, 12, 32, Math.PI * 0.9]} />
          <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Pearl / Flower Cluster Pins */}
        {[-0.14, -0.07, 0, 0.07, 0.14].map((px, i) => (
          <mesh key={i} position={[px, 1.45, 0.11]}>
            <sphereGeometry args={[0.038, 16, 16]} />
            <meshStandardMaterial color="#fffbe6" metalness={0.5} roughness={0.2} />
          </mesh>
        ))}
        {/* Crown Filigree Crest */}
        <mesh position={[0, 1.5, 0.08]}>
          <boxGeometry args={[0.32, 0.09, 0.04]} />
          <meshStandardMaterial color="#e5b838" metalness={0.9} roughness={0.22} />
        </mesh>
        {/* Forehead Dangling Beads (Birabira Fringes) */}
        {[-0.12, -0.06, 0, 0.06, 0.12].map((fx, i) => (
          <mesh key={i} position={[fx, 1.3, 0.2]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
          </mesh>
        ))}

        {/* === 3. TRADITIONAL RED KIMONO / UCHIKAKE ROBE === */}
        {/* Main Body Robe */}
        <mesh position={[0, 0.05, 0]} geometry={kimonoRobeGeometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#c51928"
            roughness={0.42}
            metalness={0.12}
            clearcoat={0.35}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Inner White / Cream Collar (Eri) */}
        <mesh position={[0, 0.88, 0.15]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[0.26, 0.14, 0.08]} />
          <meshStandardMaterial color="#f7f5ee" roughness={0.4} />
        </mesh>
        {/* Gold Border on Collar */}
        <mesh position={[0, 0.84, 0.17]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[0.28, 0.03, 0.09]} />
          <meshStandardMaterial color="#ffd700" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* === 4. GOLD BROCADE OBI SASH (WAISTBAND) === */}
        <mesh position={[0, 0.42, 0.02]} castShadow>
          <cylinderGeometry args={[0.42, 0.44, 0.36, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.88}
            roughness={0.25}
          />
        </mesh>
        {/* Obi Cord (Obijime) */}
        <mesh position={[0, 0.42, 0.22]}>
          <torusGeometry args={[0.43, 0.018, 12, 32]} />
          <meshStandardMaterial color="#880015" metalness={0.3} roughness={0.5} />
        </mesh>

        {/* === 5. VOLUMINOUS SLEEVES (SODE) === */}
        {/* Left Sleeve (Wide Kimono Drape) */}
        <mesh position={[-0.56, 0.22, 0]} rotation={[0, 0, 0.24]} castShadow>
          <boxGeometry args={[0.32, 0.95, 0.52]} />
          <meshPhysicalMaterial
            color="#bc1322"
            roughness={0.42}
            metalness={0.12}
            clearcoat={0.35}
          />
        </mesh>
        {/* Right Sleeve (Wide Kimono Drape) */}
        <mesh position={[0.56, 0.22, 0]} rotation={[0, 0, -0.24]} castShadow>
          <boxGeometry args={[0.32, 0.95, 0.52]} />
          <meshPhysicalMaterial
            color="#bc1322"
            roughness={0.42}
            metalness={0.12}
            clearcoat={0.35}
          />
        </mesh>

        {/* Golden Floral Embroidery Accents on Sleeves & Gown */}
        {[-0.62, 0.62].map((sx, i) => (
          <mesh key={i} position={[sx, 0.28, 0.27]}>
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        <mesh position={[0, -0.32, 0.52]}>
          <octahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.24, -0.52, 0.5]}>
          <octahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.24, -0.52, 0.5]}>
          <octahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* === 6. CARVED WOODEN PUPPET HANDS === */}
        {/* Articulated Left Hand resting at Obi */}
        <mesh position={[-0.16, 0.4, 0.44]} rotation={[0.4, -0.3, 0.2]} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.05]} />
          <meshStandardMaterial color="#ecd6be" roughness={0.5} />
        </mesh>
        {/* Articulated Right Hand resting at Obi */}
        <mesh position={[0.16, 0.38, 0.44]} rotation={[0.4, 0.3, -0.2]} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.05]} />
          <meshStandardMaterial color="#ecd6be" roughness={0.5} />
        </mesh>

        {/* === 7. LACQUERED DISPLAY PEDESTAL STEM === */}
        <mesh position={[0, -1.02, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.35, 16]} />
          <meshStandardMaterial color="#151515" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.2, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.6, 0.08, 32]} />
          <meshStandardMaterial color="#0d0d10" metalness={0.6} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

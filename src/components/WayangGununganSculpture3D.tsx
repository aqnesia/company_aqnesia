"use client";

import React, { useRef, useMemo } from "react";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function WayangGununganSculpture3D({
  position = [2.2, -4.2, 33],
  scale = 1.05,
  rotation = [0.1, -0.38, 0.05],
}: {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Load PBR Textures
  const goldTexture = useTexture("/emblems/wayang_gold.png");
  const bumpTexture = useTexture("/emblems/wayang_bump.png");

  goldTexture.colorSpace = THREE.SRGBColorSpace;
  goldTexture.minFilter = THREE.LinearMipmapLinearFilter;
  goldTexture.magFilter = THREE.LinearFilter;

  // Exact Aspect Ratio of the Artwork: 375 x 681 -> width: 2.533, height: 4.6
  const width = 2.533;
  const height = 4.6;

  // Solid 3D Beveled Outer Gunungan Rim Frame (Following Kayon Silhouette)
  const outerRimGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Apex top peak
    shape.moveTo(0, 2.3);
    // Right wing diagonal & flare
    shape.lineTo(1.15, 0.2);
    shape.bezierCurveTo(1.35, -0.4, 1.25, -0.9, 0.95, -1.25);
    shape.bezierCurveTo(0.7, -1.45, 0.4, -1.52, 0.15, -1.54);
    // Stem notch right
    shape.lineTo(0.12, -1.9);
    shape.lineTo(-0.12, -1.9);
    // Stem notch left
    shape.lineTo(-0.15, -1.54);
    // Left wing diagonal & flare
    shape.bezierCurveTo(-0.4, -1.52, -0.7, -1.45, -0.95, -1.25);
    shape.bezierCurveTo(-1.25, -0.9, -1.35, -0.4, -1.15, 0.2);
    shape.lineTo(0, 2.3);

    // Inner Cutout Hole for the Filigree Relief to sit inside
    const hole = new THREE.Path();
    hole.moveTo(0, 2.18);
    hole.lineTo(-1.05, 0.18);
    hole.bezierCurveTo(-1.22, -0.38, -1.12, -0.82, -0.86, -1.15);
    hole.bezierCurveTo(-0.62, -1.35, -0.35, -1.42, -0.1, -1.44);
    hole.lineTo(0.1, -1.44);
    hole.bezierCurveTo(0.35, -1.42, 0.62, -1.35, 0.86, -1.15);
    hole.bezierCurveTo(1.12, -0.82, 1.22, -0.38, 1.05, 0.18);
    hole.lineTo(0, 2.18);

    shape.holes.push(hole);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.05,
    });
  }, []);

  return (
    <Float speed={1.9} rotationIntensity={0.35} floatIntensity={0.6} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        {/* === LAYER 1: SOLID 3D GOLD BEVELED RIM FRAME === */}
        <mesh position={[0, 0, -0.06]} geometry={outerRimGeometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#ffd700"
            metalness={0.95}
            roughness={0.16}
            clearcoat={0.9}
            clearcoatRoughness={0.12}
          />
        </mesh>

        {/* === LAYER 2: FRONT FILIGREE TATAHAN LOGAM EMAS 3D (PERFORATED GOLD) === */}
        <mesh position={[0, 0.22, 0.055]} castShadow receiveShadow>
          <planeGeometry args={[width, height, 64, 64]} />
          <meshPhysicalMaterial
            map={goldTexture}
            bumpMap={bumpTexture}
            bumpScale={0.09}
            color="#ffffff"
            metalness={0.94}
            roughness={0.2}
            clearcoat={0.7}
            clearcoatRoughness={0.15}
            transparent={true}
            alphaTest={0.08}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* === LAYER 3: BACK FILIGREE TATAHAN LOGAM EMAS 3D (REVERSE PLATE) === */}
        <mesh position={[0, 0.22, -0.055]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
          <planeGeometry args={[width, height, 64, 64]} />
          <meshPhysicalMaterial
            map={goldTexture}
            bumpMap={bumpTexture}
            bumpScale={0.09}
            color="#ffffff"
            metalness={0.94}
            roughness={0.2}
            clearcoat={0.7}
            clearcoatRoughness={0.15}
            transparent={true}
            alphaTest={0.08}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* === LAYER 4: INNER SHADOW/DEPTH CORE STRUT (THICKNESS ACCENT) === */}
        <mesh position={[0, 0.22, 0]}>
          <planeGeometry args={[width * 0.96, height * 0.96]} />
          <meshBasicMaterial
            map={goldTexture}
            color="#7a5c18"
            transparent={true}
            alphaTest={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* === LAYER 5: 3D SOLID CENTRAL CEMPURIT (HANDLE & SPINE) === */}
        {/* Central Vertical Spine Running Down The Middle */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.024, 0.032, 4.2, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Lower Cempurit Handle (Pegangan Bubut Kuningan) */}
        <mesh position={[0, -2.4, 0]} castShadow>
          <cylinderGeometry args={[0.058, 0.038, 1.8, 24]} />
          <meshPhysicalMaterial
            color="#e5b838"
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.8}
          />
        </mesh>

        {/* Knurled Grip Rings along the Cempurit Handle */}
        {[-1.8, -2.1, -2.4, -2.7, -3.0].map((ry, idx) => (
          <mesh key={idx} position={[0, ry, 0]}>
            <torusGeometry args={[0.068, 0.016, 12, 24]} />
            <meshStandardMaterial color="#ffd700" metalness={0.96} roughness={0.12} />
          </mesh>
        ))}

        {/* Pointed Brass Conical Tip at the Base */}
        <mesh position={[0, -3.38, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.038, 0.16, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* Sacred Apex Surya Finial Crown */}
        <mesh position={[0, 2.38, 0]} castShadow>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#fff0a0" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* === LAYER 6: INNER SACRED GOLDEN LIGHT GLOW === */}
        {/* Soft Golden Backlight Passing Through The Perforations */}
        <pointLight color="#ffcc33" intensity={2.8} distance={3.5} decay={2} position={[0, 0.2, 0]} />
      </group>
    </Float>
  );
}

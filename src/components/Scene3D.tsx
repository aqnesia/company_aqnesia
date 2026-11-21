"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import WayangGununganSculpture3D from "@/components/WayangGununganSculpture3D";
import BunrakuDoll3D from "@/components/BunrakuDoll3D";
import TaiwanLantern3D from "@/components/TaiwanLantern3D";
import TriFlagAllianceTriangle from "@/components/TriFlagAllianceTriangle";

// Reusable standard model loader
function ModelObject({
  url,
  position,
  scale = 1,
  rotation = [0, 0, 0],
}: {
  url: string;
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.28;
          mat.metalness = 0.2;
        }
      }
    });
  }, [scene]);

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      <group ref={meshRef} position={position} scale={scale} rotation={rotation}>
        <primitive object={scene.clone()} />
      </group>
    </Float>
  );
}

// Opsi A: Monolit 3D Kaca Akrilik Bendera Negara
function NationalFlagMonolith({
  textureUrl,
  position,
  scale = 1,
  rotation = [0, 0, 0],
  edgeColor = "#ffffff",
}: {
  textureUrl: string;
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  edgeColor?: string;
}) {
  const texture = useTexture(textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        {/* Front Flag Emblem Face (Exact 3:2 aspect ratio) */}
        <mesh position={[0, 0, 0.102]}>
          <planeGeometry args={[3.0, 2.0]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* Back Flag Emblem Face */}
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

        {/* Luminous Edge Accent Lines */}
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(3.09, 2.09, 0.205)]} />
          <lineBasicMaterial color={edgeColor} linewidth={1.5} opacity={0.65} transparent />
        </lineSegments>
      </group>
    </Float>
  );
}

// Exact Waypoints: Hero (0) -> Indonesia (1) -> Japan (2) -> Taiwan (3) -> Segitiga 3 Bendera Berputar (4)
const WAYPOINTS = [
  { pos: new THREE.Vector3(2.093, -4.505, 44.601), lookAt: new THREE.Vector3(0, -3, 30) }, // 0: Hero Wayang
  { pos: new THREE.Vector3(-1.0, 4.6, 29.5), lookAt: new THREE.Vector3(-1.0, 4.8, 15) },    // 1: Indonesia
  { pos: new THREE.Vector3(-1.3, 10.8, 18.0), lookAt: new THREE.Vector3(-1.3, 11.0, 5) },   // 2: Japan
  { pos: new THREE.Vector3(4.0, 22.4, 7.0), lookAt: new THREE.Vector3(4.0, 22.6, -5) },     // 3: Taiwan
  { pos: new THREE.Vector3(4.0, 23.2, 9.5), lookAt: new THREE.Vector3(4.0, 23.2, -3) },     // 4: Segitiga 3 Bendera Berputar
];

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const currentPos = useRef(new THREE.Vector3().copy(WAYPOINTS[0].pos));
  const currentLookAt = useRef(new THREE.Vector3().copy(WAYPOINTS[0].lookAt));

  useFrame((state) => {
    // Map scrollProgress (0 to 1) ke 4 stop dengan dwell zone pas di tengah
    let scaled = 0;
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    if (p <= 0.08) {
      scaled = 0;
    } else if (p <= 0.20) {
      scaled = THREE.MathUtils.smoothstep(p, 0.08, 0.20) * 1.0;
    } else if (p <= 0.32) {
      scaled = 1.0; // Mengunci stabil di Indonesia
    } else if (p <= 0.46) {
      scaled = 1.0 + THREE.MathUtils.smoothstep(p, 0.32, 0.46) * 1.0;
    } else if (p <= 0.58) {
      scaled = 2.0; // Mengunci stabil di Jepang
    } else if (p <= 0.72) {
      scaled = 2.0 + THREE.MathUtils.smoothstep(p, 0.58, 0.72) * 1.0;
    } else if (p <= 0.82) {
      scaled = 3.0; // Mengunci stabil di Taiwan
    } else if (p <= 0.92) {
      scaled = 3.0 + THREE.MathUtils.smoothstep(p, 0.82, 0.92) * 1.0;
    } else {
      scaled = 4.0; // Mengunci stabil di Segitiga 3 Bendera Berputar
    }

    const totalSegments = WAYPOINTS.length - 1;
    const index = Math.min(Math.floor(scaled), totalSegments - 1);
    const segmentT = scaled - index;

    const pA = WAYPOINTS[index].pos;
    const pB = WAYPOINTS[index + 1].pos;
    const lA = WAYPOINTS[index].lookAt;
    const lB = WAYPOINTS[index + 1].lookAt;

    // Smooth target position
    const targetPos = new THREE.Vector3().lerpVectors(pA, pB, segmentT);
    const targetLookAt = new THREE.Vector3().lerpVectors(lA, lB, segmentT);

    // Subtle pointer parallax
    targetPos.x += state.pointer.x * 0.35;
    targetPos.y += state.pointer.y * 0.35;

    // Damped camera flight
    currentPos.current.lerp(targetPos, 0.06);
    currentLookAt.current.lerp(targetLookAt, 0.06);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function Scene3D({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [2.093, -4.505, 44.601], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <CameraController scrollProgress={scrollProgress} />

        <ambientLight intensity={1.6} />
        <directionalLight position={[10, 20, 15]} intensity={2.5} />
        <pointLight position={[-10, 0, 20]} intensity={1.5} color="#ffffff" />
        <spotLight position={[20, 30, 20]} angle={0.5} penumbra={1} intensity={2} />

        <Suspense fallback={null}>
          {/* Waypoint 0 (Hero): Wayang Gunungan */}
          <WayangGununganSculpture3D
            position={[2.2, -4.2, 33]}
            scale={1.05}
            rotation={[0.1, -0.38, 0.05]}
          />

          {/* 1. INDONESIA 🇮🇩: Pas di tengah center & utuh di atas card */}
          <NationalFlagMonolith
            textureUrl="/emblems/indonesia.png"
            position={[-1.0, 5.0, 18]}
            scale={1.2}
            rotation={[0.08, 0.35, 0]}
            edgeColor="#ed1c24"
          />

          {/* 2. JEPANG 🇯🇵: Bendera & Bunraku pas di tengah center berdampingan */}
          <NationalFlagMonolith
            textureUrl="/emblems/japan.png"
            position={[-2.3, 11.2, 8]}
            scale={1.15}
            rotation={[0.12, 0.5, -0.05]}
            edgeColor="#bc002d"
          />
          <BunrakuDoll3D
            position={[-0.3, 11.0, 8]}
            scale={0.95}
            rotation={[0.06, -0.35, 0.03]}
          />

          {/* TRANSISI: Lampion 3D Melayang Mandiri di Tengah Jarak antara Jepang & Taiwan */}
          <TaiwanLantern3D
            position={[1.35, 17.0, 2.5]}
            scale={0.95}
            rotation={[0.05, 0.25, 0]}
          />

          {/* 3. TAIWAN 🇹🇼: Bendera Taiwan Pas di Tengah Center (Mandiri sebelum formasi segitiga) */}
          <group visible={scrollProgress < 0.88}>
            <NationalFlagMonolith
              textureUrl="/emblems/taiwan.png"
              position={[4.0, 22.8, -3]}
              scale={1.2}
              rotation={[-0.08, 0.4, 0]}
              edgeColor="#000095"
            />
          </group>

          {/* 4. KLIMAKS: Segitiga 3 Bendera Berputar Pelan di 3 Titik (Tri-Alliance Indonesia, Jepang, Taiwan) */}
          <TriFlagAllianceTriangle
            position={[4.0, 23.2, -3]}
            scrollProgress={scrollProgress}
          />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

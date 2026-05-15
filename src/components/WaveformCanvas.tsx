"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useWaveformStore } from "@/store/useWaveformStore";

const CYAN = new THREE.Color("#00E5CC");
const BASE_EMISSIVE = 0.4;

function WaveformModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/wave.glb");
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Clone scene so the cached GLTF isn't mutated
  const clonedScene = useRef<THREE.Group | null>(null);
  if (!clonedScene.current) {
    clonedScene.current = scene.clone(true);
    // Apply material to every mesh in the clone
    clonedScene.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: CYAN,
          emissive: CYAN,
          emissiveIntensity: BASE_EMISSIVE,
          metalness: 0.7,
          roughness: 0.2,
        });
      }
    });
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    const { scale, emissiveIntensity } = useWaveformStore.getState();
    if (!groupRef.current || !clonedScene.current) return;

    // Slow Y rotation
    groupRef.current.rotation.y += 0.003;

    // Lerp scale toward store value
    const s = groupRef.current.scale;
    s.setScalar(THREE.MathUtils.lerp(s.x, scale, 0.08));

    // Lerp emissive on all meshes
    const targetEmissive = BASE_EMISSIVE + emissiveIntensity;
    clonedScene.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, 0.1);
      }
    });

    // Mouse parallax on camera
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 0.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseRef.current.y * 0.3, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene.current} />
    </group>
  );
}

export function WaveformCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-3, -2, 2]} intensity={0.5} color="#00E5CC" />
        <Environment preset="city" />
        <WaveformModel />
      </Canvas>
    </div>
  );
}

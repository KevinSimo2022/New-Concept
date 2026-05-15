"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useWaveformStore } from "@/store/useWaveformStore";

const CYAN = "#00E5CC";

function WaveformModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/wave.glb");
  const { camera } = useThree();

  const mouseRef = useRef({ x: 0, y: 0 });
  const targetCamRef = useRef({ x: 0, y: 0 });

  // Apply material to all meshes once
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: CYAN,
          metalness: 0.8,
          roughness: 0.2,
          emissive: new THREE.Color(CYAN),
          emissiveIntensity: 0,
        });
      }
    });
  }, [scene]);

  // Track mouse
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

    if (!groupRef.current) return;

    // Y rotation
    groupRef.current.rotation.y += 0.003;

    // Scale
    const s = groupRef.current.scale;
    s.x = THREE.MathUtils.lerp(s.x, scale, 0.08);
    s.y = THREE.MathUtils.lerp(s.y, scale, 0.08);
    s.z = THREE.MathUtils.lerp(s.z, scale, 0.08);

    // Emissive intensity
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          emissiveIntensity,
          0.1
        );
      }
    });

    // Mouse parallax — camera lerp
    targetCamRef.current.x = mouseRef.current.x * 0.5;
    targetCamRef.current.y = mouseRef.current.y * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamRef.current.x, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamRef.current.y, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return <primitive ref={groupRef} object={scene} />;
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <WaveformModel />
      </Canvas>
    </div>
  );
}


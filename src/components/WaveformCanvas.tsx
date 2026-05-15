"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useWaveformStore } from "@/store/useWaveformStore";

const CYAN = new THREE.Color("#00E5CC");
const BASE_EMISSIVE = 0.35;

function WaveformModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/waveform.glb");
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  const clonedScene = useRef<THREE.Group | null>(null);
  if (!clonedScene.current) {
    clonedScene.current = scene.clone(true);
    clonedScene.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: CYAN,
          emissive: CYAN,
          emissiveIntensity: BASE_EMISSIVE,
          metalness: 0.8,
          roughness: 0.15,
          envMapIntensity: 1.5,
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

    groupRef.current.rotation.y += 0.003;

    const s = groupRef.current.scale;
    s.setScalar(THREE.MathUtils.lerp(s.x, scale, 0.08));

    clonedScene.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          BASE_EMISSIVE + emissiveIntensity,
          0.1
        );
      }
    });

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
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lights — bright enough to actually see the model */}
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-4, -2, 3]} intensity={1.5} color="#00E5CC" />
        <pointLight position={[0, 0, 3]} intensity={3} color="#00E5CC" distance={8} />
        <pointLight position={[2, 2, 2]} intensity={1.5} color="#ffffff" />
        {/* Environment gives PBR reflections that make metallic surfaces pop */}
        <Environment preset="city" />
        <WaveformModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/waveform.glb");

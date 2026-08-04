import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Sun() {
  const sun = useRef();

  useFrame((state) => {
    if (!sun.current) return;

    sun.current.rotation.y =
      state.clock.elapsedTime * 0.05;
  });

  return (
    <group position={[90, 40, -420]}>
      {/* Sun */}
      <mesh ref={sun}>
        <sphereGeometry args={[22, 128, 128]} />
        <meshBasicMaterial color="#ffd36b" />
      </mesh>

      {/* Glow */}
      <mesh scale={1.35}>
        <sphereGeometry args={[22, 64, 64]} />
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Large Aura */}
      <mesh scale={2.5}>
        <sphereGeometry args={[22, 64, 64]} />
        <meshBasicMaterial
          color="#ff8c42"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight
        intensity={12}
        distance={900}
        color="#ffcf6b"
      />
    </group>
  );
}
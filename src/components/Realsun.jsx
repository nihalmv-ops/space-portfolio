import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function RealSun() {
  const sun = useRef();

  const texture = useTexture("/textures/sun.jpg");

  useFrame((state) => {
    if (sun.current) {
      sun.current.rotation.y =
        state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group position={[0, 0, -460]}>
      {/* Main Sun */}
      <mesh ref={sun}>
        <sphereGeometry args={[28, 128, 128]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Glow Layer 1 */}
      <mesh scale={1.18}>
        <sphereGeometry args={[28, 64, 64]} />
        <meshBasicMaterial
          color="#ffdd66"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Glow Layer 2 */}
      <mesh scale={1.35}>
        <sphereGeometry args={[28, 64, 64]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Glow Layer 3 */}
      <mesh scale={1.55}>
        <sphereGeometry args={[28, 64, 64]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Light */}
      <pointLight
        color="#ffcc55"
        intensity={14}
        distance={700}
        decay={2}
      />
    </group>
  );
}
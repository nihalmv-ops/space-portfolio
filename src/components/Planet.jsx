import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Planet({
  position,
  size,
  texture,
  ringTexture = null,
  ringed = false,
  rotationSpeed = 0.05,
}) {
  const ref = useRef();

  const planetTexture = useTexture(texture);
  const ringMap = ringTexture ? useTexture(ringTexture) : null;

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y =
        state.clock.getElapsedTime() * rotationSpeed;
    }
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.08}
      floatIntensity={0.5}
    >
      <group position={position}>
        {/* Planet */}
        <mesh ref={ref} scale={size}>
          <sphereGeometry args={[1, 128, 128]} />
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.9}
            metalness={0.02}
          />
        </mesh>

        {/* Atmosphere */}
        <mesh scale={size * 1.03}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial
            color="#88ccff"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Ring */}
        {ringed && ringMap && (
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <ringGeometry
              args={[size * 1.55, size * 2.45, 128]}
            />
            <meshStandardMaterial
              map={ringMap}
              transparent
              opacity={0.95}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}
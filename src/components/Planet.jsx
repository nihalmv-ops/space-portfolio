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
      rotationIntensity={0.15}
      floatIntensity={0.6}
    >
      <group position={position}>
        <mesh ref={ref} scale={size}>
          <sphereGeometry args={[1, 128, 128]} />
          <meshStandardMaterial
            map={planetTexture}
            roughness={0.85}
            metalness={0.02}
          />
        </mesh>

        {ringed && ringMap && (
          <mesh rotation={[Math.PI / 2.35, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 2.4, 128]} />
            <meshStandardMaterial
              map={ringMap}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}
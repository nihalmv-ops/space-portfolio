import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { DoubleSide } from "three";
import { useSafeTexture } from "./hooks/useSafeTexture";

export default function Planet({
  position,
  size,
  color = "#888888",
  texturePath = null,
  ringed = false,
  rotationSpeed = 0.05,
}) {
  const ref = useRef();
  const texture = useSafeTexture(texturePath);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.4}>
      <group position={position}>
        <mesh ref={ref} scale={size}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={texture ?? undefined}
            color={texture ? "#ffffff" : color}
            roughness={0.75}
            metalness={0.15}
          />
        </mesh>

        {ringed && (
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 2.3, 64]} />
            <meshStandardMaterial
              color="#d8c9a3"
              side={DoubleSide}
              transparent
              opacity={0.6}
              roughness={0.9}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}
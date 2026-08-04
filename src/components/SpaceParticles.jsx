import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SpaceParticles() {
  const points = useRef();

  const particles = useMemo(() => {
    const count = 12000;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 700;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 700;
      positions[i * 3 + 2] = -Math.random() * 1000;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y =
      state.clock.elapsedTime * 0.0015;

    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.8}
        color="#cfd8ff"
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}
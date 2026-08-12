import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function DeepSpace() {
  const stars = useRef();

  const positions = useMemo(() => {
    const count = 100;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Very wide empty universe
      array[i * 3] =
        (Math.random() - 0.5) * 7000;

      array[i * 3 + 1] =
        (Math.random() - 0.5) * 7000;

      // Very deep distance
      array[i * 3 + 2] =
        -1000 - Math.random() * 7000;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!stars.current) return;

    // Extremely slow movement
    stars.current.rotation.y =
      state.clock.elapsedTime * 0.0001;
  });

  return (
    <points ref={stars}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.10}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
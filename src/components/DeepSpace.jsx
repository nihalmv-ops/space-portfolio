import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function DeepSpace() {
  const stars = useRef();

  const positions = useMemo(() => {
    const count = 900;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread stars over a huge area
      array[i * 3] = (Math.random() - 0.5) * 6000;
      array[i * 3 + 1] = (Math.random() - 0.5) * 6000;

      // Very far behind the Sun
      array[i * 3 + 2] = -800 - Math.random() * 6000;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!stars.current) return;

    // Very slow rotation
    stars.current.rotation.y = state.clock.elapsedTime * 0.0003;
  });

  return (
    <points ref={stars}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.18}
        transparent
        opacity={0.95}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
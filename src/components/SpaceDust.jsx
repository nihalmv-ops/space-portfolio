import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SpaceDust() {
  const points = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(6000 * 3);

    for (let i = 0; i < 6000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 400;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 400;
      arr[i * 3 + 2] = -Math.random() * 600;
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y =
        state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.25}
        transparent
        opacity={0.35}
        color="#cbd5ff"
      />
    </points>
  );
}
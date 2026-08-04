import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DeepSpace() {

  const stars = useRef();

  const positions = useMemo(() => {

    const count = 4000;

    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

      array[i * 3] = (Math.random() - 0.5) * 800;

      array[i * 3 + 1] = (Math.random() - 0.5) * 800;

      // Very far behind the sun
      array[i * 3 + 2] = -900 - Math.random() * 1800;
    }

    return array;

  }, []);

  useFrame((state) => {

    if (!stars.current) return;

    stars.current.rotation.y =
      state.clock.elapsedTime * 0.0004;

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
        size={0.8}
        transparent
        opacity={0.9}
        depthWrite={false}
      />

    </points>

  );

}
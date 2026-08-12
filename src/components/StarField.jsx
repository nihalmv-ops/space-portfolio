import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function StarField() {
  const pointsRef = useRef();

  const { positions, colors, sizes } = useMemo(() => {
    const COUNT = 100000;

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#e6dbdb"),
      new THREE.Color("#ece6e6"),
      new THREE.Color("#fde68a"),
      new THREE.Color("#f2f2f2"),
    ];

    for (let i = 0; i < COUNT; i++) {
      const radius = 250 + Math.random() * 900;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] =
        radius * Math.sin(phi) * Math.cos(theta);

      positions[i * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3 + 2] =
        radius * Math.cos(phi);

      const c =
        palette[Math.floor(Math.random() * palette.length)];

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return {
      positions,
      colors,
      sizes,
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y =
      state.clock.elapsedTime * 0.002;

    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={1.2}
        sizeAttenuation
        transparent
        opacity={1}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
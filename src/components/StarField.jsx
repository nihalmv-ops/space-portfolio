import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color } from "three";

export default function StarField() {
  const points = useRef();

  const { positions, colors, sizes } = useMemo(() => {
    const COUNT = 50000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const palette = [
      new Color("#ffffff"),
      new Color("#dbeafe"),
      new Color("#93c5fd"),
      new Color("#fde68a"),
      new Color("#f8fafc"),
    ];

    for (let i = 0; i < COUNT; i++) {
      const radius = 250 + Math.random() * 700;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 0.4;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.002;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.02;
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
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.4}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        vertexColors
        blending={AdditiveBlending}
      />
    </points>
  );
}
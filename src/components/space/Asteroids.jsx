import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Asteroid({ position, scale, rotation }) {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.x += rotation.x;
    ref.current.rotation.y += rotation.y;
    ref.current.rotation.z += rotation.z;
  });

  return (
    <Float
      speed={0.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <mesh
        ref={ref}
        position={position}
        scale={scale}
      >
        <icosahedronGeometry args={[1, 1]} />

        <meshStandardMaterial
          color="#666666"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </Float>
  );
}

export default function Asteroids() {
  const asteroids = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 250; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 250,
          (Math.random() - 0.5) * 150,
          -Math.random() * 600,
        ],
        scale: Math.random() * 0.6 + 0.15,
        rotation: {
          x: Math.random() * 0.01,
          y: Math.random() * 0.01,
          z: Math.random() * 0.01,
        },
      });
    }

    return arr;
  }, []);

  return (
    <>
      {asteroids.map((asteroid, index) => (
        <Asteroid
          key={index}
          {...asteroid}
        />
      ))}
    </>
  );
}


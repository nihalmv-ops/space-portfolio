import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function NebulaBackground() {
  const milkyWay = useTexture("/textures/milkyway_8k.jpg");
  const nebula1 = useTexture("/textures/nebula_01.png");
  const nebula2 = useTexture("/textures/nebula_02.png");

  const galaxy = useRef();
  const cloud1 = useRef();
  const cloud2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (galaxy.current) {
      galaxy.current.rotation.z = t * 0.003;
    }

    if (cloud1.current) {
      cloud1.current.rotation.z = -t * 0.006;
      cloud1.current.material.opacity =
        0.35 + Math.sin(t * 0.2) * 0.05;
    }

    if (cloud2.current) {
      cloud2.current.rotation.z = t * 0.004;
      cloud2.current.material.opacity =
        0.28 + Math.cos(t * 0.25) * 0.05;
    }
  });

  return (
    <>
      {/* Milky Way */}
      <mesh ref={galaxy} position={[0, 0, -180]}>
        <planeGeometry args={[900, 900]} />
        <meshBasicMaterial
          map={milkyWay}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Purple Nebula */}
      <mesh ref={cloud1} position={[-80, 40, -160]}>
        <planeGeometry args={[320, 320]} />
        <meshBasicMaterial
          map={nebula1}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Blue Nebula */}
      <mesh ref={cloud2} position={[90, -60, -170]}>
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial
          map={nebula2}
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
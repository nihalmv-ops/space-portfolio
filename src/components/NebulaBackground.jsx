import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import { scrollState } from "./SmoothScroll";

export default function NebulaBackground() {
  const milkyWay = useTexture("/textures/milkyway.jpg");
  const nebula1 = useTexture("/textures/nebula1.png");
  const nebula2 = useTexture("/textures/nebula2.png");

  const galaxyRef = useRef();
  const nebula1Ref = useRef();
  const nebula2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (galaxyRef.current) {
      galaxyRef.current.rotation.z = t * 0.002;
    }

    if (nebula1Ref.current) {
      nebula1Ref.current.rotation.z = -t * 0.005;
      nebula1Ref.current.material.opacity =
        0.35 + Math.sin(t * 0.3) * 0.05;
    }

    if (nebula2Ref.current) {
      nebula2Ref.current.rotation.z = t * 0.004;
      nebula2Ref.current.material.opacity =
        0.30 + Math.cos(t * 0.25) * 0.05;
    }
  });

  return (
    <>
      {/* Milky Way */}
      <mesh ref={galaxyRef} position={[0, 0, -500]}>
        <planeGeometry args={[1800, 1800]} />
        <meshBasicMaterial
          map={milkyWay}
          transparent
          side={DoubleSide}
        />
      </mesh>

      {/* Purple Nebula */}
      <mesh ref={nebula1Ref} position={[-180, 80, -420]}>
        <planeGeometry args={[650, 650]} />
        <meshBasicMaterial
          map={nebula1}
          transparent
          opacity={0.35}
          side={DoubleSide}
        />
      </mesh>

      {/* Blue Nebula */}
      <mesh ref={nebula2Ref} position={[200, -120, -430]}>
        <planeGeometry args={[600, 600]} />
        <meshBasicMaterial
          map={nebula2}
          transparent
          opacity={0.30}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
}
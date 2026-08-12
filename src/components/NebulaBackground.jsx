import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

export default function NebulaBackground() {
  const nebula1 = useTexture("/textures/nebula1.png");
  const nebula2 = useTexture("/textures/nebula2.png");
  const nebula3 = useTexture("/textures/nebula3.png");

  const nebula1Ref = useRef(null);
  const nebula2Ref = useRef(null);
  const nebula3Ref = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Dark Purple Nebula
    if (nebula1Ref.current) {
      nebula1Ref.current.rotation.z = -t * 0.002;

      nebula1Ref.current.material.opacity =
        0.16 + Math.sin(t * 0.2) * 0.025;
    }

    // Dark Blue Nebula
    if (nebula2Ref.current) {
      nebula2Ref.current.rotation.z = t * 0.0018;

      nebula2Ref.current.material.opacity =
        0.12 + Math.cos(t * 0.18) * 0.02;
    }

    // Very subtle background nebula
    if (nebula3Ref.current) {
      nebula3Ref.current.rotation.z = -t * 0.0015;

      nebula3Ref.current.material.opacity =
        0.10 + Math.sin(t * 0.15) * 0.015;
    }
  });

  return (
    <>
      {/* =================================
          DARK PURPLE NEBULA
      ================================= */}
      <mesh
        ref={nebula1Ref}
        position={[-180, 80, -420]}
      >
        <planeGeometry args={[650, 650]} />

        <meshBasicMaterial
          map={nebula1}
          transparent
          opacity={0.16}
          side={DoubleSide}
          depthWrite={false}
          blending={2}
        />
      </mesh>

      {/* =================================
          DARK BLUE NEBULA
      ================================= */}
      <mesh
        ref={nebula2Ref}
        position={[200, -120, -430]}
      >
        <planeGeometry args={[800, 800]} />

        <meshBasicMaterial
          map={nebula2}
          transparent
          opacity={0.12}
          side={DoubleSide}
          depthWrite={false}
          blending={2}
        />
      </mesh>

      {/* =================================
          VERY DARK DISTANT NEBULA
      ================================= */}
      <mesh
        ref={nebula3Ref}
        position={[200, 120, -440]}
      >
        <planeGeometry args={[600, 600]} />

        <meshBasicMaterial
          map={nebula3}
          transparent
          opacity={0.10}
          side={DoubleSide}
          depthWrite={false}
          blending={2}
        />
      </mesh>
    </>
  );
}

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

export default function NebulaBackground() {
  // Load nebula textures
  const nebula1 = useTexture("/textures/nebula1.png");
  const nebula2 = useTexture("/textures/nebula2.png");
  const nebula3 = useTexture("/textures/nebula3.png");

  // Mesh refs
  const nebula1Ref = useRef(null);
  const nebula2Ref = useRef(null);
  const nebula3Ref = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Purple Nebula
    if (nebula1Ref.current) {
      nebula1Ref.current.rotation.z = -t * 0.005;

      nebula1Ref.current.material.opacity =
        0.35 + Math.sin(t * 0.3) * 0.05;
    }

    // Blue Nebula
    if (nebula2Ref.current) {
      nebula2Ref.current.rotation.z = t * 0.004;

      nebula2Ref.current.material.opacity =
        0.30 + Math.cos(t * 0.25) * 0.05;
    }

    // Third Nebula
    if (nebula3Ref.current) {
      nebula3Ref.current.rotation.z = t * 0.004;

      nebula3Ref.current.material.opacity =
        0.30 + Math.cos(t * 0.25) * 0.05;
    }
  });

  return (
    <>
      {/* Purple Nebula */}
      <mesh
        ref={nebula1Ref}
        position={[-180, 80, -420]}
      >
        <planeGeometry args={[650, 650]} />

        <meshBasicMaterial
          map={nebula1}
          transparent
          opacity={0.35}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Blue Nebula */}
      <mesh
        ref={nebula2Ref}
        position={[200, -120, -430]}
      >
        <planeGeometry args={[800, 800]} />

        <meshBasicMaterial
          map={nebula2}
          transparent
          opacity={0.30}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Third Nebula */}
      <mesh
        ref={nebula3Ref}
        position={[200, 120, -430]}
      >
        <planeGeometry args={[600, 600]} />

        <meshBasicMaterial
          map={nebula3}
          transparent
          opacity={0.30}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}


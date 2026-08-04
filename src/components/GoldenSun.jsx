import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./SmoothScroll";

export default function GoldenSun() {
  const group = useRef();
  const sun = useRef();
  const glow = useRef();

  const sunTexture = useTexture("/textures/sun.jpg");
  const corona = useTexture("/textures/sun_corona.png");
  const flare = useTexture("/textures/lensflare.png");

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Rotate Sun
    if (sun.current) {
      sun.current.rotation.y += 0.0008;
    }

    // Animate Corona
    if (glow.current) {
      glow.current.rotation.z = t * 0.05;
      glow.current.material.opacity =
        0.75 + Math.sin(t * 2) * 0.08;
    }

    // Fade Sun near end of scroll
    const p = scrollState.progress;

    let opacity = 1;

    if (p > 0.82) {
      opacity = 1 - (p - 0.82) / 0.18;
    }

    opacity = Math.max(0, Math.min(1, opacity));

    if (sun.current) {
      sun.current.material.transparent = true;
      sun.current.material.opacity = opacity;
    }

    if (glow.current) {
      glow.current.material.opacity = opacity * 0.8;
    }
  });

  return (
    <group ref={group} position={[0, 0, -650]}>
      {/* Sun */}
      <mesh ref={sun}>
        <sphereGeometry args={[40, 128, 128]} />
        <meshBasicMaterial
          map={sunTexture}
          transparent
        />
      </mesh>

      {/* Corona */}
      <Billboard>
        <mesh ref={glow}>
          <planeGeometry args={[140, 140]} />
          <meshBasicMaterial
            map={corona}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* Lens Flare */}
      <Billboard>
        <mesh>
          <planeGeometry args={[180, 180]} />
          <meshBasicMaterial
            map={flare}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* Sun Light */}
    <pointLight
  position={[0,0,0]}
  intensity={120}
  distance={1500}
  color="#ffcc55"
/>
    </group>
  );
}
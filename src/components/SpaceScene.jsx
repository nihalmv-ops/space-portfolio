import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import { useEffect, useRef } from "react";

import NebulaBackground from "./NebulaBackground";
import StarField from "./StarField";
import PlanetField from "./PlanetField";
import ScrollCamera from "./ScrollCamera";

import SpaceAudio from "./SpaceAudio";
import MeteorField from "./MeteorField";
import SpaceDust from "./SpaceDust";
import Asteroids from "./space/Asteroids";
import SpaceParticles from "./SpaceParticles";
import ShootingStars from "./ShootingStars";
import WarpStars from "./WarpStars";
import CameraShake from "./CameraShake";
import GalaxyGlow from "./GalaxyGlow";

import GoldenSun from "./GoldenSun";
import DeepSpace from "./DeepSpace";
import SpaceFade from "./SpaceFade";


/* =========================================
   CINEMATIC UNIVERSE TRANSITION
========================================= */

function UniverseTransition() {
  const { camera } = useThree();

  const active = useRef(false);
  const progress = useRef(0);

  useEffect(() => {
    const start = () => {
      active.current = true;
      progress.current = 0;
    };

    window.addEventListener("universe-start", start);

    return () => {
      window.removeEventListener("universe-start", start);
    };
  }, []);

  useFrame((_, delta) => {
    if (!active.current) return;

    progress.current += delta;

    const p = Math.min(progress.current / 1.2, 1);

    // Smooth cinematic acceleration
    const ease = p * p * p;

    // Forward movement
    camera.position.z -= ease * 8;

    // Small cinematic movement
    camera.position.x +=
      Math.sin(progress.current * 30) *
      0.015 *
      ease;

    camera.position.y +=
      Math.cos(progress.current * 25) *
      0.012 *
      ease;

    // Small rotation
    camera.rotation.z =
      Math.sin(progress.current * 5) *
      0.003 *
      ease;

    if (p >= 1) {
      active.current = false;
      camera.rotation.z = 0;
    }
  });

  return null;
}


/* =========================================
   SPACE SCENE
========================================= */

export default function SpaceScene() {
  return (
    <div className="canvas-fixed">

      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 48,
          near: 0.1,
          far: 8000,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >

        {/* =================================
            DARK UNIVERSE BACKGROUND
        ================================= */}

        <color
          attach="background"
          args={["#020204"]}
        />

        <fogExp2
          attach="fog"
          args={["#020204", 0.0018]}
        />


        {/* =================================
            VERY SUBTLE LIGHTING
        ================================= */}

        <ambientLight intensity={0.025} />

        <directionalLight
          position={[40, 30, 25]}
          intensity={0.45}
          color="#7c6ac7"
        />

        {/* Distant golden light for Sun */}
        <pointLight
          position={[90, 40, -420]}
          intensity={5}
          distance={1500}
          color="#ffcc66"
        />

        {/* Very subtle blue fill */}
        <pointLight
          position={[-70, -30, -220]}
          intensity={0.25}
          distance={900}
          color="#4f8fff"
        />


        {/* =================================
            ENVIRONMENT
        ================================= */}

        <Environment preset="night" />


        {/* =================================
            DARK NEBULA
        ================================= */}

        <NebulaBackground />

        <GalaxyGlow />


        {/* =================================
            DISTANT STARS
        ================================= */}

        <StarField />

        <WarpStars />


        {/* =================================
            SPACE PARTICLES
        ================================= */}

        <SpaceParticles />

        <SpaceDust />

        <MeteorField />

        <ShootingStars />


        {/* =================================
            PLANETS + ASTEROIDS
        ================================= */}

        <PlanetField />

        <Asteroids />


        {/* =================================
            SCROLL CAMERA
        ================================= */}

        <ScrollCamera />


        {/* =================================
            START TRANSITION
        ================================= */}

        <UniverseTransition />


        {/* =================================
            GOLDEN SUN
        ================================= */}

        <GoldenSun />


        {/* =================================
            DEEP EMPTY UNIVERSE
        ================================= */}

        <DeepSpace />

        <SpaceFade />


        {/* =================================
            VERY SUBTLE CAMERA SHAKE
        ================================= */}

        <CameraShake />


        {/* =================================
            CINEMATIC BLOOM
        ================================= */}

        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.85}
          />
        </EffectComposer>

      </Canvas>


      {/* =================================
          AUDIO
      ================================= */}

      <SpaceAudio />

    </div>
  );
}
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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

export default function SpaceScene() {
  return (
    <div className="canvas-fixed">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 48,
          near: 0.1,
          far: 3000,
        }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
      >
        {/* =========================
            DARK SPACE FOG
        ========================== */}

        <fogExp2
          attach="fog"
          args={["#020207", 0.0018]}
        />

        {/* =========================
            LIGHTING
        ========================== */}

        <ambientLight intensity={0.04} />

        <directionalLight
          position={[40, 30, 25]}
          intensity={1.2}
          color="#8b7cff"
        />

        <pointLight
          position={[90, 40, -420]}
          intensity={5}
          distance={1000}
          color="#ffcc66"
        />

        {/* =========================
            SPACE BACKGROUND
        ========================== */}

        <NebulaBackground />

        <GalaxyGlow />

        <StarField />

        {/* =========================
            SPACE EFFECTS
        ========================== */}

        <WarpStars />

        <SpaceParticles />

        <SpaceDust />

        <ShootingStars />

        <MeteorField />

        {/* =========================
            PLANETS / ASTEROIDS
        ========================== */}

        <PlanetField />

        <Asteroids />

        {/* =========================
            GOLDEN SUN
        ========================== */}

        <GoldenSun />

        {/* =========================
            DEEP SPACE END
        ========================== */}

        <DeepSpace />

        <SpaceFade />

        {/* =========================
            CAMERA
        ========================== */}

        <ScrollCamera />

        <CameraShake />

        {/* =========================
            BLOOM
        ========================== */}

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.6}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>

      <SpaceAudio />
    </div>
  );
}
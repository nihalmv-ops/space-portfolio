import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
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
  position: [0, 0, -650],
  fov: 48,
  near: 0.1,
  far: 3000,
}}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <fogExp2
  attach="fog"
  args={["#050512", 0.0025]}
/>

    <ambientLight intensity={0.08} />

<directionalLight
  position={[40, 30, 25]}
  intensity={1.8}
  color="#a78bfa"
/>

<pointLight
  position={[90, 40, -420]}
  intensity={8}
  color="#ffcc66"
/>

<pointLight
  position={[-70, -30, -220]}
  intensity={0.7}
  color="#4f8fff"
/>

        <Environment preset="sunset" />
          
       {/* Background */}
<NebulaBackground />
<GalaxyGlow />

{/* Far universe */}
<StarField />
<WarpStars />

{/* Moving particles */}
<SpaceParticles />
<SpaceDust />
<MeteorField />
<ShootingStars />

{/* Objects */}
<PlanetField />
<Asteroids />

{/* Camera */}
<ScrollCamera />

{/* Ending sequence */}
<GoldenSun />
<DeepSpace />
<SpaceFade />

<CameraShake />

<EffectComposer>
  <Bloom
    intensity={3}
    luminanceThreshold={0}
    luminanceSmoothing={0.9}
  />
</EffectComposer>
      </Canvas>

      <SpaceAudio />
    </div>
  );
}
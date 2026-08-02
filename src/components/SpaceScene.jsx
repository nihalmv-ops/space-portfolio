import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import StarField from "./StarField";
import NebulaBackground from "./NebulaBackground";
import PlanetField from "./PlanetField";
import ScrollCamera from "./ScrollCamera";
import SpaceAudio from "./SpaceAudio";
import MeteorField from "./MeteorField";
import SpaceDust from "./SpaceDust";

export default function SpaceScene() {
  return (
    <div className="canvas-fixed">
      <Canvas
        camera={{
          position: [0, 0, 14],
          fov: 55,
          near: 0.1,
          far: 2000,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <fog attach="fog" args={["#02030a", 80, 250]} />

        <ambientLight intensity={0.12} />

        <directionalLight
          position={[30, 20, 15]}
          intensity={1.2}
          color="#9d7dff"
        />

        <pointLight
          position={[-20, 10, 15]}
          intensity={0.8}
          color="#4b7dff"
        />

        <pointLight
          position={[25, -5, -10]}
          intensity={0.4}
          color="#ff66cc"
        />

        <Environment preset="sunset" />

        <NebulaBackground />
        <PlanetField />
        <StarField />
        
        <ScrollCamera />
        <SpaceDust />
        <MeteorField />

        <EffectComposer>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>

      <SpaceAudio />
    </div>
  );
}
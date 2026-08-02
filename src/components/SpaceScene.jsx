import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { scrollState } from "./SmoothScroll";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";
import { AdditiveBlending, Color } from "three";

import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";



const STAR_COUNT = 45000;
const FIELD_DEPTH = 500;
const FIELD_RADIUS = 180;

/* ---------------- Shader star field ---------------- */

const starVertexShader = `
  attribute float aSize;
  attribute float aTwinklePhase;
  uniform float uTime;
  varying float vTwinkle;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vTwinkle = 0.6 + 0.4 * sin(uTime * 2.0 + aTwinklePhase);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    float alpha = smoothstep(0.5, 0.0, dist) * vTwinkle;
    gl_FragColor = vec4(vec3(1.0), alpha);
  }
`;

function StarField() {
  const points = useRef();

  const { positions, colors, sizes } = useMemo(() => {
    const COUNT = 50000;

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const palette = [
      new Color("#ffffff"),
      new Color("#dbeafe"),
      new Color("#93c5fd"),
      new Color("#fde68a"),
      new Color("#f8fafc"),
    ];

    for (let i = 0; i < COUNT; i++) {
      const radius = 250 + Math.random() * 700;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] =
        radius * Math.sin(phi) * Math.cos(theta);

      positions[i * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3 + 2] =
        radius * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 0.4;
    }

    return {
      positions,
      colors,
      sizes,
    };
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y =
      state.clock.elapsedTime * 0.002;

    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.04) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={1.4}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        vertexColors
        blending={AdditiveBlending}
      />
    </points>
  );
}
/* ---------------- Nebula background shader ---------------- */

const nebulaVertexShader = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  varying vec3 vPos;
  uniform float uTime;

  // lightweight 3D noise
  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
              dot(p, vec3(269.5, 183.3, 246.1)),
              dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
              dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
          mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
              dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
      mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
              dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
          mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
              dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  void main() {
    vec3 p = normalize(vPos) * 2.0 + vec3(0.0, 0.0, uTime * 0.01);
    float n = noise(p) * 0.5 + noise(p * 2.0) * 0.25 + noise(p * 4.0) * 0.125;
    n = smoothstep(0.0, 0.6, n);

    vec3 colorA = vec3(0.15, 0.05, 0.35); // deep violet
    vec3 colorB = vec3(0.45, 0.15, 0.55); // magenta
    vec3 colorC = vec3(0.02, 0.02, 0.08); // near-black space

    vec3 color = mix(colorC, colorA, n);
    color = mix(color, colorB, smoothstep(0.5, 0.9, n));

    gl_FragColor = vec4(color, 0.5 * n);
  }
`;

function NebulaBackground() {
  const materialRef = useRef();
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={480}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------------- Planets ---------------- */

function Planet({ position, size, color, ringed = false, rotationSpeed = 0.05 }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.4}>
      <group position={position}>
        <mesh ref={ref} scale={size}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color={color} roughness={0.75} metalness={0.15} />
        </mesh>
        {ringed && (
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 2.3, 64]} />
            <meshStandardMaterial
              color="#d8c9a3"
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
              roughness={0.9}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function PlanetField() {
  const planets = useMemo(
    () => [
      { position: [10, 4, -60], size: 3.5, color: "#6d4aff", rotationSpeed: 0.04 },
      { position: [-14, -6, -140], size: 6, color: "#c2410c", ringed: true, rotationSpeed: 0.03 },
      { position: [8, -8, -230], size: 2.5, color: "#2563eb", rotationSpeed: 0.06 },
      { position: [-10, 7, -320], size: 5, color: "#7c3aed", rotationSpeed: 0.025 },
      { position: [0, -3, -420], size: 8, color: "#be185d", ringed: true, rotationSpeed: 0.02 },
    ],
    []
  );

  return (
    <>
      {planets.map((p, i) => (
        <Planet key={i} {...p} />
      ))}
    </>
  );
}

/* ---------------- Camera: scroll fly-through + mouse parallax, eased with GSAP ---------------- */

function ScrollCamera() {
  const { camera } = useThree();
  const camState = useRef({ z: 10, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      camState.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      camState.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const targetZ = -scrollState.progress * (FIELD_DEPTH - 60);

    // GSAP eases the tracked value smoothly toward the scroll target
    gsap.to(camState.current, {
      z: targetZ,
      duration: 1.1,
      ease: "power2.out",
      overwrite: true,
    });

    camera.position.z = camState.current.z;
    camera.position.x += (camState.current.mouseX * 2.5 - camera.position.x) * 0.04;
    camera.position.y += (-camState.current.mouseY * 1.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, camera.position.z - 10);
  });

  return null;
}

/* ---------------- Background audio — play/mute only ---------------- */

function SpaceAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Blocked by browser autoplay policy until a user gesture — the
        // button just stays showing "muted" state, which is fine here
        // since this click IS the user gesture.
      });
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ position: "absolute", bottom: "2rem", right: "2rem", zIndex: 60, pointerEvents: "auto" }}>
      <audio ref={audioRef} loop src="/audio/track.mp3" />
      <button
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: playing ? "#7c3aed" : "rgba(10,10,16,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {playing ? "🔊" : "🔇"}
      </button>
    </div>
  );
}
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
        {/* Cinematic Space Fog */}
        <fog attach="fog" args={["#02030a", 80, 250]} />

        {/* Lighting */}
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

        {/* Your Existing Components */}
        <NebulaBackground />
        <StarField />
        <PlanetField />
        <ScrollCamera />

        {/* Cinematic Bloom */}
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
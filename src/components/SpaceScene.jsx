import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { scrollState } from "./SmoothScroll";

/**
 * ============================================================
 * INFINITE GALAXY SCENE
 * - 20,000+ stars rendered as a single GPU shader point-cloud
 *   (one draw call, not 20,000 mesh objects — this is what keeps
 *   it fast)
 * - Realistic-ish planets with rotation + one ringed planet
 * - Nebula background rendered as a shader on a giant sphere
 * - Mouse parallax layered on top of the scroll-driven fly-through
 * - GSAP smooths the camera motion instead of a manual lerp
 * ============================================================
 */

const STAR_COUNT = 20000;
const FIELD_DEPTH = 500;
const FIELD_RADIUS = 90;

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
  const pointsRef = useRef();
  const materialRef = useRef();

  const { positions, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const phases = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const radius = Math.random() * FIELD_RADIUS;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -Math.random() * FIELD_DEPTH;
      sizes[i] = Math.random() * 2.2 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, phases };
  }, []);

  useFrame((state) => {
    const camZ = state.camera.position.z;
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < STAR_COUNT; i++) {
      const z = posAttr.array[i * 3 + 2];
      if (z > camZ + 5) {
        posAttr.array[i * 3 + 2] = camZ - FIELD_DEPTH;
      }
    }
    posAttr.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
    pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={STAR_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={STAR_COUNT} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aTwinklePhase" count={STAR_COUNT} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
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
      <Canvas camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 600 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#030308"]} />
        <fog attach="fog" args={["#030308", 40, 260]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#a78bfa" />
        <pointLight position={[20, 10, -100]} intensity={0.6} color="#f97316" />

        <Environment preset="night" />

        <NebulaBackground />
        <StarField />
        <PlanetField />
        <ScrollCamera />
      </Canvas>

      <SpaceAudio />
    </div>
  );
}
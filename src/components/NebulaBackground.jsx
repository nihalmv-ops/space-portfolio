import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import { useSafeTexture } from "./hooks/useSafeTexture";

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

    vec3 colorA = vec3(0.15, 0.05, 0.35);
    vec3 colorB = vec3(0.45, 0.15, 0.55);
    vec3 colorC = vec3(0.02, 0.02, 0.08);

    vec3 color = mix(colorC, colorA, n);
    color = mix(color, colorB, smoothstep(0.5, 0.9, n));

    gl_FragColor = vec4(color, 0.5 * n);
  }
`;

export default function NebulaBackground() {
  const materialRef = useRef();
  const milkyway = useSafeTexture("/textures/milkyway_8k.jpg");

  useFrame((state) => {
    if (materialRef.current && !milkyway) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  // If the milky way texture loaded, use it as a real skybox.
  if (milkyway) {
    return (
      <mesh scale={480}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={milkyway} side={BackSide} />
      </mesh>
    );
  }

  // Otherwise fall back to the original procedural nebula shader
  // so the scene still looks intentional instead of breaking.
  return (
    <mesh scale={480}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        side={BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
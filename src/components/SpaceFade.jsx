import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { scrollState } from "./SmoothScroll";
import * as THREE from "three";

export default function SpaceFade() {
  const { scene } = useThree();
  const fade = useRef(0);

  useFrame(() => {
    const p = scrollState.progress;

    // Start fade near the end of the scroll
    let target = 0;

    if (p > 0.86) {
      target = (p - 0.86) / 0.14;
    }

    target = THREE.MathUtils.clamp(target, 0, 1);

    fade.current = THREE.MathUtils.lerp(
      fade.current,
      target,
      0.05
    );

    // Pure black background
    scene.background = new THREE.Color(0x000000);

    // Update fog only if it exists
    if (scene.fog) {
      scene.fog.color.set("#000000");

      if ("near" in scene.fog) {
        scene.fog.near = 80;
      }

      if ("far" in scene.fog) {
        scene.fog.far = 280 - fade.current * 220;
      }

      if ("density" in scene.fog) {
        scene.fog.density = 0.001 + fade.current * 0.01;
      }
    }
  });

  return null;
}
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { scrollState } from "./SmoothScroll";

export default function SpaceFade() {

  const { scene } = useThree();

  const value = useRef(0);

  useFrame(() => {

    const p = scrollState.progress;

    // Fade after 80% scroll
    let target = 0;

    if (p > 0.80) {

      target = (p - 0.80) / 0.20;

      if (target > 1) target = 1;

    }

    value.current +=
      (target - value.current) * 0.04;

    scene.fog.near = 80;

    scene.fog.far = 250 - value.current * 170;

  });

  return null;

}
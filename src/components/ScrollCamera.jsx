import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { scrollState } from "./SmoothScroll";

const FIELD_DEPTH = 1100;

export default function ScrollCamera() {
  const { camera } = useThree();

  const cam = useRef({
    z: 16,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cam.current.mouseX =
        (e.clientX / window.innerWidth - 0.5) * 2;

      cam.current.mouseY =
        (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  useFrame(() => {
    const p = scrollState.progress;

    // Travel from Hero to Deep Space
const targetZ =
  -scrollState.progress * FIELD_DEPTH;

    gsap.to(cam.current, {
      z: targetZ,
      duration: 1.2,
      ease: "power2.out",
      overwrite: true,
    });

    camera.position.z = cam.current.z;

    camera.position.x +=
      (cam.current.mouseX * 2.5 - camera.position.x) *
      0.04;

    camera.position.y +=
      (-cam.current.mouseY * 1.5 - camera.position.y) *
      0.04;

    // Slight camera push toward the Sun near the end
    if (p > 0.7) {
      camera.position.x *= 0.995;
      camera.position.y *= 0.995;
    }

    camera.lookAt(
      0,
      0,
      camera.position.z - 50
    );
  });

  return null;
}
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { scrollState } from "./SmoothScroll";

const FIELD_DEPTH = 500;

export default function ScrollCamera() {
  const { camera } = useThree();

  const cameraState = useRef({
    z: 14,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cameraState.current.mouseX =
        (e.clientX / window.innerWidth - 0.5) * 2;

      cameraState.current.mouseY =
        (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    // Scroll fly-through
    const targetZ = 14 - scrollState.progress * FIELD_DEPTH;

    gsap.to(cameraState.current, {
      z: targetZ,
      duration: 1,
      ease: "power3.out",
      overwrite: true,
    });

    // Camera movement
    camera.position.z = cameraState.current.z;

    camera.position.x +=
      (cameraState.current.mouseX * 3 - camera.position.x) * 0.05;

    camera.position.y +=
      (-cameraState.current.mouseY * 2 - camera.position.y) * 0.05;

    camera.lookAt(
      0,
      0,
      camera.position.z - 10
    );
  });

  return null;
}
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { scrollState } from "./SmoothScroll";

const FIELD_DEPTH = 500;

export default function ScrollCamera() {
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
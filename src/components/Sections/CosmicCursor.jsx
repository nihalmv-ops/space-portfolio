import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./CosmicCursor.css";

export default function MouseCursor() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0.1,
      100
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(70, 70);

    container.appendChild(renderer.domElement);

    // --------------------------------
    // 3D Diamond
    // --------------------------------

  const diamondGeometry = new THREE.OctahedronGeometry(0.38, 1);

    const diamondMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      wireframe: false,
    });

    const diamond = new THREE.Mesh(
      diamondGeometry,
      diamondMaterial
    );

    scene.add(diamond);

    // --------------------------------
    // Diamond glow
    // --------------------------------

  const glowGeometry = new THREE.SphereGeometry(0.58, 32, 32);

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xb78cff,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });

    const glow = new THREE.Mesh(
      glowGeometry,
      glowMaterial
    );

    scene.add(glow);

    // --------------------------------
    // Mouse position
    // --------------------------------

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event) => {
      targetX =
        (event.clientX / window.innerWidth) * 2 - 1;

      targetY =
        -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    // --------------------------------
    // Animation
    // --------------------------------

    const clock = new THREE.Clock();

    let animationFrame;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      currentX +=
        (targetX - currentX) * 0.12;

      currentY +=
        (targetY - currentY) * 0.12;

      const screenX =
  (targetX + 1) * 0.5 * window.innerWidth;

const screenY =
  (1 - targetY) * 0.5 * window.innerHeight;

const smoothScreenX =
  (currentX + 1) * 0.5 * window.innerWidth;

const smoothScreenY =
  (1 - currentY) * 0.5 * window.innerHeight;

container.style.transform = `
  translate3d(
    ${smoothScreenX - 35}px,
    ${smoothScreenY - 35}px,
    0
  )
`;

diamond.position.set(0, 0, 0);
glow.position.set(0, 0, 0);

      // Real 3D rotation
      diamond.rotation.x =
        time * 1.5;

      diamond.rotation.y =
        time * 2;

      diamond.rotation.z =
        time * 0.7;

      // Breathing glow
      const pulse =
        0.12 +
        Math.sin(time * 4) * 0.04;

      glow.material.opacity = pulse;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(
        animationFrame
      );

      diamondGeometry.dispose();
      diamondMaterial.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mouse-3d-cursor"
    />
  );
}
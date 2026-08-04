import { useFrame, useThree } from "@react-three/fiber";

export default function CameraShake() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    camera.rotation.x =
      Math.sin(t * 0.5) * 0.002;

    camera.rotation.y =
      Math.cos(t * 0.4) * 0.002;
  });

  return null;
}
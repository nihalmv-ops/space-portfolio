import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function WarpStars() {
  const group = useRef();

  const stars = useMemo(() => {
    return new Array(1500).fill().map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      z: -Math.random() * 1200,
      speed: 2 + Math.random() * 5,
    }));
  }, []);

  useFrame(() => {
    group.current.children.forEach((star, i) => {
      star.position.z += stars[i].speed;

      if (star.position.z > 20) {
        star.position.z = -1200;
      }
    });
  });

  return (
    <group ref={group}>
      {stars.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}
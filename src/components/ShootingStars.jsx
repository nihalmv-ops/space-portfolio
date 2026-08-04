import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ShootingStars() {
  const group = useRef();

  const stars = useMemo(() => {
    return new Array(12).fill().map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 250,
        Math.random() * 120,
        -Math.random() * 800
      ),
      speed: 0.4 + Math.random(),
    }));
  }, []);

  useFrame(() => {
    group.current.children.forEach((mesh, i) => {
      mesh.position.x += stars[i].speed;
      mesh.position.y -= stars[i].speed * 0.3;

      if (mesh.position.x > 180) {
        mesh.position.x = -180;
        mesh.position.y = Math.random() * 100;
      }
    });
  });

  return (
    <group ref={group}>
      {stars.map((s, i) => (
        <mesh key={i} position={s.position}>
          <boxGeometry args={[5, 0.08, 0.08]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function MeteorField() {
  const meteors = useRef();

  const data = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 200,
        Math.random() * 120 - 40,
        -Math.random() * 500
      ),
      speed: 0.8 + Math.random() * 2,
      scale: 0.3 + Math.random() * 0.8,
    }));
  }, []);

  useFrame(() => {
    meteors.current.children.forEach((meteor, i) => {
      meteor.position.x += data[i].speed;
      meteor.position.y -= data[i].speed * 0.3;

      if (meteor.position.x > 120) {
        meteor.position.x = -120;
        meteor.position.y = Math.random() * 80 - 40;
        meteor.position.z = -Math.random() * 500;
      }
    });
  });

  return (
    <group ref={meteors}>
      {data.map((m, i) => (
        <mesh
          key={i}
          position={m.position}
          scale={m.scale}
          rotation={[0, 0, -0.5]}
        >
          <coneGeometry args={[0.12, 2.5, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}
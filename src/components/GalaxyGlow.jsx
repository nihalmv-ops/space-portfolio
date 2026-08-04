import * as THREE from "three";

export default function GalaxyGlow() {
  return (
    <mesh position={[0, 0, -500]}>
      <sphereGeometry args={[700, 64, 64]} />

      <meshBasicMaterial
        color="#2b1457"
        side={THREE.BackSide}
        transparent
        opacity={0.22}
      />
    </mesh>
  );
}
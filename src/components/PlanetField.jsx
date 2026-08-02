import Planet from "./Planet";

export default function PlanetField() {
  return (
    <>
      <Planet
        position={[12, 6, -70]}
        size={3}
        texture="/textures/earth.jpg"
        rotationSpeed={0.04}
      />

      <Planet
        position={[-14, -5, -150]}
        size={4.5}
        texture="/textures/saturn.jpg"
        ringTexture="/textures/saturn_ring.png"
        ringed
        rotationSpeed={0.02}
      />

      <Planet
        position={[8, -8, -250]}
        size={2.3}
        texture="/textures/mars.jpg"
        rotationSpeed={0.06}
      />

      <Planet
        position={[-10, 8, -330]}
        size={1.5}
        texture="/textures/moon.jpg"
        rotationSpeed={0.05}
      />
    </>
  );
}
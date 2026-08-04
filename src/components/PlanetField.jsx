import Planet from "./Planet";

export default  function PlanetField() {
   
  const planets = [
    {
      position: [12, 5, -70],
      size: 3,
      texture: "/textures/earth.jpg",
      rotationSpeed: 0.05,
    },

    {
      position: [-16, -5, -140],
      size: 4.5,
      texture: "/textures/mars.jpg",
      rotationSpeed: 0.04,
    },

    {
      position: [10, 8, -250],
      size: 7,
      texture: "/textures/saturn.jpg",
      ringed: true,
      ringTexture: "/textures/saturn_ring.png",
      rotationSpeed: 0.025,
    },

    {
      position: [-8, 3, -360],
      size: 2,
      texture: "/textures/moon.jpg",
      rotationSpeed: 0.06,
    },
  ];

  return (
    <>
      {planets.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}
    </>
  );
}
import { useMemo } from "react";
import Planet from "./Planet";

export default function PlanetField() {
  const planets = useMemo(
    () => [
      { position: [10, 4, -60],   size: 3.5, color: "#6d4aff", texturePath: "/textures/earth.jpg",  rotationSpeed: 0.04 },
      { position: [-14, -6, -140], size: 6,   color: "#c2410c", texturePath: "/textures/saturn.jpg", ringed: true, rotationSpeed: 0.03 },
      { position: [8, -8, -230],  size: 2.5, color: "#2563eb", texturePath: "/textures/mars.jpg",   rotationSpeed: 0.06 },
      { position: [-10, 7, -320], size: 5,   color: "#7c3aed", texturePath: "/textures/moon.jpg",   rotationSpeed: 0.025 },
      { position: [0, -3, -420],  size: 8,   color: "#be185d", texturePath: null, ringed: true, rotationSpeed: 0.02 },
    ],
    []
  );

  return (
    <>
      {planets.map((p, i) => (
        <Planet key={i} {...p} />
      ))}
    </>
  );
}
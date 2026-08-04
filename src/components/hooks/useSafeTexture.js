import { useState, useEffect } from "react";
import * as THREE from "three";

// Loads a texture without throwing — falls back to null so the mesh
// can render a flat color instead of crashing the whole scene.
export function useSafeTexture(path) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!path) return;
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    loader.load(
      path,
      (tex) => {
        if (isMounted) setTexture(tex);
      },
      undefined,
      (err) => {
        console.warn(`[texture] failed to load "${path}"`, err);
        if (isMounted) setTexture(null);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [path]);

  return texture;
}
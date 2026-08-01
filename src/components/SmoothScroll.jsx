import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Module-level singleton so the 3D Canvas (which lives outside React's
 * normal render tree perf-wise) can read scroll progress every frame
 * without triggering React re-renders. 0 = top of page, 1 = bottom.
 */
export const scrollState = { progress: 0, velocity: 0 };

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ progress, velocity }) => {
      scrollState.progress = progress;
      scrollState.velocity = velocity;
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return children;
}

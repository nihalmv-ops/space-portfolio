import { useEffect, useRef, useState } from "react";

/**
 * Tracks scroll position against a list of section ids and returns:
 *  - progress: 0..1 across the whole page
 *  - activeIndex: index of the section currently most in view
 *  - activeId: id of that section
 *  - sectionProgress: 0..1 progress *within* the active section
 *
 * Works with plain document scroll (no ScrollControls needed).
 * Sections just need to exist in the DOM with these ids, e.g.
 * <section id="hero">, <section id="about">, etc.
 */
export function useScrollStory(
  sectionIds = [
    "hero",
    "about",
    "skills",
    "projects",
    "experience",
    "contact",
    "footer",
  ]
) {
  const [state, setState] = useState({
    progress: 0,
    activeIndex: 0,
    activeId: sectionIds[0],
    sectionProgress: 0,
  });

  const raf = useRef(null);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

      const sections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top, height: rect.height };
        })
        .filter(Boolean);

      let activeIndex = 0;
      let sectionProgress = 0;

      // Section counts as "active" once its top has crossed the
      // middle of the viewport.
      const viewportMid = window.innerHeight * 0.5;

      for (let i = 0; i < sections.length; i++) {
        if (sections[i].top <= viewportMid) {
          activeIndex = i;
          const local = (viewportMid - sections[i].top) / sections[i].height;
          sectionProgress = Math.min(1, Math.max(0, local));
        }
      }

      setState({
        progress,
        activeIndex,
        activeId: sections[activeIndex]?.id ?? sectionIds[0],
        sectionProgress,
      });

      raf.current = null;
    };

    const onScroll = () => {
      if (raf.current == null) {
        raf.current = requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return state;
}
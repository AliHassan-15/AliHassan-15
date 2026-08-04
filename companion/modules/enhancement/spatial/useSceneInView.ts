"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Observes whether a scene host is near the viewport. Used so off-screen
 * cinematic canvases unmount (freeing WebGL contexts) while their fallback
 * stays in the layout — smooth FPS without dropping product surfaces.
 */
export function useSceneInView(
  rootMargin = "180px 0px",
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        setInView(entry.isIntersecting);
      },
      { root: null, rootMargin, threshold: 0.02 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return [ref, inView];
}

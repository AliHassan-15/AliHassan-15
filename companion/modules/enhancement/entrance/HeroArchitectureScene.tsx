"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { useSpatialCapability } from "@/modules/enhancement/spatial/useSpatialCapability";
import type { HeroArchitectureSceneContentProps } from "./HeroArchitectureSceneContent";

type HeroArchitectureSceneProps = {
  className?: string;
  /** The existing static SVG network — ships whenever WebGL is unavailable. */
  fallback: ReactNode;
};

type ContentComponent = ComponentType<HeroArchitectureSceneContentProps>;

/**
 * Real WebGL replacement for the flat homepage architecture SVG.
 *
 * The scene composition (`HeroArchitectureSceneContent`, which statically
 * imports `@react-three/fiber`/`@react-three/drei`/`three`) is fetched via a
 * runtime `import()` inside an effect — never a static import here. If this
 * file imported that content directly, Three.js would be pulled into the
 * homepage's route chunk; since the homepage is one of several routes doing
 * this, webpack's automatic vendor-chunk splitting would then hoist Three.js
 * into a "commons" bundle preloaded on *every* route, including ones with no
 * scene at all. A capability-gated `import()` keeps the network fetch itself
 * scoped to visitors who actually get a live scene (Rebuild M9).
 */
export function HeroArchitectureScene({
  className,
  fallback,
}: HeroArchitectureSceneProps) {
  const capability = useSpatialCapability();
  const [Content, setContent] = useState<ContentComponent | null>(null);

  useEffect(() => {
    if (capability !== "full") {
      return;
    }
    let cancelled = false;
    void import("./HeroArchitectureSceneContent").then((module) => {
      if (!cancelled) {
        // Wrapped in an updater function: `useState`'s setter treats a bare
        // function value as a lazy initializer and calls it with the
        // previous state instead of storing it, so `setContent(module.default)`
        // would invoke the component instead of setting it as the new state.
        setContent(() => module.default);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [capability]);

  if (capability !== "full" || !Content) {
    return <>{fallback}</>;
  }

  return <Content className={className} fallback={fallback} />;
}

"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useSpatialCapability } from "@/modules/enhancement/spatial/useSpatialCapability";

type ContentComponent = ComponentType<Record<string, never>>;

/**
 * Orbit rings + signal marks around the portrait carrier.
 * Fallback is `null` — the carrier's existing corner/tick marks already
 * carry the "engineered specimen" framing without this layer.
 *
 * Scene content is fetched via a capability-gated runtime `import()` so
 * Three.js never enters the homepage's static module graph (see
 * `HeroArchitectureScene` for the full rationale — Rebuild M9).
 */
export function PortraitOrbitScene() {
  const capability = useSpatialCapability();
  const [Content, setContent] = useState<ContentComponent | null>(null);

  useEffect(() => {
    if (capability !== "full") {
      return;
    }
    let cancelled = false;
    void import("./PortraitOrbitSceneContent").then((module) => {
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
    return null;
  }

  return <Content />;
}

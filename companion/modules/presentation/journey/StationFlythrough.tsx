"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useSpatialCapability } from "@/modules/enhancement/spatial/useSpatialCapability";
import type { StationFlythroughContentProps } from "./StationFlythroughContent";

type StationFlythroughProps = {
  stationCount: number;
  activeIndex: number;
};

type ContentComponent = ComponentType<StationFlythroughContentProps>;

/**
 * Camera-travels-through-stations flythrough above the accessible journey
 * track. Fallback is `null` — the track below already carries the journey's
 * full meaning; this is purely an enhancement layer (Document 32).
 *
 * Scene content is fetched via a capability-gated runtime `import()` so
 * Three.js never enters the journey route's static module graph (see
 * `HeroArchitectureScene` for the full rationale — Rebuild M9).
 */
export function StationFlythrough({
  stationCount,
  activeIndex,
}: StationFlythroughProps) {
  const capability = useSpatialCapability();
  const [Content, setContent] = useState<ContentComponent | null>(null);

  useEffect(() => {
    if (capability !== "full") {
      return;
    }
    let cancelled = false;
    void import("./StationFlythroughContent").then((module) => {
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

  return <Content stationCount={stationCount} activeIndex={activeIndex} />;
}

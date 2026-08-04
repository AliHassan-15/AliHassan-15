"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { useSpatialCapability } from "@/modules/enhancement/spatial/useSpatialCapability";
import type { ConstellationFieldContentProps } from "./ConstellationFieldContent";
import type { CapabilityAtlasModel } from "./inspectCapability";

type ConstellationFieldProps = {
  model: CapabilityAtlasModel;
  activeId: string | null;
  connectedIds: Set<string>;
  className?: string;
  /** The existing flat SVG blueprint field — ships whenever WebGL is unavailable. */
  fallback: ReactNode;
};

type ContentComponent = ComponentType<ConstellationFieldContentProps>;

/**
 * Real WebGL replacement for `CapabilityAtlas`'s flat SVG blueprint field.
 * The accessible radiogroup list stays the single source of truth for
 * selection/hover; this scene only re-emphasises whichever capability that
 * list currently has active.
 *
 * Scene content is fetched via a capability-gated runtime `import()` so
 * Three.js never enters the atlas route's static module graph (see
 * `HeroArchitectureScene` for the full rationale — Rebuild M9).
 */
export function ConstellationField({
  model,
  activeId,
  connectedIds,
  className,
  fallback,
}: ConstellationFieldProps) {
  const capability = useSpatialCapability();
  const [Content, setContent] = useState<ContentComponent | null>(null);

  useEffect(() => {
    if (capability !== "full") {
      return;
    }
    let cancelled = false;
    void import("./ConstellationFieldContent").then((module) => {
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

  return (
    <Content
      model={model}
      activeId={activeId}
      connectedIds={connectedIds}
      className={className}
      fallback={fallback}
    />
  );
}

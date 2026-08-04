"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { useSpatialCapability } from "./useSpatialCapability";
import type { PipelineFlythroughContentProps } from "./PipelineFlythroughContent";

type PipelineFlythroughProps = {
  stageCount: number;
  activeIndex: number;
  className?: string;
  /** The existing flat CSS plane stack — ships whenever WebGL is unavailable. */
  fallback: ReactNode;
};

type ContentComponent = ComponentType<PipelineFlythroughContentProps>;

/**
 * Real WebGL replacement for `ArchitectureTopology`'s flat "depth" plane
 * stack. The accessible radiogroup list stays the single source of truth for
 * stage selection; this scene only glides to whatever it selects, turning an
 * ordinary control into a real flythrough rather than a separate toy.
 *
 * `ArchitectureTopology` (this component's caller) is statically rendered on
 * every project chapter — 10 routes. A capability-gated runtime `import()`
 * keeps Three.js out of every one of those routes' static module graphs, so
 * it never gets hoisted into a shared "commons" bundle preloaded site-wide
 * (see `HeroArchitectureScene` for the full rationale — Rebuild M9).
 */
export function PipelineFlythrough({
  stageCount,
  activeIndex,
  className,
  fallback,
}: PipelineFlythroughProps) {
  const capability = useSpatialCapability();
  const [Content, setContent] = useState<ContentComponent | null>(null);

  useEffect(() => {
    if (capability !== "full") {
      return;
    }
    let cancelled = false;
    void import("./PipelineFlythroughContent").then((module) => {
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
      stageCount={stageCount}
      activeIndex={activeIndex}
      className={className}
      fallback={fallback}
    />
  );
}

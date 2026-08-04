"use client";

import type { ReactNode } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { PipelineScene } from "./PipelineScene";

export type PipelineFlythroughContentProps = {
  stageCount: number;
  activeIndex: number;
  className?: string;
  fallback: ReactNode;
};

/**
 * Actual scene composition, isolated so `PipelineFlythrough` can fetch it via
 * a runtime `import()` instead of a static import (see that file for why).
 *
 * Guards against a `null` argument: React's dev-only "owner stack" tooling
 * re-invokes function components fetched via a plain reference (as
 * `PipelineFlythrough` does, storing this module's default export in state)
 * with `null` to derive an exact source location for error overlays. A bare
 * destructured parameter throws on that probe and turns a harmless
 * diagnostic into a real crash — returning `null` up front keeps this
 * component inert for that call while behaving identically for every real
 * render, which always supplies a full props object.
 */
export default function PipelineFlythroughContent(
  props: PipelineFlythroughContentProps | null,
) {
  if (!props) {
    return null;
  }
  const { stageCount, activeIndex, className, fallback } = props;
  return (
    <SceneCanvas
      className={className}
      fallback={fallback}
      camera={{ position: [0, 0.25, 4.3], fov: 42 }}
    >
      {(tier) => (
        <PipelineScene
          stageCount={stageCount}
          activeIndex={activeIndex}
          tier={tier}
        />
      )}
    </SceneCanvas>
  );
}

"use client";

import type { ReactNode } from "react";
import { SceneCanvas } from "@/modules/enhancement/spatial/SceneCanvas";
import { ConstellationScene } from "./ConstellationScene";
import type { CapabilityAtlasModel } from "./inspectCapability";

export type ConstellationFieldContentProps = {
  model: CapabilityAtlasModel;
  activeId: string | null;
  connectedIds: Set<string>;
  className?: string;
  fallback: ReactNode;
};

/**
 * Actual scene composition, isolated so `ConstellationField` can fetch it via
 * a runtime `import()` instead of a static import (see that file for why).
 *
 * Guards against a `null` argument: React's dev-only "owner stack" tooling
 * re-invokes function components fetched via a plain reference (as
 * `ConstellationField` does, storing this module's default export in state)
 * with `null` to derive an exact source location for error overlays. A bare
 * destructured parameter throws on that probe and turns a harmless
 * diagnostic into a real crash — returning `null` up front keeps this
 * component inert for that call while behaving identically for every real
 * render, which always supplies a full props object.
 */
export default function ConstellationFieldContent(
  props: ConstellationFieldContentProps | null,
) {
  if (!props) {
    return null;
  }
  const { model, activeId, connectedIds, className, fallback } = props;
  return (
    <SceneCanvas
      className={className}
      fallback={fallback}
      camera={{ position: [0, 0, 7.2], fov: 46 }}
    >
      {(tier) => (
        <ConstellationScene
          nodes={model.layout.map((entry) => ({
            id: entry.id,
            x: entry.x,
            y: entry.y,
          }))}
          edges={model.edges.map((edge) => ({
            fromId: edge.fromId,
            toId: edge.toId,
          }))}
          viewBox={model.viewBox}
          activeId={activeId}
          connectedIds={connectedIds}
          tier={tier}
        />
      )}
    </SceneCanvas>
  );
}

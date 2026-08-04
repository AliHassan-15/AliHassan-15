"use client";

import type { ReactNode } from "react";
import { SceneCanvas } from "@/modules/enhancement/spatial/SceneCanvas";
import { ArchitectureGraphScene } from "./ArchitectureGraphScene";
import { EntranceCameraRig } from "./EntranceCameraRig";
import { EntranceParticles } from "./EntranceParticles";

export type HeroArchitectureSceneContentProps = {
  className?: string;
  fallback: ReactNode;
};

/**
 * Actual scene composition, isolated so `HeroArchitectureScene` can fetch it
 * via a runtime `import()` instead of a static import (see that file for why).
 *
 * Guards against a `null` argument: React's dev-only "owner stack" tooling
 * re-invokes function components fetched via a plain reference (as
 * `HeroArchitectureScene` does, storing this module's default export in
 * state) with `null` to derive an exact source location for error overlays.
 * A bare destructured parameter throws on that probe and turns a harmless
 * diagnostic into a real crash — returning `null` up front keeps this
 * component inert for that call while behaving identically for every real
 * render, which always supplies a full props object.
 */
export default function HeroArchitectureSceneContent(
  props: HeroArchitectureSceneContentProps | null,
) {
  if (!props) {
    return null;
  }
  const { className, fallback } = props;
  return (
    <SceneCanvas
      className={className}
      fallback={fallback}
      camera={{ position: [0, 0, 6.2], fov: 48 }}
    >
      {(tier) => (
        <>
          <EntranceCameraRig />
          <EntranceParticles tier={tier} />
          <ArchitectureGraphScene tier={tier} />
        </>
      )}
    </SceneCanvas>
  );
}

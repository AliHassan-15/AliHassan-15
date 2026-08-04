"use client";

import { SceneCanvas } from "@/modules/enhancement/spatial/SceneCanvas";
import { StationScene } from "./StationScene";
import styles from "./StationFlythrough.module.css";

export type StationFlythroughContentProps = {
  stationCount: number;
  activeIndex: number;
};

/**
 * Actual scene composition, isolated so `StationFlythrough` can fetch it via
 * a runtime `import()` instead of a static import (see that file for why).
 *
 * Guards against a `null` argument: React's dev-only "owner stack" tooling
 * re-invokes function components fetched via a plain reference (as
 * `StationFlythrough` does, storing this module's default export in state)
 * with `null` to derive an exact source location for error overlays. A bare
 * destructured parameter throws on that probe and turns a harmless
 * diagnostic into a real crash — returning `null` up front keeps this
 * component inert for that call while behaving identically for every real
 * render, which always supplies a full props object.
 */
export default function StationFlythroughContent(
  props: StationFlythroughContentProps | null,
) {
  if (!props) {
    return null;
  }
  const { stationCount, activeIndex } = props;
  return (
    <SceneCanvas
      className={styles.scene}
      fallback={null}
      camera={{ position: [0, 0.2, 4], fov: 44 }}
    >
      {(tier) => (
        <StationScene
          stationCount={stationCount}
          activeIndex={activeIndex}
          tier={tier}
        />
      )}
    </SceneCanvas>
  );
}

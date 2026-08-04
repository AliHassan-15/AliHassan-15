"use client";

import { SceneCanvas } from "@/modules/enhancement/spatial/SceneCanvas";
import { EntrancePortraitScene } from "./EntrancePortraitScene";
import styles from "./PortraitOrbitScene.module.css";

/**
 * Actual scene composition, isolated so `PortraitOrbitScene` can fetch it via
 * a runtime `import()` instead of a static import (see that file for why).
 */
export default function PortraitOrbitSceneContent() {
  return (
    <SceneCanvas
      className={styles.scene}
      fallback={null}
      priority={true}
      camera={{ position: [0, 0, 3.05], fov: 34 }}
    >
      {(tier) => <EntrancePortraitScene tier={tier} />}
    </SceneCanvas>
  );
}

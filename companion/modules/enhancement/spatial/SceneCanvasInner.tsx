"use client";

import { Canvas, useThree, type CanvasProps } from "@react-three/fiber";
import { Suspense, useEffect, type ReactNode } from "react";
import { SceneEffects } from "./SceneEffects";
import { SceneEffectsBoundary } from "./SceneEffectsBoundary";
import type { SpatialTier } from "./types";
import styles from "./SceneCanvas.module.css";

export type SceneCanvasInnerProps = {
  children: (tier: SpatialTier) => ReactNode;
  className?: string;
  tier: SpatialTier;
} & Pick<CanvasProps, "camera">;

/**
 * The actual `@react-three/fiber` boundary, split into its own module so
 * `SceneCanvas`'s runtime `import()` can code-split the Three.js bundle away
 * from every route's static chunk. Only ever mounted client-side, and only
 * once `SceneCanvas` has already confirmed spatial capability is "full" —
 * never imported eagerly, never rendered during SSR.
 *
 * `SceneEffects` (bloom/grain/vignette) is applied here once, for every
 * scene, rather than per-scene — it's the canvas-level cinematic treatment
 * the brief calls for, gated to the cinematic tier by the effects component
 * itself.
 *
 * Guards against a `null` argument: React's dev-only "owner stack" tooling
 * re-invokes function components it's fetched via a plain reference (as
 * `SceneCanvas` does here, storing this module's default export in state)
 * with `null` to derive an exact source location for error overlays. A
 * bare destructured parameter throws on that probe and turns a harmless
 * diagnostic into a real crash — returning `null` up front keeps this
 * component inert for that call while behaving identically for every real
 * render, which always supplies a full props object.
 */
export default function SceneCanvasInner(props: SceneCanvasInnerProps | null) {
  if (!props) {
    return null;
  }
  const { children, camera, tier } = props;

  return (
    <div className={styles.viewport} aria-hidden="true">
      <Canvas
        dpr={tier === "cinematic" ? [1, 1.75] : 1}
        camera={camera ?? { position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: tier === "cinematic",
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          {children(tier)}
          <SceneEffectsBoundary>
            <SceneEffects tier={tier} />
          </SceneEffectsBoundary>
        </Suspense>
        <RendererLifecycle />
      </Canvas>
    </div>
  );
}

/**
 * Prevents default context-loss teardown thrash and forces a clean GPU
 * release when this canvas unmounts (slot handoff / scrolled out of view).
 */
function RendererLifecycle() {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (event: Event) => {
      event.preventDefault();
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost, false);
      gl.dispose();
      gl.forceContextLoss();
    };
  }, [gl]);

  return null;
}

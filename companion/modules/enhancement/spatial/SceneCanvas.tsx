"use client";

import type { CanvasProps } from "@react-three/fiber";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { SceneCanvasErrorBoundary } from "./SceneCanvasErrorBoundary";
import type { SceneCanvasInnerProps } from "./SceneCanvasInner";
import type { SpatialTier } from "./types";
import { useCanvasSlot } from "./useCanvasSlot";
import { useDeviceTier } from "./useDeviceTier";
import { useSceneInView } from "./useSceneInView";
import { useSpatialCapability } from "./useSpatialCapability";
import styles from "./SceneCanvas.module.css";

type SceneCanvasProps = {
  /** Scene contents — receives the resolved tier so scenes can budget geometry/particles. */
  children: (tier: SpatialTier) => ReactNode;
  /** Rendered instead of the canvas when spatial is unavailable — must carry full meaning alone. */
  fallback: ReactNode;
  className?: string;
  /**
   * Identity-critical scenes (portrait orbit) jump the canvas wait queue so
   * their rings never lose a slot to a background field.
   */
  priority?: boolean;
} & Pick<CanvasProps, "camera">;

type SceneCanvasInnerComponent = ComponentType<SceneCanvasInnerProps>;

/**
 * Shared WebGL canvas boundary for every cinematic scene (entrance,
 * project chapters, skills constellation, journey).
 *
 * `@react-three/fiber`/`three` are fetched via a plain runtime `import()`
 * inside an effect — deliberately not `next/dynamic()` — because Next's
 * app-router build instruments `next/dynamic()` call sites to preload
 * their chunk from every page that can reach the call site, regardless of
 * the runtime branch that decides whether the component ever renders. A
 * bare `import()` executed only after capability resolves to "full" is
 * still code-split by webpack into its own chunk, but the network fetch
 * itself only happens for visitors who actually get a live scene.
 *
 * Fail-closed by construction: `useSpatialCapability` resolves to "off" on
 * the server and stays "off" for visitors with reduced motion, save-data,
 * or no WebGL — so the fallback (which must be independently meaningful)
 * is what ships whenever the real scene cannot run cleanly, and the
 * Three.js bundle is never even requested for them.
 *
 * Live GPU budget: only in-view scenes that hold a canvas slot (max two
 * page-wide) mount a WebGL context. Off-screen scenes keep their fallback
 * in the layout so every surface still exists — nothing is removed, FPS
 * stays smooth, and context-loss crashes are avoided.
 */
export function SceneCanvas({
  children,
  fallback,
  className,
  camera,
  priority = false,
}: SceneCanvasProps) {
  const capability = useSpatialCapability();
  const tier = useDeviceTier();
  const [hostRef, inView] = useSceneInView();
  const wantsSlot = capability === "full" && inView;
  const hasSlot = useCanvasSlot(wantsSlot, priority);
  const [Inner, setInner] = useState<SceneCanvasInnerComponent | null>(null);

  useEffect(() => {
    if (capability !== "full") {
      return;
    }
    let cancelled = false;
    void import("./SceneCanvasInner").then((module) => {
      if (!cancelled) {
        // Wrapped in an updater function: `useState`'s setter treats a bare
        // function value as a lazy initializer and calls it with the
        // previous state instead of storing it, so `setInner(module.default)`
        // would invoke the component instead of setting it as the new state.
        setInner(() => module.default);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [capability]);

  const hostClass = className ? `${styles.root} ${className}` : styles.root;
  const canMountLive = capability === "full" && hasSlot && Inner !== null;

  return (
    <div ref={hostRef} className={hostClass} aria-hidden="true">
      {canMountLive ? (
        <SceneCanvasErrorBoundary fallback={fallback}>
          <Inner camera={camera} tier={tier}>
            {children}
          </Inner>
        </SceneCanvasErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}

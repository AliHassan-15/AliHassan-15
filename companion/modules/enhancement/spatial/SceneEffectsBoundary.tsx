"use client";

import { Component, type ReactNode } from "react";

type SceneEffectsBoundaryProps = {
  children: ReactNode;
};

type SceneEffectsBoundaryState = {
  failed: boolean;
};

/**
 * Isolates the post-processing stack (`SceneEffects`) from the rest of the
 * scene tree. `@react-three/postprocessing`'s `EffectComposer` probes for a
 * second, throwaway WebGL context on construction, and browsers cap the
 * number of live contexts a page may hold (commonly 8–16); pages that mount
 * more than one cinematic scene at once — e.g. `/journey`, which runs both
 * `StationFlythrough` and the embedded `CapabilityAtlas` constellation
 * simultaneously — can exceed that cap and throw
 * `Cannot read properties of null (reading 'alpha')` out of
 * `EffectComposer`'s constructor.
 *
 * Bloom/grain/vignette are a cinematic enhancement, not the scene itself —
 * exactly the kind of thing this codebase already fails closed on elsewhere
 * (WebGL support, reduced motion, save-data). This boundary applies the
 * same principle one layer deeper: if the effects pass can't be built, drop
 * only the effects pass and keep the geometry, camera work, and particles
 * rendering normally, rather than losing the whole route to a route-level
 * error boundary.
 */
export class SceneEffectsBoundary extends Component<
  SceneEffectsBoundaryProps,
  SceneEffectsBoundaryState
> {
  state: SceneEffectsBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneEffectsBoundaryState {
    return { failed: true };
  }

  override render(): ReactNode {
    if (this.state.failed) {
      return null;
    }
    return this.props.children;
  }
}

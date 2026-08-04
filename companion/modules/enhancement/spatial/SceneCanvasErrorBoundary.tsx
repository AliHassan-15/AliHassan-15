"use client";

import { Component, type ReactNode } from "react";

type SceneCanvasErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type SceneCanvasErrorBoundaryState = {
  failed: boolean;
};

/**
 * Last-resort isolation for a single cinematic canvas. If WebGL context loss
 * or a shader compile path throws during render, keep the page alive and
 * fall back to the scene's independently meaningful static surface.
 */
export class SceneCanvasErrorBoundary extends Component<
  SceneCanvasErrorBoundaryProps,
  SceneCanvasErrorBoundaryState
> {
  state: SceneCanvasErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneCanvasErrorBoundaryState {
    return { failed: true };
  }

  override render(): ReactNode {
    if (this.state.failed) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

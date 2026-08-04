"use client";

import { useEffect, useRef, useState } from "react";

let currentOwner: symbol | null = null;

/**
 * Grants at most one caller across the entire page the right to mount a
 * post-processing `EffectComposer`. Several routes run more than one
 * cinematic `SceneCanvas` at a time (the homepage alone mounts the hero
 * architecture graph, the portrait orbit, and the skills constellation
 * simultaneously); each `EffectComposer` probes for a second, throwaway
 * WebGL context on construction, and browsers cap how many live contexts a
 * page may hold. First scene to mount claims the slot for as long as it
 * stays mounted; every other caller gets `false` and skips the effects pass
 * entirely, so total context usage never scales with scene count.
 *
 * Ownership is released on unmount so a later scene (e.g. after client-side
 * navigation) can claim it in turn.
 */
export function useEffectsOwnership(): boolean {
  const idRef = useRef<symbol | null>(null);
  const [owns, setOwns] = useState(false);

  useEffect(() => {
    if (currentOwner !== null) {
      return;
    }
    const id = Symbol("scene-effects-owner");
    idRef.current = id;
    currentOwner = id;
    setOwns(true);
    return () => {
      if (currentOwner === id) {
        currentOwner = null;
      }
      idRef.current = null;
    };
  }, []);

  return owns;
}

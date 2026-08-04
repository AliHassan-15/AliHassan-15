"use client";

import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useEffectsOwnership } from "./useEffectsOwnership";
import type { SpatialTier } from "./types";

type SceneEffectsProps = {
  tier: SpatialTier;
};

/**
 * Shared cinematic post-processing stack for every hero scene — a soft
 * specimen-glow bloom, fine grain (echoing the same grain texture used on
 * the DOM layer, `--eos-asset-grain`), and a lens vignette rather than a
 * game-HUD frame.
 *
 * `lite` tier renders nothing: a full-screen effect pass is the single most
 * expensive per-frame cost in any scene, and the lite budget (Document 32)
 * exists precisely so low-power/reduced-capability visitors still get the
 * scene's geometry and motion without paying for shader passes on top.
 *
 * At most one `EffectComposer` is ever live across the whole page
 * (`useEffectsOwnership`) — several routes mount more than one cinematic
 * scene at once (e.g. the homepage runs the hero architecture graph,
 * portrait orbit, and skills constellation simultaneously), and each
 * `EffectComposer` probes for a second, throwaway WebGL context on
 * construction. Browsers cap how many live WebGL contexts a page may hold;
 * letting every scene build its own composer risks exhausting that cap.
 * The scene that claims ownership still gets the full bloom/grain/vignette
 * treatment; the rest render their geometry and motion exactly as before,
 * just without the effects pass.
 */
export function SceneEffects({ tier }: SceneEffectsProps) {
  const owner = useEffectsOwnership();

  if (tier !== "cinematic" || !owner) {
    return null;
  }

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.42}
        luminanceThreshold={0.52}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <Noise opacity={0.028} />
      <Vignette eskil={false} offset={0.26} darkness={0.58} />
    </EffectComposer>
  );
}

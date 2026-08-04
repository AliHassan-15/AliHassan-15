"use client";

import { Sparkles } from "@react-three/drei";
import type { SpatialTier } from "@/modules/enhancement/spatial";

type EntranceParticlesProps = {
  tier: SpatialTier;
};

/**
 * Dust suspended in still air — never a particle-explosion effect.
 * Count and speed are deliberately tiny: this reads as "the room has air",
 * not as a visual effect competing with the identity typography.
 */
export function EntranceParticles({ tier }: EntranceParticlesProps) {
  const count = tier === "cinematic" ? 220 : 90;

  return (
    <Sparkles
      count={count}
      scale={[9.2, 5.6, 4.2]}
      size={1.05}
      speed={0.06}
      opacity={0.26}
      color="#c5c2bc"
      noise={0.85}
    />
  );
}

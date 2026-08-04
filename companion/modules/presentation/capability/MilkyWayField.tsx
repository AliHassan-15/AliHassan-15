"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";
import type { SpatialTier } from "@/modules/enhancement/spatial";

/** Deterministic PRNG — stable star scatter across a session, never re-randomised. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type MilkyWayFieldProps = {
  tier: SpatialTier;
};

/**
 * Ambient background starfield behind the capability constellation.
 * Pure atmosphere — carries no data, never claims to represent anything.
 */
export function MilkyWayField({ tier }: MilkyWayFieldProps) {
  const count = tier === "cinematic" ? 420 : 180;

  const positions = useMemo(() => {
    const random = mulberry32(11);
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (random() - 0.5) * 11;
      array[i * 3 + 1] = (random() - 0.5) * 6.5;
      array[i * 3 + 2] = (random() - 0.5) * 5 - 1;
    }
    return array;
  }, [count]);

  return (
    <Points positions={positions} limit={count}>
      <PointMaterial
        transparent
        color="#c5c2bc"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

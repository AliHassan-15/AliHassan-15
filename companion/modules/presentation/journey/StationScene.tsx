"use client";

import { Line } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import type { SpatialTier } from "@/modules/enhancement/spatial";

type StationSceneProps = {
  /** Count of confirmed journey stations — never invented. */
  stationCount: number;
  /** Index of the station currently active in the accessible track below. */
  activeIndex: number;
  tier: SpatialTier;
};

const SPACING = 2.1;
const ASCENT_PER_STATION = 0.052;
const PULSE_COUNT = 4;
const PULSE_SPEED = 0.16;
const FOLLOW_RATE = 2.2;

type Vec3 = [number, number, number];

/**
 * Camera-travels-through-stations journey flythrough. The chronological
 * backbone only (station N precedes station N+1) — the richer cross-station
 * relationships stay in the accessible plate below, not invented here as
 * geometry. A gentle ascent across stations stands in for "progress over
 * time"; nothing spins, bounces, or explodes (Document 06).
 */
export function StationScene({
  stationCount,
  activeIndex,
  tier,
}: StationSceneProps) {
  const groupRef = useRef<Group>(null);
  const nodeRefs = useRef<Array<Mesh | null>>([]);
  const ringRef = useRef<Mesh>(null);
  const pulseRefs = useRef<Array<Mesh | null>>([]);
  const pulseState = useRef(
    Array.from({ length: PULSE_COUNT }, (_, index) => ({
      t: (index / PULSE_COUNT) * Math.max(stationCount - 1, 1),
    })),
  );

  const positions = useMemo<Vec3[]>(
    () =>
      Array.from({ length: stationCount }, (_, index) => [
        index * SPACING,
        index * ASCENT_PER_STATION + Math.sin(index * 2.1) * 0.05,
        Math.cos(index * 1.4) * 0.26,
      ]),
    [stationCount],
  );

  const targetX = -activeIndex * SPACING;
  const targetY = -(activeIndex * ASCENT_PER_STATION);

  useFrame((state: RootState, delta: number) => {
    const group = groupRef.current;
    if (group) {
      group.position.x +=
        (targetX - group.position.x) * Math.min(delta * FOLLOW_RATE, 1);
      group.position.y +=
        (targetY +
          Math.sin(state.clock.elapsedTime * 0.16) * 0.04 -
          group.position.y) *
        Math.min(delta * FOLLOW_RATE, 1);
      group.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
    }

    nodeRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const targetScale = index === activeIndex ? 1.5 : 1;
      const next = mesh.scale.x + (targetScale - mesh.scale.x) * 0.09;
      mesh.scale.set(next, next, next);
    });

    const activePosition = positions[activeIndex];
    if (ringRef.current && activePosition) {
      ringRef.current.position.set(...activePosition);
      ringRef.current.rotation.z += delta * 0.14;
    }

    const maxT = Math.max(stationCount - 1, 1);
    pulseState.current.forEach((pulse, index) => {
      pulse.t += delta * PULSE_SPEED;
      if (pulse.t >= maxT) {
        pulse.t = 0;
      }
      const stationIndex = Math.floor(pulse.t);
      const from = positions[stationIndex];
      const to = positions[Math.min(stationIndex + 1, stationCount - 1)];
      const mesh = pulseRefs.current[index];
      if (!from || !to || !mesh) return;
      const frac = pulse.t - stationIndex;
      mesh.position.set(
        from[0] + (to[0] - from[0]) * frac,
        from[1] + (to[1] - from[1]) * frac,
        from[2] + (to[2] - from[2]) * frac,
      );
    });
  });

  const nodeScale = tier === "cinematic" ? 1 : 0.8;

  return (
    <group ref={groupRef}>
      {positions.slice(0, -1).map((from, index) => {
        const to = positions[index + 1];
        if (!to) return null;
        return (
          <Line
            key={`station-edge-${index}`}
            points={[from, to]}
            color="#8f8c86"
            transparent
            opacity={0.2}
            lineWidth={0.55}
          />
        );
      })}

      {positions.map((position, index) => (
        <mesh
          key={`station-node-${index}`}
          position={position}
          scale={nodeScale}
          ref={(node) => {
            nodeRefs.current[index] = node;
          }}
        >
          <octahedronGeometry args={[0.1, 0]} />
          <meshBasicMaterial
            color={index === activeIndex ? "#eceae6" : "#c5c2bc"}
            transparent
            opacity={index === activeIndex ? 0.95 : 0.4}
          />
        </mesh>
      ))}

      <mesh ref={ringRef}>
        <torusGeometry args={[0.19, 0.006, 8, 32]} />
        <meshBasicMaterial color="#eceae6" transparent opacity={0.5} />
      </mesh>

      {pulseState.current.map((_, index) => (
        <mesh
          key={`station-pulse-${index}`}
          ref={(node) => {
            pulseRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#eceae6" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

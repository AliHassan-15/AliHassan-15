"use client";

import { Line } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import type { SpatialTier } from "./types";

type PipelineSceneProps = {
  /** Count of confirmed pipeline stages — never invented, passed from the caller's real list. */
  stageCount: number;
  /** Index of the stage currently selected in the accessible radiogroup above. */
  activeIndex: number;
  tier: SpatialTier;
};

const SPACING = 2.3;
const PULSE_COUNT = 3;
const PULSE_SPEED = 0.22;
const FOLLOW_RATE = 2.6;

type Vec3 = [number, number, number];

/**
 * Nodes-on-a-line pipeline visualization — a real flythrough, not decoration.
 * The whole group glides so the selected stage sits under the fixed camera;
 * selecting a stage in the accessible list above is what drives this motion.
 * Breathing/gliding/scanning only (Document 06) — never spins, never bounces.
 */
export function PipelineScene({
  stageCount,
  activeIndex,
  tier,
}: PipelineSceneProps) {
  const groupRef = useRef<Group>(null);
  const nodeRefs = useRef<Array<Mesh | null>>([]);
  const ringRef = useRef<Mesh>(null);
  const pulseRefs = useRef<Array<Mesh | null>>([]);
  const pulseState = useRef(
    Array.from({ length: PULSE_COUNT }, (_, index) => ({
      t: (index / PULSE_COUNT) * Math.max(stageCount - 1, 1),
    })),
  );

  const positions = useMemo<Vec3[]>(
    () =>
      Array.from({ length: stageCount }, (_, index) => [
        index * SPACING,
        Math.sin(index * 1.7) * 0.16,
        Math.cos(index * 1.3) * 0.3,
      ]),
    [stageCount],
  );

  const targetX = -activeIndex * SPACING;

  useFrame((state: RootState, delta: number) => {
    const group = groupRef.current;
    if (group) {
      group.position.x +=
        (targetX - group.position.x) * Math.min(delta * FOLLOW_RATE, 1);
      group.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
      group.rotation.y = Math.sin(state.clock.elapsedTime * 0.09) * 0.045;
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
      ringRef.current.rotation.z += delta * 0.15;
    }

    const maxT = Math.max(stageCount - 1, 1);
    pulseState.current.forEach((pulse, index) => {
      pulse.t += delta * PULSE_SPEED;
      if (pulse.t >= maxT) {
        pulse.t = 0;
      }
      const stage = Math.floor(pulse.t);
      const from = positions[stage];
      const to = positions[Math.min(stage + 1, stageCount - 1)];
      const mesh = pulseRefs.current[index];
      if (!from || !to || !mesh) return;
      const frac = pulse.t - stage;
      mesh.position.set(
        from[0] + (to[0] - from[0]) * frac,
        from[1] + (to[1] - from[1]) * frac,
        from[2] + (to[2] - from[2]) * frac,
      );
    });
  });

  const nodeScale = tier === "cinematic" ? 1 : 0.82;

  return (
    <group ref={groupRef}>
      {positions.slice(0, -1).map((from, index) => {
        const to = positions[index + 1];
        if (!to) return null;
        return (
          <Line
            key={`pipeline-edge-${index}`}
            points={[from, to]}
            color="#8f8c86"
            transparent
            opacity={0.22}
            lineWidth={0.6}
          />
        );
      })}

      {positions.map((position, index) => (
        <mesh
          key={`pipeline-node-${index}`}
          position={position}
          scale={nodeScale}
          ref={(node) => {
            nodeRefs.current[index] = node;
          }}
        >
          <icosahedronGeometry args={[0.11, 0]} />
          <meshBasicMaterial
            color={index === activeIndex ? "#eceae6" : "#c5c2bc"}
            transparent
            opacity={index === activeIndex ? 0.95 : 0.42}
          />
        </mesh>
      ))}

      <mesh ref={ringRef}>
        <torusGeometry args={[0.21, 0.007, 8, 32]} />
        <meshBasicMaterial color="#eceae6" transparent opacity={0.5} />
      </mesh>

      {pulseState.current.map((_, index) => (
        <mesh
          key={`pipeline-pulse-${index}`}
          ref={(node) => {
            pulseRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#eceae6" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

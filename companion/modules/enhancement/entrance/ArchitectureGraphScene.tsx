"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import type { SpatialTier } from "@/modules/enhancement/spatial";
import { generateArchitectureGraph } from "./generateArchitectureGraph";

type ArchitectureGraphSceneProps = {
  tier: SpatialTier;
};

const PULSE_COUNT = 5;
const PULSE_SPEED = 0.045;

/**
 * Abstract systems network — the "operating system" behind the identity.
 * Slow orbit only, signals drifting along edges. Never spins, never explodes.
 */
export function ArchitectureGraphScene({ tier }: ArchitectureGraphSceneProps) {
  const nodeCount = tier === "cinematic" ? 34 : 18;
  const graph = useMemo(
    () => generateArchitectureGraph(nodeCount),
    [nodeCount],
  );
  const groupRef = useRef<Group>(null);
  const nodeRefs = useRef<Array<Mesh | null>>([]);
  const pulseRefs = useRef<Array<Mesh | null>>([]);
  const pulseState = useRef(
    Array.from({ length: PULSE_COUNT }, (_, index) => ({
      edgeIndex: index % Math.max(graph.edges.length, 1),
      t: Math.random(),
    })),
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.012;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.055;
      groupRef.current.position.y = Math.sin(t * 0.18) * 0.04;
    }

    nodeRefs.current.forEach((mesh, index) => {
      if (!mesh) {
        return;
      }
      const breathe = 0.92 + Math.sin(t * 0.55 + index * 0.37) * 0.08;
      mesh.scale.setScalar(breathe);
      const material = mesh.material as MeshBasicMaterial;
      material.opacity = 0.38 + Math.sin(t * 0.4 + index) * 0.12;
    });

    pulseState.current.forEach((pulse, index) => {
      pulse.t += delta * PULSE_SPEED;
      if (pulse.t >= 1) {
        pulse.t = 0;
        pulse.edgeIndex = Math.floor(Math.random() * graph.edges.length);
      }

      const edge = graph.edges[pulse.edgeIndex];
      const mesh = pulseRefs.current[index];
      if (!edge || !mesh) {
        return;
      }

      const from = graph.nodes[edge.from]?.position;
      const to = graph.nodes[edge.to]?.position;
      if (!from || !to) {
        return;
      }

      // Ease through the edge so signals feel engineered, not linear.
      const ease = pulse.t * pulse.t * (3 - 2 * pulse.t);
      mesh.position.set(
        from[0] + (to[0] - from[0]) * ease,
        from[1] + (to[1] - from[1]) * ease,
        from[2] + (to[2] - from[2]) * ease,
      );
      const material = mesh.material as MeshBasicMaterial;
      material.opacity = 0.35 + Math.sin(ease * Math.PI) * 0.55;
      mesh.scale.setScalar(0.75 + Math.sin(ease * Math.PI) * 0.55);
    });
  });

  return (
    <group ref={groupRef}>
      {graph.edges.map((edge, index) => {
        const from = graph.nodes[edge.from]?.position;
        const to = graph.nodes[edge.to]?.position;
        if (!from || !to) {
          return null;
        }
        return (
          <Line
            key={`edge-${index}`}
            points={[from, to]}
            color="#8f8c86"
            transparent
            opacity={0.18}
            lineWidth={0.55}
          />
        );
      })}

      {graph.nodes.map((node, index) => (
        <mesh
          key={`node-${index}`}
          position={node.position}
          ref={(mesh) => {
            nodeRefs.current[index] = mesh;
          }}
        >
          <sphereGeometry args={[0.03, 10, 10]} />
          <meshBasicMaterial color="#d2d0cb" transparent opacity={0.5} />
        </mesh>
      ))}

      {pulseState.current.map((_, index) => (
        <mesh
          key={`pulse-${index}`}
          ref={(node) => {
            pulseRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.048, 10, 10]} />
          <meshBasicMaterial color="#eceae6" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

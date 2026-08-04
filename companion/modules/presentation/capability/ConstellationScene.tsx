"use client";

import { Line } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import type { SpatialTier } from "@/modules/enhancement/spatial";
import { MilkyWayField } from "./MilkyWayField";

type ConstellationNode = {
  id: string;
  x: number;
  y: number;
};

type ConstellationEdge = {
  fromId: string;
  toId: string;
};

type ConstellationSceneProps = {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
  viewBox: { width: number; height: number };
  activeId: string | null;
  connectedIds: Set<string>;
  tier: SpatialTier;
};

type Vec3 = [number, number, number];

/** Deterministic 0..1 hash — used only for depth/size variety, never identity. */
function hash01(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return (h % 1000) / 1000;
}

/** Same deterministic blueprint (x, y) as the accessible SVG — only the depth axis is new. */
function toScenePosition(
  node: ConstellationNode,
  viewBox: { width: number; height: number },
): Vec3 {
  const nx = (node.x / viewBox.width - 0.5) * 7.4;
  const ny = -(node.y / viewBox.height - 0.5) * 4.4;
  const nz = (hash01(node.id) - 0.5) * 2.6;
  return [nx, ny, nz];
}

/**
 * Real WebGL "Milky Way" of capabilities — each confirmed capability is a
 * star; the only lines drawn are confirmed Atlas/technology relations
 * already computed by `buildCapabilityAtlasModel`. Selecting or hovering a
 * capability in the accessible list re-emphasises its star and connections
 * here; nothing moves or connects without a confirmed reason (Document 06).
 */
export function ConstellationScene({
  nodes,
  edges,
  viewBox,
  activeId,
  connectedIds,
  tier,
}: ConstellationSceneProps) {
  const groupRef = useRef<Group>(null);
  const nodeRefs = useRef<Array<Mesh | null>>([]);
  const ringRef = useRef<Mesh>(null);

  const positioned = useMemo(
    () =>
      nodes.map((node) => ({
        node,
        position: toScenePosition(node, viewBox),
      })),
    [nodes, viewBox],
  );

  const positionById = useMemo(() => {
    const map = new Map<string, Vec3>();
    positioned.forEach(({ node, position }) => map.set(node.id, position));
    return map;
  }, [positioned]);

  useFrame((state: RootState, delta: number) => {
    const group = groupRef.current;
    const t = state.clock.elapsedTime;
    if (group) {
      group.rotation.y = Math.sin(t * 0.048) * 0.13 + t * 0.0055;
      group.rotation.x = Math.sin(t * 0.032) * 0.045;
      group.position.y = Math.sin(t * 0.16) * 0.03;
    }

    positioned.forEach(({ node }, index) => {
      const mesh = nodeRefs.current[index];
      if (!mesh) return;
      const isActive = node.id === activeId;
      const isConnected = connectedIds.has(node.id);
      const dimmed = Boolean(activeId) && !isActive && !isConnected;

      const breathe = 1 + Math.sin(t * 0.7 + index * 0.4) * 0.04;
      const targetScale = (isActive ? 1.95 : isConnected ? 1.32 : 1) * breathe;
      const nextScale = mesh.scale.x + (targetScale - mesh.scale.x) * 0.1;
      mesh.scale.set(nextScale, nextScale, nextScale);

      const material = mesh.material as MeshBasicMaterial;
      const targetOpacity = isActive
        ? 1
        : isConnected
          ? 0.88
          : dimmed
            ? 0.14
            : 0.52 + Math.sin(t * 0.5 + index) * 0.08;
      material.opacity += (targetOpacity - material.opacity) * 0.1;
    });

    if (ringRef.current) {
      const activePosition = activeId ? positionById.get(activeId) : undefined;
      if (activePosition) {
        ringRef.current.visible = true;
        ringRef.current.position.set(...activePosition);
        ringRef.current.rotation.z += delta * 0.28;
        ringRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.06);
      } else {
        ringRef.current.visible = false;
      }
    }
  });

  const starRadius = tier === "cinematic" ? 0.05 : 0.045;

  return (
    <group ref={groupRef}>
      <MilkyWayField tier={tier} />

      {edges.map((edge) => {
        const from = positionById.get(edge.fromId);
        const to = positionById.get(edge.toId);
        if (!from || !to) return null;
        const lit =
          Boolean(activeId) &&
          (edge.fromId === activeId ||
            edge.toId === activeId ||
            (connectedIds.has(edge.fromId) && connectedIds.has(edge.toId)));
        return (
          <Line
            key={`${edge.fromId}::${edge.toId}`}
            points={[from, to]}
            color={lit ? "#eceae6" : "#8f8c86"}
            transparent
            opacity={lit ? 0.5 : 0.1}
            lineWidth={lit ? 0.9 : 0.5}
          />
        );
      })}

      {positioned.map(({ node, position }, index) => (
        <mesh
          key={node.id}
          position={position}
          ref={(mesh) => {
            nodeRefs.current[index] = mesh;
          }}
        >
          <sphereGeometry args={[starRadius, 10, 10]} />
          <meshBasicMaterial color="#eceae6" transparent opacity={0.55} />
        </mesh>
      ))}

      <mesh ref={ringRef} visible={false}>
        <torusGeometry args={[0.14, 0.006, 8, 32]} />
        <meshBasicMaterial color="#eceae6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

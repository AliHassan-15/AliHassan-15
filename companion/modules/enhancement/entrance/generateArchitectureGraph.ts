export type GraphNode = {
  position: [number, number, number];
};

export type GraphEdge = {
  from: number;
  to: number;
};

export type ArchitectureGraph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

/** Deterministic PRNG — stable node layout across a session, no external seed dependency. */
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

/**
 * Abstract, unlabeled network — represents "systems thinking" atmospherically.
 * Never a claim about a specific real architecture (that belongs to project
 * chapters, sourced from confirmed evidence only).
 */
export function generateArchitectureGraph(
  nodeCount: number,
  seed = 7,
): ArchitectureGraph {
  const random = mulberry32(seed);
  const nodes: GraphNode[] = Array.from({ length: nodeCount }, () => ({
    position: [
      (random() - 0.5) * 8.5,
      (random() - 0.5) * 5.2,
      (random() - 0.5) * 3.6,
    ],
  }));

  const edges: GraphEdge[] = [];

  for (let i = 1; i < nodes.length; i += 1) {
    const currentPos = nodes[i]?.position;
    if (!currentPos) {
      continue;
    }
    let nearest = 0;
    let nearestDistance = Infinity;
    for (let j = 0; j < i; j += 1) {
      const candidate = nodes[j]?.position;
      if (!candidate) {
        continue;
      }
      const dx = currentPos[0] - candidate[0];
      const dy = currentPos[1] - candidate[1];
      const dz = currentPos[2] - candidate[2];
      const distance = dx * dx + dy * dy + dz * dz;
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = j;
      }
    }
    edges.push({ from: i, to: nearest });
  }

  const extraEdgeCount = Math.round(nodeCount * 0.25);
  for (let i = 0; i < extraEdgeCount; i += 1) {
    const from = Math.floor(random() * nodeCount);
    const to = Math.floor(random() * nodeCount);
    if (from !== to) {
      edges.push({ from, to });
    }
  }

  return { nodes, edges };
}

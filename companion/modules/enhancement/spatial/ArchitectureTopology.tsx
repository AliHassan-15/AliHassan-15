import type { CSSProperties } from "react";
import { Text } from "@/modules/presentation/primitives";
import { extractPipelineStages } from "./extractPipelineStages";
import styles from "./ArchitectureTopology.module.css";

type ArchitectureTopologyProps = {
  /** Confirmed architecture prose — stages extracted only when explicitly listed. */
  architectureText: string;
};

/**
 * One justified spatial experience: pipeline stage topology.
 * Flat ordered list is always complete. Depth is progressive enhancement.
 * Removable without destroying meaning (Document 32).
 */
export function ArchitectureTopology({
  architectureText,
}: ArchitectureTopologyProps) {
  const stages = extractPipelineStages(architectureText);

  if (!stages) {
    return null;
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Pipeline structure — stages from confirmed architecture
        </Text>
      </figcaption>
      <ol className={styles.list}>
        {stages.map((stage) => (
          <li key={stage} className={styles.listItem}>
            <Text as="span" size="body" tone="primary">
              {stage}
            </Text>
          </li>
        ))}
      </ol>
      <div className={styles.depth} aria-hidden="true">
        <div className={styles.stack}>
          {stages.map((stage, index) => (
            <div
              key={stage}
              className={styles.plane}
              style={
                {
                  "--eos-topology-index": String(index),
                } as CSSProperties
              }
            >
              {stage}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

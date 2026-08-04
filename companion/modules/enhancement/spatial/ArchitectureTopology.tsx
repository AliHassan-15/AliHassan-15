"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import { useOptionalWalkthrough } from "@/modules/presentation/eos/WalkthroughContext";
import {
  architectureStageAddress,
  focusMatchesItem,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import { extractPipelineStages } from "./extractPipelineStages";
import { inspectPipelineStage } from "./inspectPipelineStage";
import { PipelineFlythrough } from "./PipelineFlythrough";
import styles from "./ArchitectureTopology.module.css";

export type TopologyEvidenceLink = {
  href: string;
  label: string;
};

type ArchitectureTopologyProps = {
  /** Confirmed architecture prose — stages extracted only when explicitly listed. */
  architectureText: string;
  /** Confidence caption from the architecture EvidenceField. */
  confidenceCaption?: string;
  /** Formatted provenance labels from confirmed architecture artifacts. */
  artifacts?: string[];
  /** Atlas / network see-also already confirmed for this architecture section. */
  relatedEvidence?: TopologyEvidenceLink[];
};

/**
 * Pipeline stage topology as an engineering inspection tool.
 * Flat ordered list is always complete. Depth is progressive enhancement.
 * Selection inspects confirmed evidence only — never invents nodes.
 * Removable without destroying meaning (Document 32).
 */
export function ArchitectureTopology({
  architectureText,
  confidenceCaption,
  artifacts = [],
  relatedEvidence = [],
}: ArchitectureTopologyProps) {
  const stages = extractPipelineStages(architectureText);
  const groupId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const walkthrough = useOptionalWalkthrough();
  const engineering = useOptionalEngineeringContext();
  const architectureActive = walkthrough?.activeRoomId === "architecture";

  useEffect(() => {
    if (architectureActive) {
      setSelectedIndex(0);
    }
  }, [architectureActive]);

  useEffect(() => {
    if (!stages || !engineering?.focus) {
      return;
    }
    if (engineering.focus.kind !== "architecture-stage") {
      return;
    }
    const index = stages.findIndex(
      (stage) => architectureStageAddress(stage) === engineering.focus?.id,
    );
    if (index >= 0) {
      setSelectedIndex(index);
    }
  }, [engineering?.focus, stages]);

  if (!stages) {
    return null;
  }

  const confirmedStages = stages;
  const safeIndex = Math.min(selectedIndex, confirmedStages.length - 1);
  const inspection = inspectPipelineStage(
    architectureText,
    confirmedStages,
    safeIndex,
  );

  function publishFocus(index: number) {
    const stage = confirmedStages[index];
    if (!stage || !engineering) {
      return;
    }
    const address = architectureStageAddress(stage);
    engineering.setFocus({
      kind: "architecture-stage",
      id: address,
      label: stage,
      related: relatedEvidence.map((link) =>
        relatedRefFromLink(link.href, link.label),
      ),
      source: "architecture-topology",
    });
  }

  function selectStage(index: number, focus = false) {
    setSelectedIndex(index);
    publishFocus(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onStageKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectStage((index + 1) % confirmedStages.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectStage(
        (index - 1 + confirmedStages.length) % confirmedStages.length,
        true,
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectStage(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectStage(confirmedStages.length - 1, true);
    }
  }

  return (
    <figure
      className={styles.figure}
      data-eos-topology-emphasis={architectureActive ? "true" : "false"}
    >
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Pipeline inspection — stages from confirmed architecture
        </Text>
      </figcaption>

      <div
        className={styles.stageGroup}
        role="radiogroup"
        aria-label="Confirmed pipeline stages"
        id={groupId}
      >
        <ol className={styles.list}>
          {confirmedStages.map((stage, index) => {
            const selected = index === safeIndex;
            const address = architectureStageAddress(stage);
            const matched = focusMatchesItem(engineering?.focus ?? null, {
              kind: "architecture-stage",
              id: address,
              label: stage,
            });
            return (
              <li key={stage} className={styles.listItem}>
                <button
                  type="button"
                  role="radio"
                  className={styles.stageControl}
                  id={address}
                  data-eos-architecture-stage={address}
                  data-eos-eng-item=""
                  data-eos-eng-match={matched ? "true" : "false"}
                  data-eos-eng-camera="full"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  ref={(node) => {
                    controlRefs.current[index] = node;
                  }}
                  onClick={() => selectStage(index)}
                  onKeyDown={(event) => onStageKeyDown(event, index)}
                >
                  <Text as="span" size="caption" tone="tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Text as="span" size="body" tone="primary">
                    {stage}
                  </Text>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.depth} aria-hidden="true">
        <PipelineFlythrough
          stageCount={confirmedStages.length}
          activeIndex={safeIndex}
          className={styles.pipelineScene}
          fallback={
            <div className={styles.stack}>
              {confirmedStages.map((stage, index) => (
                <div
                  key={stage}
                  className={
                    index === safeIndex
                      ? `${styles.plane} ${styles.planeSelected}`
                      : styles.plane
                  }
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
          }
        />
      </div>

      {inspection ? (
        <div
          className={styles.plate}
          aria-live="polite"
          data-eos-topology-plate=""
        >
          <Text as="span" size="caption" tone="tertiary">
            Stage inspection · #{architectureStageAddress(inspection.stage)}
          </Text>

          <div className={styles.plateRow}>
            <Text as="span" size="caption" tone="tertiary">
              Stage
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {inspection.stage}
            </Text>
          </div>

          <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
            ↓
          </Text>

          <div className={styles.plateRow}>
            <Text as="span" size="caption" tone="tertiary">
              Position
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {inspection.position}
              {inspection.follows ? ` · follows ${inspection.follows}` : ""}
              {inspection.precedes ? ` · precedes ${inspection.precedes}` : ""}
            </Text>
          </div>

          <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
            ↓
          </Text>

          <div className={styles.plateRow}>
            <Text as="span" size="caption" tone="tertiary">
              Evidence
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {inspection.evidenceExcerpt ??
                "Named in the confirmed architecture stage list. No additional prose sentence names this stage."}
            </Text>
          </div>

          {confidenceCaption ? (
            <>
              <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
                ↓
              </Text>
              <div className={styles.plateRow}>
                <Text as="span" size="caption" tone="tertiary">
                  Confidence
                </Text>
                <Text as="span" size="body-sm" tone="secondary">
                  {confidenceCaption}
                </Text>
              </div>
            </>
          ) : null}

          {artifacts.length > 0 ? (
            <>
              <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
                ↓
              </Text>
              <div className={styles.plateBlock}>
                <Text as="span" size="caption" tone="tertiary">
                  Artifacts
                </Text>
                <ol
                  className={styles.artifactChain}
                  aria-label="Architecture artifacts"
                >
                  {artifacts.map((label) => (
                    <li key={label}>
                      <Text as="span" size="body-sm" tone="secondary">
                        {label}
                      </Text>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : null}

          {relatedEvidence.length > 0 ? (
            <>
              <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
                ↓
              </Text>
              <div className={styles.plateBlock}>
                <Text as="span" size="caption" tone="tertiary">
                  Related systems
                </Text>
                <ul className={styles.relatedList}>
                  {relatedEvidence.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} tone="secondary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}

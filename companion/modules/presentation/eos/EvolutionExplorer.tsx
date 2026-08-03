"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import type { EvolutionInspection } from "./inspectEvolution";
import styles from "./DecisionExplorer.module.css";

type EvolutionExplorerProps = {
  /** Precomputed inspections — server-built from confirmed chronology only. */
  inspections: EvolutionInspection[];
};

function PlateSeparator() {
  return (
    <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
      ↓
    </Text>
  );
}

function LinkBlock({
  title,
  links,
}: {
  title: string;
  links: EvolutionInspection["relatedArchitecture"];
}) {
  return (
    <div className={styles.plateBlock}>
      <Text as="span" size="caption" tone="tertiary">
        {title}
      </Text>
      {links.length > 0 ? (
        <ul className={styles.relatedList}>
          {links.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link href={link.href} tone="secondary">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Text as="span" size="body-sm" tone="tertiary">
          Missing
        </Text>
      )}
    </div>
  );
}

/**
 * Engineering Evolution Explorer — inspect confirmed chronology only.
 * Not a Git history viewer. Missing stays Missing. Deferred stays Deferred.
 */
export function EvolutionExplorer({ inspections }: EvolutionExplorerProps) {
  const groupId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (inspections.length === 0) {
    return null;
  }

  const safeIndex = Math.min(selectedIndex, inspections.length - 1);
  const inspection = inspections[safeIndex];
  if (!inspection) {
    return null;
  }

  function selectMilestone(index: number, focus = false) {
    setSelectedIndex(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onMilestoneKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectMilestone((index + 1) % inspections.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectMilestone(
        (index - 1 + inspections.length) % inspections.length,
        true,
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectMilestone(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectMilestone(inspections.length - 1, true);
    }
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Evolution inspection — milestones from confirmed chronology
        </Text>
      </figcaption>

      <div
        className={styles.decisionGroup}
        role="radiogroup"
        aria-label="Confirmed engineering milestones"
        id={groupId}
      >
        <ol className={styles.list}>
          {inspections.map((entry, index) => {
            const selectedControl = index === safeIndex;
            return (
              <li key={entry.id} className={styles.listItem}>
                <button
                  type="button"
                  role="radio"
                  className={styles.decisionControl}
                  aria-checked={selectedControl}
                  tabIndex={selectedControl ? 0 : -1}
                  ref={(node) => {
                    controlRefs.current[index] = node;
                  }}
                  onClick={() => selectMilestone(index)}
                  onKeyDown={(event) => onMilestoneKeyDown(event, index)}
                >
                  <Text as="span" size="caption" tone="tertiary">
                    {entry.dateText !== "Missing"
                      ? entry.dateText
                      : String(index + 1).padStart(2, "0")}
                  </Text>
                  <Text as="span" size="body" tone="primary">
                    {entry.label}
                  </Text>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        className={styles.plate}
        aria-live="polite"
        data-eos-evolution-plate=""
      >
        <Text as="span" size="caption" tone="tertiary">
          Evolution inspection · {inspection.label}
        </Text>

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Milestone
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.milestoneText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Date
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.dateText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Why the change happened
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.whyText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            What changed
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.whatChangedText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Engineering impact
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.impactText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Trade-offs introduced
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.tradeoffsText}
          </Text>
        </div>

        <PlateSeparator />

        <LinkBlock
          title="Validation affected"
          links={inspection.relatedValidation}
        />

        <PlateSeparator />

        <LinkBlock title="Related ADR" links={inspection.relatedAdr} />

        <PlateSeparator />

        <LinkBlock
          title="Related architecture"
          links={inspection.relatedArchitecture}
        />

        <PlateSeparator />

        <LinkBlock
          title="Related failure modes"
          links={inspection.relatedFailure}
        />

        <PlateSeparator />

        <LinkBlock
          title="Related Atlas systems"
          links={inspection.relatedSystems}
        />

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Evidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.evidenceText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Artifacts
          </Text>
          {inspection.artifacts.length > 0 ? (
            <ol
              className={styles.artifactChain}
              aria-label={`Artifacts for ${inspection.id}`}
            >
              {inspection.artifacts.map((label) => (
                <li key={label}>
                  <Text as="span" size="body-sm" tone="secondary">
                    {label}
                  </Text>
                </li>
              ))}
            </ol>
          ) : (
            <Text as="span" size="body-sm" tone="tertiary">
              Missing
            </Text>
          )}
        </div>

        <PlateSeparator />

        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Provenance
          </Text>
          {inspection.provenance.length > 0 &&
          inspection.provenance[0] !== "Missing" ? (
            <ol
              className={styles.artifactChain}
              aria-label={`Provenance for ${inspection.id}`}
            >
              {inspection.provenance.map((label) => (
                <li key={label}>
                  <Text as="span" size="body-sm" tone="secondary">
                    {label}
                  </Text>
                </li>
              ))}
            </ol>
          ) : (
            <Text as="span" size="body-sm" tone="tertiary">
              Missing
            </Text>
          )}
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Confidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.confidenceCaption}
          </Text>
        </div>
      </div>
    </figure>
  );
}

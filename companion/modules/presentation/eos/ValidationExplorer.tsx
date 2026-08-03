"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import { useOptionalWalkthrough } from "@/modules/presentation/eos/WalkthroughContext";
import {
  focusMatchesItem,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import type { ValidationInspection } from "./inspectValidation";
import styles from "./DecisionExplorer.module.css";

type ValidationExplorerProps = {
  /** Precomputed inspections — server-built from confirmed validation evidence only. */
  inspections: ValidationInspection[];
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
  links: ValidationInspection["relatedArchitecture"];
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
 * Engineering Validation Explorer — inspect how confidence was earned.
 * Receives server-built inspections only (no Node loaders on the client).
 * Missing stays Missing. Deferred stays Deferred.
 */
export function ValidationExplorer({ inspections }: ValidationExplorerProps) {
  const groupId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const walkthrough = useOptionalWalkthrough();
  const engineering = useOptionalEngineeringContext();

  useEffect(() => {
    if (walkthrough?.activeRoomId === "validation") {
      setSelectedIndex(0);
    }
  }, [walkthrough?.activeRoomId]);

  useEffect(() => {
    if (!engineering?.focus || inspections.length === 0) {
      return;
    }
    const index = inspections.findIndex((entry) =>
      focusMatchesItem(engineering.focus, {
        kind: "validation",
        id: entry.id,
        label: entry.label,
      }),
    );
    if (index >= 0) {
      setSelectedIndex(index);
    }
  }, [engineering?.focus, inspections]);

  if (inspections.length === 0) {
    return null;
  }

  const safeIndex = Math.min(selectedIndex, inspections.length - 1);
  const inspection = inspections[safeIndex];
  if (!inspection) {
    return null;
  }

  function publishFocus(index: number) {
    const entry = inspections[index];
    if (!entry || !engineering) {
      return;
    }
    engineering.setFocus(
      {
        kind: "validation",
        id: entry.id,
        label: entry.label,
        related: [
          ...entry.relatedArchitecture.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.relatedSystems.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
        ],
        source: "validation-explorer",
      },
      { syncHash: false },
    );
  }

  function selectMethod(index: number, focus = false) {
    setSelectedIndex(index);
    publishFocus(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onMethodKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectMethod((index + 1) % inspections.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectMethod((index - 1 + inspections.length) % inspections.length, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectMethod(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectMethod(inspections.length - 1, true);
    }
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Validation inspection — methods from confirmed engineering evidence
        </Text>
      </figcaption>

      <div
        className={styles.decisionGroup}
        role="radiogroup"
        aria-label="Confirmed validation methods"
        id={groupId}
      >
        <ol className={styles.list}>
          {inspections.map((entry, index) => {
            const selectedControl = index === safeIndex;
            const matched = focusMatchesItem(engineering?.focus ?? null, {
              kind: "validation",
              id: entry.id,
              label: entry.label,
            });
            return (
              <li key={entry.id} className={styles.listItem}>
                <button
                  type="button"
                  role="radio"
                  className={styles.decisionControl}
                  data-eos-eng-item=""
                  data-eos-eng-match={matched ? "true" : "false"}
                  aria-checked={selectedControl}
                  tabIndex={selectedControl ? 0 : -1}
                  ref={(node) => {
                    controlRefs.current[index] = node;
                  }}
                  onClick={() => selectMethod(index)}
                  onKeyDown={(event) => onMethodKeyDown(event, index)}
                >
                  <Text as="span" size="caption" tone="tertiary">
                    {String(index + 1).padStart(2, "0")}
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
        data-eos-validation-plate=""
      >
        <Text as="span" size="caption" tone="tertiary">
          Validation inspection · {inspection.label}
        </Text>

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Validation objective
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.objectiveText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Method
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.methodText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Why this method exists
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.whyText}
          </Text>
        </div>

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

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Confirmed outcome
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.outcomeText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Known limitations
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.limitationsText}
          </Text>
        </div>

        <PlateSeparator />

        <LinkBlock
          title="Related architecture"
          links={inspection.relatedArchitecture}
        />

        <PlateSeparator />

        <LinkBlock title="Related ADR" links={inspection.relatedAdr} />

        <PlateSeparator />

        <LinkBlock
          title="Related Atlas systems"
          links={inspection.relatedSystems}
        />

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

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Confidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.confidenceCaption}
          </Text>
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
      </div>
    </figure>
  );
}

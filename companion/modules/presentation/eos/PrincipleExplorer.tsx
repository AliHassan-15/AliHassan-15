"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import type { PrincipleInspection } from "./inspectPrinciple";
import styles from "./DecisionExplorer.module.css";

type PrincipleExplorerProps = {
  /** Precomputed inspections — server-built from Atlas systems with ≥3 projects. */
  inspections: PrincipleInspection[];
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
  links: PrincipleInspection["projects"];
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
 * Engineering Principles Explorer — beliefs evidenced across ≥3 confirmed projects.
 * Derived from Atlas systems only. Missing stays Missing.
 */
export function PrincipleExplorer({ inspections }: PrincipleExplorerProps) {
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

  function selectPrinciple(index: number, focus = false) {
    setSelectedIndex(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onPrincipleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectPrinciple((index + 1) % inspections.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectPrinciple(
        (index - 1 + inspections.length) % inspections.length,
        true,
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectPrinciple(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectPrinciple(inspections.length - 1, true);
    }
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Principle inspection — beliefs evidenced in ≥3 confirmed projects
        </Text>
      </figcaption>

      <div
        className={styles.decisionGroup}
        role="radiogroup"
        aria-label="Confirmed engineering principles"
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
                  onClick={() => selectPrinciple(index)}
                  onKeyDown={(event) => onPrincipleKeyDown(event, index)}
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
        data-eos-principle-plate=""
      >
        <Text as="span" size="caption" tone="tertiary">
          Principle inspection · {inspection.label}
        </Text>

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Principle
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.principleText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Engineering rationale
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.rationaleText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Why it exists
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.whyText}
          </Text>
        </div>

        <PlateSeparator />

        <LinkBlock
          title="Confirmed supporting projects"
          links={inspection.projects}
        />

        <PlateSeparator />

        <LinkBlock
          title="Supporting architecture"
          links={inspection.supportingArchitecture}
        />

        <PlateSeparator />

        <LinkBlock
          title="Supporting decisions"
          links={inspection.supportingDecisions}
        />

        <PlateSeparator />

        <LinkBlock
          title="Supporting validation"
          links={inspection.supportingValidation}
        />

        <PlateSeparator />

        <LinkBlock
          title="Supporting failure handling"
          links={inspection.supportingFailure}
        />

        <PlateSeparator />

        <LinkBlock
          title="Supporting evolution"
          links={inspection.supportingEvolution}
        />

        <PlateSeparator />

        <LinkBlock
          title="Supporting patterns"
          links={inspection.supportingPatterns}
        />

        <PlateSeparator />

        <LinkBlock title="Atlas systems" links={inspection.atlasSystems} />

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
          {inspection.provenance.length > 0 ? (
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

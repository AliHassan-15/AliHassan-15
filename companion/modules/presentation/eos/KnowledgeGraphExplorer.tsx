"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import {
  focusMatchesItem,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import type { KnowledgeNodeInspection } from "./inspectKnowledgeGraph";
import styles from "./DecisionExplorer.module.css";

type KnowledgeGraphExplorerProps = {
  /** Precomputed inspections — server-built from confirmed Atlas/network only. */
  inspections: KnowledgeNodeInspection[];
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
  links: KnowledgeNodeInspection["connected"];
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

function TextList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className={styles.plateBlock}>
      <Text as="span" size="caption" tone="tertiary">
        {title}
      </Text>
      {values.length > 0 ? (
        <ul className={styles.relatedList}>
          {values.map((value) => (
            <li key={value}>
              <Text as="span" size="body-sm" tone="secondary">
                {value}
              </Text>
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
 * Engineering Knowledge Graph — editorial relationship inspection.
 * No force simulation, WebGL, or decorative graphs.
 */
export function KnowledgeGraphExplorer({
  inspections,
}: KnowledgeGraphExplorerProps) {
  const groupId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const engineering = useOptionalEngineeringContext();

  useEffect(() => {
    if (!engineering?.focus || inspections.length === 0) {
      return;
    }
    const index = inspections.findIndex((entry) =>
      focusMatchesItem(engineering.focus, {
        kind: "knowledge",
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
        kind: "knowledge",
        id: entry.id,
        label: entry.label,
        related: [
          ...entry.connected.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.supportingProjects.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.references.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
        ],
        source: "knowledge-graph",
      },
      { syncHash: false },
    );
  }

  function selectNode(index: number, focus = false) {
    setSelectedIndex(index);
    publishFocus(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onNodeKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectNode((index + 1) % inspections.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectNode((index - 1 + inspections.length) % inspections.length, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectNode(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectNode(inspections.length - 1, true);
    }
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Knowledge inspection — confirmed entities and relationships only
        </Text>
      </figcaption>

      <div
        className={styles.decisionGroup}
        role="radiogroup"
        aria-label="Confirmed engineering knowledge graph entities"
        id={groupId}
      >
        <ol className={styles.list}>
          {inspections.map((entry, index) => {
            const selectedControl = index === safeIndex;
            const matched = focusMatchesItem(engineering?.focus ?? null, {
              kind: "knowledge",
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
                  onClick={() => selectNode(index)}
                  onKeyDown={(event) => onNodeKeyDown(event, index)}
                >
                  <Text as="span" size="caption" tone="tertiary">
                    {entry.kindLabel}
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
        data-eos-knowledge-plate=""
      >
        <Text as="span" size="caption" tone="tertiary">
          Knowledge inspection · {inspection.kindLabel}
        </Text>

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Entity
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.entityText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Description
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.descriptionText}
          </Text>
        </div>

        <PlateSeparator />

        <LinkBlock title="Connected entities" links={inspection.connected} />

        <PlateSeparator />

        <TextList title="Incoming relationships" values={inspection.incoming} />

        <PlateSeparator />

        <TextList title="Outgoing relationships" values={inspection.outgoing} />

        <PlateSeparator />

        <LinkBlock
          title="Supporting projects"
          links={inspection.supportingProjects}
        />

        <PlateSeparator />

        <LinkBlock
          title="Engineering references"
          links={inspection.references}
        />

        <PlateSeparator />

        <TextList title="Provenance" values={inspection.provenance} />

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

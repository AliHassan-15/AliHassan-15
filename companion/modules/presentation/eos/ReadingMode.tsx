"use client";

import { useEffect, useState } from "react";
import { Text } from "@/modules/presentation/primitives";
import styles from "./eos.module.css";

type ReadingPositionProps = {
  /** Root selector for sections with data-eos-section-title */
  rootId?: string;
};

/**
 * Quiet reading position — caption only, no floating progress bar.
 */
export function ReadingPosition({
  rootId = "eos-document",
}: ReadingPositionProps) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) {
      return;
    }

    const sections = root.querySelectorAll<HTMLElement>(
      "[data-eos-section-title]",
    );
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target;
        if (top instanceof HTMLElement) {
          const title = top.dataset.eosSectionTitle;
          if (title) {
            setLabel(title);
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [rootId]);

  if (!label) {
    return null;
  }

  return (
    <Text as="p" size="caption" tone="tertiary" className={styles.reading}>
      Reading · {label}
    </Text>
  );
}

type CopySectionLinkProps = {
  sectionId: string;
};

/**
 * Deep-link copy — publication behavior, not chrome.
 */
export function CopySectionLink({ sectionId }: CopySectionLinkProps) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={styles.copyLink}
      aria-label={`Copy link to ${sectionId}`}
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}

"use client";

import { Link, Text } from "@/modules/presentation/primitives";
import { useEngineeringFocus } from "./EngineeringContext";
import styles from "./EngineeringWorldPanel.module.css";

/**
 * Quiet inspection plate for the shared engineering focus.
 * Reuses confirmed related refs already attached to the focus object.
 */
export function EngineeringWorldPanel() {
  const focus = useEngineeringFocus();

  if (!focus) {
    return (
      <aside
        className={styles.panel}
        aria-label="Engineering world"
        data-eos-engineering-world-panel=""
      >
        <Text as="p" size="caption" tone="tertiary" className={styles.caption}>
          Engineering world
        </Text>
        <Text as="p" size="body-sm" tone="tertiary">
          Focus an architecture stage, decision, validation, capability, or
          journey station to inspect related confirmed surfaces.
        </Text>
      </aside>
    );
  }

  return (
    <aside
      className={styles.panel}
      aria-label="Engineering world"
      data-eos-engineering-world-panel=""
      data-eos-focus-kind={focus.kind}
      aria-live="polite"
    >
      <Text as="p" size="caption" tone="tertiary" className={styles.caption}>
        Engineering world · {focus.kind}
      </Text>
      <div className={styles.row}>
        <Text as="span" size="caption" tone="tertiary">
          Current object
        </Text>
        <Text as="span" size="body-sm" tone="secondary">
          {focus.label}
        </Text>
      </div>
      <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
        ↓
      </Text>
      <div className={styles.row}>
        <Text as="span" size="caption" tone="tertiary">
          Address
        </Text>
        <Text as="span" size="body-sm" tone="secondary">
          #{focus.id}
        </Text>
      </div>
      <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
        ↓
      </Text>
      <div className={styles.block}>
        <Text as="span" size="caption" tone="tertiary">
          Appears in / related
        </Text>
        {focus.related.length > 0 ? (
          <ul className={styles.list}>
            {focus.related.map((ref) => (
              <li key={`${ref.kind}-${ref.id}-${ref.href ?? ref.label}`}>
                {ref.href ? (
                  <Link href={ref.href} tone="secondary">
                    {ref.label}
                  </Link>
                ) : (
                  <Text as="span" size="body-sm" tone="secondary">
                    {ref.label}
                  </Text>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <Text as="span" size="body-sm" tone="tertiary">
            Missing
          </Text>
        )}
      </div>
    </aside>
  );
}

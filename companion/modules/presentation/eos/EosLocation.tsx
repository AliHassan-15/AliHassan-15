import { Stack } from "@/modules/presentation/layout";
import { Link, Text } from "@/modules/presentation/primitives";
import styles from "./eos.module.css";

export type EosLocationSegment = {
  label: string;
  href?: string;
};

type EosLocationProps = {
  segments: EosLocationSegment[];
  /** Accessible name for the location nav */
  label?: string;
};

/**
 * Quiet engineering location indicator — not breadcrumbs, not chrome.
 * Vertical editorial chain with ↓ between rooms.
 */
export function EosLocation({
  segments,
  label = "Engineering location",
}: EosLocationProps) {
  if (segments.length === 0) {
    return null;
  }

  return (
    <nav className={styles.location} aria-label={label}>
      <Stack gap={2}>
        {segments.map((segment, index) => (
          <div
            key={`${segment.label}-${index}`}
            className={styles.locationStep}
          >
            {index > 0 ? (
              <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
                ↓
              </Text>
            ) : null}
            {segment.href ? (
              <Link
                href={segment.href}
                tone="secondary"
                className={styles.locationLink}
              >
                {segment.label}
              </Link>
            ) : (
              <Text
                as="span"
                size="caption"
                tone="tertiary"
                className={styles.locationHere}
              >
                {segment.label}
              </Text>
            )}
          </div>
        ))}
      </Stack>
    </nav>
  );
}

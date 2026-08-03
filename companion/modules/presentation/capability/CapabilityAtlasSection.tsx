import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import { CapabilityAtlas } from "./CapabilityAtlas";
import styles from "./CapabilityAtlas.module.css";
import { buildCapabilityAtlasModel } from "./inspectCapability";

/**
 * Engineering Capability Atlas — living constellation of confirmed capabilities.
 * Derived from Atlas + confirmed project technologies. Missing stays Missing.
 */
export function CapabilityAtlasSection() {
  const model = buildCapabilityAtlasModel();

  return (
    <section
      className={styles.section}
      aria-labelledby="engineering-capability-atlas-heading"
      data-eos-section-title="Engineering capability atlas"
      id="engineering-capability-atlas"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <p className={styles.sectionLabel}>System 03 · Capabilities</p>
          <Heading level={2} id="engineering-capability-atlas-heading">
            Engineering Capability Atlas
          </Heading>
          <Paragraph tone="secondary">
            Inspect capabilities proven by confirmed systems — not skill badges.
            Nodes and connections come only from Atlas, project technologies,
            decisions, validation, and related evidence already present in EOS.
          </Paragraph>
        </Stack>

        {model.inspections.length > 0 ? (
          <CapabilityAtlas model={model} />
        ) : (
          <div className={styles.missingRow}>
            <Text as="span" size="caption" tone="tertiary">
              Capabilities
            </Text>
            <Text as="span" size="body-sm" tone="tertiary">
              Missing
            </Text>
          </div>
        )}
      </Stack>
    </section>
  );
}

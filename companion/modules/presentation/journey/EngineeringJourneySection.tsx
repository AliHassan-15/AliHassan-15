import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph } from "@/modules/presentation/primitives";
import { buildCapabilityAtlasModel } from "@/modules/presentation/capability/inspectCapability";
import { EngineeringJourney } from "./EngineeringJourney";
import { buildJourneyModel } from "./inspectJourney";
import styles from "./EngineeringJourney.module.css";

/**
 * Engineering Journey room — causal stations from confirmed Atlas evolution.
 */
export function EngineeringJourneySection() {
  const model = buildJourneyModel();
  const capabilityModel = buildCapabilityAtlasModel();

  return (
    <section
      className={styles.section}
      aria-labelledby="engineering-journey-heading"
      data-eos-section-title="Engineering journey"
      id="engineering-journey"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="engineering-journey-heading">
            Engineering Journey
          </Heading>
          <Paragraph tone="secondary">
            Causal stations from confirmed Atlas evolution — what changed in the
            engineering practice, not a career timeline. Missing remains
            Missing.
          </Paragraph>
        </Stack>
        <EngineeringJourney model={model} capabilityModel={capabilityModel} />
      </Stack>
    </section>
  );
}

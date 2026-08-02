import type { HonestyDisclosure } from "@/modules/meaning";
import { evidenceStatusCaption } from "@/modules/meaning";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import styles from "./EvidenceField.module.css";

type EvidenceFieldProps = {
  title: string;
  id: string;
  disclosure: HonestyDisclosure;
};

/**
 * Discovery-honest field — Confirmed shows value; Missing/Deferred stay visible.
 */
export function EvidenceField({ title, id, disclosure }: EvidenceFieldProps) {
  return (
    <section className={styles.root} aria-labelledby={id}>
      <div className={styles.header}>
        <Heading level={2} id={id}>
          {title}
        </Heading>
        <Text
          as="p"
          size="caption"
          tone="tertiary"
          className={styles.status}
          data-eos-evidence-status={disclosure.status}
        >
          {evidenceStatusCaption(disclosure)}
        </Text>
      </div>
      {disclosure.status === "confirmed" && disclosure.text ? (
        <Paragraph className={styles.body}>{disclosure.text}</Paragraph>
      ) : (
        <Paragraph tone="tertiary" className={styles.body}>
          {disclosure.status === "missing"
            ? "No confirmed evidence is recorded for this field."
            : "This field remains Deferred. It is not presented as complete."}
        </Paragraph>
      )}
    </section>
  );
}

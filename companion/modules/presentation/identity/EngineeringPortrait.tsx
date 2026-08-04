import { assetUrl } from "@/lib/site-url";
import { PortraitOrbitScene } from "@/modules/enhancement/entrance/PortraitOrbitScene";
import type { Identity } from "@/modules/meaning";
import styles from "./EngineeringPortrait.module.css";

export const PORTRAIT_ASSETS = {
  primary: assetUrl("/identity/portrait-primary.png"),
  primaryMd: assetUrl("/identity/portrait-primary-md.png"),
  left: assetUrl("/identity/portrait-left.png"),
  right: assetUrl("/identity/portrait-right.png"),
  signature: assetUrl("/identity/signature.png"),
  grain: assetUrl("/identity/grain.png"),
} as const;

type EngineeringPortraitProps = {
  identity: Identity;
  /** Serial plate mark — usually initials (AH). */
  presenceMark: string;
};

/**
 * Engineering Portrait — suspended specimen in a machined titanium carrier.
 * Does not replace the AH identity mark. Revealed by arrival lighting only.
 */
export function EngineeringPortrait({
  identity,
  presenceMark,
}: EngineeringPortraitProps) {
  const alt = `${identity.name}, ${identity.title}`;

  return (
    <figure
      className={styles.root}
      data-eos-portrait=""
      aria-labelledby="engineering-portrait-caption"
    >
      <div className={styles.carrier}>
        <div className={styles.orbit}>
          <PortraitOrbitScene />

          {/* Soft mirror-shadow tucked behind the head — not a full-box print */}
          <div className={styles.shadow} aria-hidden="true">
            <img
              className={styles.shadowImage}
              src={PORTRAIT_ASSETS.primary}
              alt=""
              width={942}
              height={1013}
              decoding="async"
              fetchPriority="low"
            />
          </div>

          <span
            className={`${styles.corner} ${styles.cornerTl}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerTr}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerBl}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerBr}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.tick} ${styles.tickTop}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.tick} ${styles.tickRight}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.tick} ${styles.tickBottom}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.tick} ${styles.tickLeft}`}
            aria-hidden="true"
          />
          <span className={styles.calA} aria-hidden="true" />
          <span className={styles.calB} aria-hidden="true" />

          <div className={styles.specimen}>
            <picture>
              <source
                media="(max-width: 720px)"
                srcSet={PORTRAIT_ASSETS.primaryMd}
              />
              <img
                className={styles.image}
                src={PORTRAIT_ASSETS.primary}
                alt={alt}
                width={942}
                height={1013}
                decoding="async"
                fetchPriority="low"
              />
            </picture>
            <span className={styles.matte} aria-hidden="true" />
          </div>
        </div>

        <figcaption className={styles.serial} id="engineering-portrait-caption">
          <span className={styles.serialMark}>{presenceMark}</span>
          <span className={styles.serialId}>EOS-P-01</span>
          <span className={styles.serialRef}>SPECIMEN</span>
        </figcaption>
      </div>

      <div className={styles.legend}>
        <p className={styles.legendName}>{identity.name}</p>
        <p className={styles.legendRole}>{identity.title}</p>
        <p className={styles.legendFocus}>{identity.opportunity}</p>
      </div>
    </figure>
  );
}

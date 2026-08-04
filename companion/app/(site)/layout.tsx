import type { ReactNode } from "react";
import { AudioProvider } from "@/modules/enhancement/audio";
import { MotionProvider } from "@/modules/enhancement/motion";
/**
 * Imported from the concrete file, not the `spatial` barrel: the barrel
 * also re-exports `SceneCanvas`, whose `next/dynamic()` call would
 * otherwise be pulled into this root layout's module graph — which wraps
 * every route — causing Next to reference the Three.js chunk from every
 * page instead of only the pages that actually render a scene (Rebuild M9).
 */
import { SpatialProvider } from "@/modules/enhancement/spatial/SpatialProvider";
import {
  EngineeringProvider,
  EngineeringWorldRoot,
} from "@/modules/presentation/engineering";
import { SiteShell } from "@/modules/presentation/shell";

type SiteLayoutProps = {
  children: ReactNode;
};

/**
 * Public Companion surfaces — enhancement providers scoped here (not internal).
 */
export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <MotionProvider>
      <SpatialProvider>
        <AudioProvider>
          <EngineeringProvider>
            <EngineeringWorldRoot>
              <SiteShell>{children}</SiteShell>
            </EngineeringWorldRoot>
          </EngineeringProvider>
        </AudioProvider>
      </SpatialProvider>
    </MotionProvider>
  );
}

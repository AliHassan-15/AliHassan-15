import type { ReactNode } from "react";
import { AudioProvider } from "@/modules/enhancement/audio";
import { MotionProvider } from "@/modules/enhancement/motion";
import { SpatialProvider } from "@/modules/enhancement/spatial";
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
          <SiteShell>{children}</SiteShell>
        </AudioProvider>
      </SpatialProvider>
    </MotionProvider>
  );
}

import type { MetadataRoute } from "next";
import { getIdentity } from "@/modules/meaning";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const identity = getIdentity();

  return {
    name: `${identity.name} — Engineering Operating System`,
    short_name: "EOS",
    description: identity.seniorSentence,
    start_url: "/",
    display: "standalone",
    background_color: "#070706",
    theme_color: "#ebe9e6",
    lang: "en",
  };
}

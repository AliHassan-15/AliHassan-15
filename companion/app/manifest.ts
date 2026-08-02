import type { MetadataRoute } from "next";
import { getIdentity } from "@/modules/meaning";

export default function manifest(): MetadataRoute.Manifest {
  const identity = getIdentity();

  return {
    name: `${identity.name} — Engineering Operating System`,
    short_name: "EOS",
    description: identity.seniorSentence,
    start_url: "/",
    display: "standalone",
    background_color: "#07090d",
    theme_color: "#fafbfc",
    lang: "en",
  };
}

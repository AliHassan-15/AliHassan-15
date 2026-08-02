import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/lib/site-url";
import { getIdentity } from "@/modules/meaning";
import {
  getThemeBootstrapScript,
  ThemeProvider,
} from "@/modules/presentation/theme";
import "@/styles/global.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--eos-font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--eos-font-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();
const identity = getIdentity();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${identity.name} — ${identity.title}`,
    template: `%s · ${identity.name}`,
  },
  description: identity.seniorSentence,
  applicationName: "EOS",
  authors: [{ name: identity.name, url: identity.githubProfileUrl }],
  creator: identity.name,
  keywords: [
    "Ali Hassan",
    "Engineering Operating System",
    "full-stack engineer",
    "AI engineer",
    "systems thinking",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EOS — Engineering Operating System",
    title: `${identity.name} — ${identity.title}`,
    description: identity.seniorSentence,
  },
  twitter: {
    card: "summary",
    title: `${identity.name} — ${identity.title}`,
    description: identity.seniorSentence,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#07090d" },
  ],
  colorScheme: "dark light",
  viewportFit: "cover",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: getThemeBootstrapScript() }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

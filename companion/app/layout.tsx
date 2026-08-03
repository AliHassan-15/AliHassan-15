import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { assetUrl, getSiteOrigin } from "@/lib/site-url";
import { getIdentity } from "@/modules/meaning";
import {
  getThemeBootstrapScript,
  ThemeProvider,
} from "@/modules/presentation/theme";
import "@/styles/global.css";

/** CSS public assets — must go through assetUrl (never root-absolute in CSS). */
const eosAssetGrain = `url("${assetUrl("/identity/grain.png")}")`;

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--eos-font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--eos-font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--eos-font-mono",
  display: "swap",
});

const siteOrigin = getSiteOrigin();
const identity = getIdentity();

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
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
    { media: "(prefers-color-scheme: light)", color: "#e8e7e4" },
    { media: "(prefers-color-scheme: dark)", color: "#060605" },
  ],
  colorScheme: "dark light",
  viewportFit: "cover",
};

type RootLayoutProps = {
  children: ReactNode;
};

const htmlAssetStyle = {
  ["--eos-asset-grain"]: eosAssetGrain,
} as CSSProperties;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      style={htmlAssetStyle}
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

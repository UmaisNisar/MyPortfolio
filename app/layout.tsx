import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

import { site } from "@/data/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { AppReadyProvider } from "@/components/providers/Preloader";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "creative developer",
    "frontend developer",
    "web design",
    "interaction design",
    "animation",
    "portfolio",
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${plexMono.variable} antialiased`}
    >
      <body className="grain bg-ink text-paper">
        <a
          href="#main"
          className="u-label sr-only z-300 bg-accent px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          SKIP TO CONTENT
        </a>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <AppReadyProvider>
              <TransitionProvider>
                <CustomCursor />
                <ScrollProgress />
                <Navbar />
                <main id="main">{children}</main>
                <Footer />
              </TransitionProvider>
            </AppReadyProvider>
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}

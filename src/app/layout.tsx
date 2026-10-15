import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/visual/ScrollProgress";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-tight",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const ibm = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frekanslab.com"),
  title: {
    default: "Frekans Teknik Cihazlar | Laboratuvar Cihazları ve Teknik Çözümler",
    template: "%s | Frekans",
  },
  description:
    "Frekans Teknik Cihazlar; laboratuvar cihazları, teknik çözümler, XRF sarf malzemeleri ve uygulama desteği sunar.",
  openGraph: {
    title: "Frekans Teknik Cihazlar | Laboratuvar Cihazları ve Teknik Çözümler",
    description:
      "Frekans Teknik Cihazlar; laboratuvar cihazları, teknik çözümler, XRF sarf malzemeleri ve uygulama desteği sunar.",
    locale: "tr_TR",
    type: "website",
    url: "https://frekanslab.com",
    siteName: "Frekans Teknik Cihazlar",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://frekanslab.com" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${interTight.variable} ${manrope.variable} ${ibm.variable} h-full`}
    >
      <body className="min-h-full bg-white text-[var(--frekans-text)] antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <PageTransition>
            <main className="relative">{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

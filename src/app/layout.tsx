import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight, Manrope } from "next/font/google";
import { CmsProvider } from "@/lib/cms/cms-context";
import { getCms } from "@/lib/cms/store";
import { SiteChrome } from "@/components/layout/SiteChrome";
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
  metadataBase: new URL("https://frekanslab.com.tr"),
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
    url: "https://frekanslab.com.tr",
    siteName: "Frekans Teknik Cihazlar",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://frekanslab.com.tr" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cms = await getCms();
  return (
    <html
      lang="tr"
      className={`${interTight.variable} ${manrope.variable} ${ibm.variable} h-full`}
    >
      <body className="min-h-full bg-white text-[var(--frekans-text)] antialiased">
        <CmsProvider content={cms}>
          <SiteChrome>{children}</SiteChrome>
        </CmsProvider>
      </body>
    </html>
  );
}

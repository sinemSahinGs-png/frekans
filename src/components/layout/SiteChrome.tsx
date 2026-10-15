"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/visual/ScrollProgress";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <main className="relative min-h-svh bg-[var(--frekans-navy-deep)]">{children}</main>;
  }

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Header />
      <PageTransition>
        <main className="relative">{children}</main>
      </PageTransition>
      <Footer />
    </SmoothScroll>
  );
}

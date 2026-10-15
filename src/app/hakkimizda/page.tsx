import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { FrekansWave } from "@/components/visual/FrekansWave";
import { getCms } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Hakkımızda" };

export default async function AboutPage() {
  const { about } = await getCms();
  return (
    <div className="container-wide pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-4">{about.eyebrow}</p>
      <h1 className="section-title max-w-4xl text-[var(--frekans-navy)]">{about.heading1} {about.heading2}</h1>
      <FrekansWave variant="divider" amplitude={0.3} className="my-10 max-w-xl" />
      <p className="max-w-3xl text-lg leading-relaxed text-[var(--frekans-muted)]">{about.body}</p>
      <p className="mt-6 max-w-3xl text-[var(--frekans-muted)]">
        {about.extra}
      </p>
      <div className="mt-10"><Button href="/iletisim">BİZE ULAŞIN</Button></div>
    </div>
  );
}

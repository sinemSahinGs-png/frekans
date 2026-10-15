import type { Metadata } from "next";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { FrekansWave } from "@/components/visual/FrekansWave";

export const metadata: Metadata = { title: "Hakkımızda" };

export default function AboutPage() {
  return (
    <div className="container-wide pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-4">KURUMSAL</p>
      <h1 className="section-title max-w-4xl text-[var(--frekans-navy)]">Frekans Hakkında</h1>
      <FrekansWave variant="divider" amplitude={0.3} className="my-10 max-w-xl" />
      <p className="max-w-3xl text-lg leading-relaxed text-[var(--frekans-muted)]">{site.about}</p>
      <p className="mt-6 max-w-3xl text-[var(--frekans-muted)]">
        Laboratuvar cihazları, teknik çözümler ve uygulama desteği alanında İstanbul Beşiktaş merkezli çalışırız.
      </p>
      <div className="mt-10"><Button href="/iletisim">BİZE ULAŞIN</Button></div>
    </div>
  );
}

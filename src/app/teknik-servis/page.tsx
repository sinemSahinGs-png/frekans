import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getCms } from "@/lib/cms/store";
import { splitLines } from "@/lib/cms/map";

export const metadata: Metadata = { title: "Teknik Servis" };

export default async function ServicePage() {
  const { services } = await getCms();
  const items = splitLines(services.items);
  return (
    <div className="container-wide pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-4">DESTEK</p>
      <h1 className="section-title max-w-4xl text-[var(--frekans-navy)]">{services.title}</h1>
      <p className="mt-6 max-w-2xl text-[var(--frekans-muted)]">
        {services.body}
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {items.map((t, i) => (
          <div key={t} className="border border-[var(--frekans-border)] p-6">
            <p className="font-mono text-xs text-[var(--frekans-green-dark)]">0{i + 1}</p>
            <h2 className="mt-3 font-display text-2xl text-[var(--frekans-navy)]">{t}</h2>
          </div>
        ))}
      </div>
      <div className="mt-10"><Button href="/iletisim">TEKNIK BILGI ISTE</Button></div>
    </div>
  );
}

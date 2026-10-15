import type { Metadata } from "next";
import { documents } from "@/data/documents";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Dokumanlar" };

export default function DocumentsPage() {
  return (
    <div className="container-wide pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-4">KAYNAKLAR</p>
      <h1 className="section-title text-[var(--frekans-navy)]">Dokumanlar</h1>
      {documents.length === 0 ? (
        <p className="mt-6 max-w-xl text-[var(--frekans-muted)]">
          Broşur ve teknik belgeler henuz bu arsive eklenmedi. Dokuman talebi icin iletisime gecin.
        </p>
      ) : (
        <ul className="mt-10 divide-y divide-[var(--frekans-border)]">
          {documents.map((d) => (
            <li key={d.title} className="flex items-center justify-between py-5">
              <div>
                <p className="font-display text-xl">{d.title}</p>
                <p className="font-mono text-xs text-[var(--frekans-muted)]">{d.category} · {d.type}</p>
              </div>
              <a href={d.href} className="text-sm text-[var(--frekans-navy)]">Indir</a>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10"><Button href="/iletisim">TEKNIK BILGI ISTE</Button></div>
    </div>
  );
}

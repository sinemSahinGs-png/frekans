"use client";

import { Button } from "@/components/ui/Button";
import { useCms } from "@/lib/cms/cms-context";
import { splitLines } from "@/lib/cms/map";

export function ServiceSection() {
  const { services } = useCms();
  const nodes = splitLines(services.items);
  return (
    <section className="bg-[var(--frekans-navy-deep)] py-20 text-[var(--frekans-offwhite)] md:py-28">
      <div className="container-wide">
        <p className="eyebrow mb-4 !text-white/50">TEKNİK SERVİS</p>
        <h2 className="section-title max-w-4xl">{services.title}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {nodes.map((t, i) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <p className="font-mono text-xs text-[var(--frekans-green-bright)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-2xl">{t}</h3>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/teknik-servis" className="!bg-white !text-[var(--frekans-navy)] hover:!bg-[var(--frekans-green)] hover:!text-white">
            TEKNİK SERVİS
          </Button>
        </div>
      </div>
    </section>
  );
}

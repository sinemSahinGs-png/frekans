import { Button } from "@/components/ui/Button";
import { FrekansWave } from "@/components/visual/FrekansWave";

const nodes = [
  { n: "01", t: "Kurulum" },
  { n: "02", t: "Teknik Destek" },
  { n: "03", t: "Uygulama Desteği" },
  { n: "04", t: "Bakım" },
];

export function ServiceSection() {
  return (
    <section className="bg-[var(--frekans-navy-deep)] py-20 text-[var(--frekans-offwhite)] md:py-28">
      <div className="container-wide">
        <p className="eyebrow mb-4 !text-white/50">TEKNİK SERVİS</p>
        <h2 className="section-title max-w-4xl">Teknik destek cihaz kadar önemlidir.</h2>
        <FrekansWave variant="divider" amplitude={0.4} className="my-10 opacity-80" />
        <div className="grid gap-8 md:grid-cols-4">
          {nodes.map((n) => (
            <div key={n.n} className="border-t border-white/15 pt-5">
              <p className="font-mono text-xs text-[var(--frekans-green-bright)]">{n.n}</p>
              <h3 className="mt-3 font-display text-2xl">{n.t}</h3>
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

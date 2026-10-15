import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { FrekansWave } from "@/components/visual/FrekansWave";

const items = [
  { n: "01", t: "Laboratuvar cihazları", d: "Mevcut katalogdaki sistemler ve sarf çözümleri." },
  { n: "02", t: "Teknik çözüm", d: "İhtiyaca uygun cihaz ve uygulama yönlendirmesi." },
  { n: "03", t: "Uygulama desteği", d: "Kullanım ve süreç eşliğinde teknik iletişim." },
  { n: "04", t: "Satış sonrası destek", d: "Kurulum, bakım ve teknik servis yaklaşımı." },
];

export function Intro() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-wide">
        <FrekansWave variant="divider" amplitude={0.25} className="mb-12 opacity-60" />
        <MaskedHeading className="section-title max-w-4xl text-[var(--frekans-navy)]" lines={["Laboratuvarınız", "için doğru teknoloji."]} />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.n} className="border-t border-[var(--frekans-border)] pt-5">
              <p className="font-mono text-xs text-[var(--frekans-green-dark)]">{item.n}</p>
              <h3 className="mt-3 font-display text-xl text-[var(--frekans-navy)]">{item.t}</h3>
              <p className="mt-2 text-sm text-[var(--frekans-muted)]">{item.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

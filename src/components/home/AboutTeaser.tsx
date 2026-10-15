import Image from "next/image";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

export function AboutTeaser() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-wide grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[var(--frekans-navy)]/15">
          <Image
            src="/about-frekans-lab.jpg"
            alt="Frekans ekibi laboratuvar ortamında cihaz ve uygulama desteği sunuyor"
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-[42%_50%]"
          />
        </div>
        <div>
          <p className="eyebrow mb-4">FREKANS HAKKINDA</p>
          <MaskedHeading className="section-title text-[var(--frekans-navy)]" lines={["Takım ruhu.", "Yapıcı yaklaşım."]} />
          <p className="mt-6 text-[18px] leading-relaxed text-[var(--frekans-muted)]">{site.about}</p>
          <div className="mt-8">
            <Button href="/hakkimizda" variant="secondary">
              HAKKIMIZDA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

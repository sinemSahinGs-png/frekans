import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

export function AboutTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">FREKANS HAKKINDA</p>
          <MaskedHeading className="section-title text-[var(--frekans-navy)]" lines={["Takım ruhu.", "Yapıcı yaklaşım."]} />
        </div>
        <div>
          <p className="text-[18px] leading-relaxed text-[var(--frekans-muted)]">{site.about}</p>
          <div className="mt-8">
            <Button href="/hakkimizda" variant="secondary">HAKKIMIZDA</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

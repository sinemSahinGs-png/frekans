"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { useCms } from "@/lib/cms/cms-context";

export function AboutTeaser() {
  const { about } = useCms();
  return (
    <section className="py-14 md:py-20">
      <div className="container-wide grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[var(--frekans-navy)]/15">
          {about.image ? (
            <Image
              src={about.image}
              alt={about.heading1}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-[42%_50%]"
            />
          ) : null}
        </div>
        <div>
          <p className="eyebrow mb-4">{about.eyebrow}</p>
          <MaskedHeading className="section-title text-[var(--frekans-navy)]" lines={[about.heading1, about.heading2]} />
          <p className="mt-6 text-[18px] leading-relaxed text-[var(--frekans-muted)]">{about.body}</p>
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

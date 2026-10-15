"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/product/ProductVisual";
import { cn } from "@/lib/utils";

const featuredCopy: Record<
  string,
  { category: string; description: string; secondaryLabel: string }
> = {
  "new-human-power": {
    category: "Laboratuvar Su Sistemleri",
    description:
      "Reverse osmoz ve saf su ihtiyaçlarını tek sistem yaklaşımında bir araya getiren laboratuvar su çözümü.",
    secondaryLabel: "TEKNİK BİLGİ İSTE",
  },
  "labtech-chiller": {
    category: "Sıcaklık Kontrolü",
    description: "Hassas sıcaklık kontrolü gerektiren laboratuvar uygulamaları için tasarlanmış kompakt chiller çözümü.",
    secondaryLabel: "TEKLİF AL",
  },
  "xray-flux": {
    category: "XRF Numune Hazırlama",
    description: "XRF numune hazırlama süreçlerinde kullanılan lityum tetraborat bazlı ergitme kimyasalları.",
    secondaryLabel: "BİLGİ İSTE",
  },
};

export function ProductShowcase() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || reduce) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-product-row]").forEach((row) => {
          const visual = row.querySelector<HTMLElement>("[data-product-visual]");
          const photo = row.querySelector<HTMLElement>(".product-photo");
          const signal = row.querySelector<HTMLElement>(".product-signal");
          const scan = row.querySelector<HTMLElement>(".product-scan");
          const index = row.querySelector<HTMLElement>(".product-index");
          const copy = row.querySelector<HTMLElement>("[data-product-copy]");
          const cta = row.querySelector<HTMLElement>("[data-product-cta]");

          gsap.set(row, { autoAlpha: 0, y: 36 });
          if (visual) gsap.set(visual, { clipPath: "inset(0 100% 0 0)" });
          if (photo) gsap.set(photo, { filter: "blur(10px)", scale: 1.04 });
          gsap.set([index, copy, cta].filter(Boolean), { opacity: 0, y: 14 });
          if (signal) gsap.set(signal, { scaleX: 0, transformOrigin: "left center" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              once: true,
            },
          });

          tl.to(row, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });

          if (index) tl.to(index, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
          if (signal) tl.to(signal, { scaleX: 1, duration: 0.45, ease: "power2.out" }, 0.08);
          if (visual) tl.to(visual, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out" }, 0.16);
          if (photo) tl.to(photo, { filter: "blur(0px)", scale: 1, duration: 0.85, ease: "power2.out" }, 0.28);
          if (scan) {
            tl.fromTo(
              scan,
              { top: "0%", opacity: 0.7 },
              { top: "100%", opacity: 0, duration: 0.65, ease: "power1.inOut" },
              0.48,
            );
          }
          if (copy) tl.to(copy, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.42);
          if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.58);
        });
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduce]);

  return (
    <section ref={sectionRef} className="bg-[var(--frekans-offwhite)] py-8 md:py-12">
      <div className="container-wide">
        <div className="space-y-[18vh] md:space-y-[28vh]">
          {products.map((p, i) => {
            const copy = featuredCopy[p.slug];
            const reverse = i % 2 === 1;
            return (
              <article
                key={p.slug}
                data-product-row
                className={cn(
                  "product-row-staged grid min-h-[88svh] items-center gap-8 lg:gap-14",
                  reverse
                    ? "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:[&>*:first-child]:order-2"
                    : "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]",
                )}
              >
                <div data-product-visual>
                  <ProductVisual
                    slug={p.slug}
                    showIndex={p.number}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 60vw"
                    className="aspect-[4/3] min-h-[240px] w-full md:aspect-[5/4] md:min-h-[420px] xl:min-h-[540px]"
                  />
                </div>
                <div>
                  <div data-product-copy>
                    <p className="eyebrow">{copy?.category ?? p.category}</p>
                    <h3 className="product-title mt-3 text-[var(--frekans-navy)]">{p.title}</h3>
                    <p className="mt-4 max-w-lg text-[17px] text-[var(--frekans-muted)] md:text-[18px]">
                      {copy?.description ?? p.short}
                    </p>
                  </div>
                  <div data-product-cta className="mt-7 flex flex-wrap gap-3">
                    <Button href={`/urunler/${p.slug}`}>ÜRÜNÜ İNCELE</Button>
                    <Button href={`/iletisim?urun=${p.slug}`} variant="secondary">
                      {copy?.secondaryLabel ?? "TEKLİF AL"}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-16">
          <Link href="/urunler" className="font-mono text-xs tracking-[0.18em] text-[var(--frekans-navy)] hover:text-[var(--frekans-green-dark)]">
            TÜM ÜRÜNLER →
          </Link>
        </div>
      </div>
    </section>
  );
}

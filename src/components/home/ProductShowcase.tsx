"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

  return (
    <section className="bg-[var(--frekans-offwhite)] py-12 md:py-16">
      <div className="container-wide">
        <div className="space-y-16 md:space-y-24">
          {products.map((p, i) => {
            const copy = featuredCopy[p.slug];
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={p.slug}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "grid items-center gap-8 lg:gap-14",
                  reverse
                    ? "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:[&>*:first-child]:order-2"
                    : "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]",
                )}
              >
                <ProductVisual
                  slug={p.slug}
                  showIndex={p.number}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 60vw"
                  className="aspect-[4/3] min-h-[220px] w-full md:aspect-[5/4] md:min-h-[380px] xl:min-h-[480px]"
                />
                <div>
                  <p className="eyebrow">{copy?.category ?? p.category}</p>
                  <h3 className="product-title mt-3 text-[var(--frekans-navy)]">{p.title}</h3>
                  <p className="mt-4 max-w-lg text-[17px] text-[var(--frekans-muted)] md:text-[18px]">
                    {copy?.description ?? p.short}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button href={`/urunler/${p.slug}`}>ÜRÜNÜ İNCELE</Button>
                    <Button href={`/iletisim?urun=${p.slug}`} variant="secondary">
                      {copy?.secondaryLabel ?? "TEKLİF AL"}
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
        <div className="mt-12">
          <Link href="/urunler" className="font-mono text-xs tracking-[0.18em] text-[var(--frekans-navy)] hover:text-[var(--frekans-green-dark)]">
            TÜM ÜRÜNLER →
          </Link>
        </div>
      </div>
    </section>
  );
}

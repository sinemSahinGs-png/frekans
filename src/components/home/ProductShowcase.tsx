"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[var(--frekans-offwhite)] py-20 md:py-28">
      <div className="container-wide">
        <p className="eyebrow mb-4">ÇÖZÜMLER</p>
        <MaskedHeading className="section-title text-[var(--frekans-navy)]" lines={["Laboratuvar", "çözümleri"]} />
        <div className="mt-16 space-y-20">
          {products.map((p, i) => (
            <article key={p.slug} className={cn("grid items-center gap-10 lg:grid-cols-2", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/4] overflow-hidden rounded-[10px] border border-[var(--frekans-border)] bg-white"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      p.accent === "green"
                        ? "linear-gradient(145deg,#EEF3F5 0%,#d9efe4 45%,#0B2857 160%)"
                        : "linear-gradient(145deg,#F6F8FA 0%,#d5deea 50%,#061A39 140%)",
                  }}
                />
                <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full opacity-80" aria-hidden>
                  <rect x="70" y="70" width="260" height="180" rx="6" fill="none" stroke="#0B2857" strokeOpacity="0.25" />
                  <path d="M90 180 C140 120, 180 240, 230 160 C280 90, 320 200, 350 150" fill="none" stroke="#00A84F" strokeWidth="2" />
                  <circle cx="230" cy="160" r="4" fill="#00A84F" />
                </svg>
                <span className="absolute left-5 top-5 font-mono text-xs tracking-[0.2em] text-[var(--frekans-navy)]/50">{p.number}</span>
              </motion.div>
              <div>
                <p className="eyebrow">{p.category}</p>
                <h3 className="product-title mt-3 text-[var(--frekans-navy)]">{p.title}</h3>
                <p className="mt-4 max-w-lg text-[var(--frekans-muted)]">{p.short}</p>
                <div className="mt-7">
                  <Button href={`/urunler/${p.slug}`}>DETAYLARI İNCELE</Button>
                </div>
              </div>
            </article>
          ))}
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

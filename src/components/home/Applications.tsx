"use client";

import { motion, useReducedMotion } from "framer-motion";
import { applications } from "@/data/applications";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

export function Applications() {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <p className="eyebrow mb-4">UYGULAMA ALANLARI</p>
        <MaskedHeading className="section-title max-w-3xl text-[var(--frekans-navy)]" lines={["Numune, hazırlık,", "analiz, sonuç."]} />
        <svg viewBox="0 0 800 40" className="mt-10 w-full max-w-3xl" aria-hidden>
          <path d="M10 20 H790" stroke="#0B2857" strokeOpacity="0.15" />
          <motion.path
            d="M10 20 H790"
            stroke="#00A84F"
            fill="none"
            strokeWidth="2"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {applications.map((app, i) => (
            <motion.article
              key={app.slug}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="border-l border-[var(--frekans-border)] pl-4"
            >
              <p className="font-mono text-xs text-[var(--frekans-green-dark)]">0{i + 1}</p>
              <h3 className="mt-2 font-display text-lg text-[var(--frekans-navy)]">{app.title}</h3>
              <p className="mt-2 text-sm text-[var(--frekans-muted)]">{app.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

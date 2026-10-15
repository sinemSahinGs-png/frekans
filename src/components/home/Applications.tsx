"use client";

import { motion, useReducedMotion } from "framer-motion";
import { applications } from "@/data/applications";

export function Applications() {
  const reduce = useReducedMotion();
  return (
    <section className="py-10 md:py-14">
      <div className="container-wide">
        <p className="eyebrow mb-2">UYGULAMA ALANLARI</p>
        <h2 className="font-display text-3xl tracking-tight text-[var(--frekans-navy)] md:text-4xl">
          Numune, hazırlık, analiz, sonuç.
        </h2>
        <div className="mt-6 grid gap-4 border-t border-[var(--frekans-border)] pt-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {applications.map((app, i) => (
            <motion.article
              key={app.slug}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="border-l border-[var(--frekans-border)] pl-3"
            >
              <p className="font-mono text-xs text-[var(--frekans-green-dark)]">0{i + 1}</p>
              <h3 className="mt-1 font-display text-base text-[var(--frekans-navy)] md:text-lg">{app.title}</h3>
              <p className="mt-1 text-sm leading-snug text-[var(--frekans-muted)]">{app.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

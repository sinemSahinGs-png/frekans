"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCms } from "@/lib/cms/cms-context";

export function Intro() {
  const reduce = useReducedMotion();
  const { intro: items } = useCms();

  return (
    <section className="relative bg-white py-12 md:py-16">
      <div className="container-wide grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {items.map((item, i) => (
          <motion.article
            key={item.n}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: i === 0 ? "0px" : "0px 0px -12% 0px" }}
            transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[var(--frekans-border)] pt-5"
          >
            <p className="font-mono text-sm tracking-[0.22em] text-[var(--frekans-green-dark)]">{item.n}</p>
            <h2 className="mt-3 font-display text-2xl text-[var(--frekans-navy)] md:text-3xl">{item.t}</h2>
            <p className="mt-3 text-[var(--frekans-muted)]">{item.d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

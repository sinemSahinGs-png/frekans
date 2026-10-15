"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FrequencyField } from "@/components/visual/FrequencyField";
import { FrekansWave } from "@/components/visual/FrekansWave";
import { LabGrid } from "@/components/visual/LabGrid";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  return (
    <section ref={ref} className="relative min-h-[90svh] overflow-hidden pt-24 md:min-h-[100svh]">
      <LabGrid />
      <FrequencyField className="pointer-events-none absolute inset-x-0 bottom-[18%] h-40 w-full opacity-70" />
      <motion.div style={reduce ? undefined : { y, opacity }} className="container-wide relative z-10 grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16">
        <div>
          <motion.p
            className="eyebrow mb-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            LABORATORY / PRECISION / SIGNAL
          </motion.p>
          <h1 className="hero-title text-[var(--frekans-navy)]">
            {["LABORATUVAR", "TEKNOLOJİSİNDE", "DOĞRU FREKANS."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%", opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 1.4 + i * 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-[17px] text-[var(--frekans-muted)] md:text-[19px]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.6 }}
          >
            Laboratuvar cihazları, teknik çözümler ve uygulama desteği için güvenilir teknoloji ortağınız.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.55 }}
          >
            <Button href="/urunler">ÜRÜNLERİ KEŞFET</Button>
            <Button href="/iletisim" variant="secondary">BİZE ULAŞIN</Button>
          </motion.div>
          <motion.div
            className="mt-10 flex gap-8 font-mono text-[0.65rem] tracking-[0.18em] text-[var(--frekans-muted)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            <span>SAF SU</span>
            <span>CHILLER</span>
            <span>XRF SARF</span>
          </motion.div>
        </div>
        <div className="relative">
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <FrekansWave interactive amplitude={1} />
          </motion.div>
          <p className="mt-4 text-center font-mono text-[0.62rem] tracking-[0.2em] text-[var(--frekans-muted)]">
            FREKANS TEKNİK CİHAZLAR LTD. ŞTİ.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/lib/cms/cms-context";
import { splitLines } from "@/lib/cms/map";

export function Hero() {
  const reduce = useReducedMotion();
  const { hero } = useCms();
  const tags = splitLines(hero.tags);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  useEffect(() => {
    const video = videoRef.current;
    const section = ref.current;
    if (!video || !section) return;

    if (reduce) {
      video.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    io.observe(section);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section ref={ref} className="relative min-h-[90svh] overflow-hidden bg-[var(--frekans-navy-deep)] pt-24 md:min-h-[100svh]">
      <video
        key={hero.videoUrl}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={hero.videoUrl || "/hero.mp4"} type="video/mp4" />
      </video>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--frekans-navy-deep)]/82 via-[var(--frekans-navy-deep)]/55 to-[var(--frekans-navy)]/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--frekans-navy-deep)]/75 via-transparent to-[var(--frekans-navy-deep)]/45"
        aria-hidden
      />

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="container-wide relative z-10 flex min-h-[calc(90svh-6rem)] items-center pb-16 pt-10 md:min-h-[calc(100svh-6rem)] lg:pt-16"
      >
        <div className="w-full max-w-[1100px]">
          <motion.p
            className="eyebrow mb-6 !text-white/70"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            {hero.eyebrow}
          </motion.p>
          <h1 className="hero-title text-white">
            {[hero.titleLine1, hero.titleLine2].map((line, i) => (
              <span key={`${line}-${i}`} className="block overflow-hidden">
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
            className="mt-6 max-w-xl text-[17px] text-white/78 md:text-[19px]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.6 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.55 }}
          >
            <Button href="/urunler" className="bg-white text-[var(--frekans-navy)] hover:bg-[var(--frekans-green)] hover:text-white">
              {hero.primaryCta}
            </Button>
            <Button
              href="/iletisim"
              variant="secondary"
              className="border-white/30 bg-white/8 text-white hover:border-white hover:bg-white hover:text-[var(--frekans-navy)]"
            >
              {hero.secondaryCta}
            </Button>
          </motion.div>
          <motion.div
            className="mt-10 flex gap-8 font-mono text-[0.65rem] tracking-[0.18em] text-white/55"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

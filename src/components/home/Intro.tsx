"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const items = [
  { n: "01", t: "Laboratuvar cihazları", d: "Mevcut katalogdaki sistemler ve sarf çözümleri." },
  { n: "02", t: "Teknik çözüm", d: "İhtiyaca uygun cihaz ve uygulama yönlendirmesi." },
  { n: "03", t: "Uygulama desteği", d: "Kullanım ve süreç eşliğinde teknik iletişim." },
  { n: "04", t: "Satış sonrası destek", d: "Kurulum, bakım ve teknik servis yaklaşımı." },
];

export function Intro() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    let ctx: { revert: () => void } | undefined;
    let mm: { add: (query: string, fn: () => void) => unknown; revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        const slides = gsap.utils.toArray<HTMLElement>("[data-intro-step]");
        if (!mm) return;

        mm.add("(min-width: 768px)", () => {
          gsap.set(slides, { autoAlpha: 0, y: 24 });
          if (slides[0]) gsap.set(slides[0], { autoAlpha: 1, y: 0 });

          ScrollTrigger.create({
            trigger: section,
            start: "top 80px",
            end: "+=220%",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate: (self) => {
              const i = Math.min(slides.length - 1, Math.floor(self.progress * 0.999 * slides.length));
              slides.forEach((el, idx) => {
                gsap.to(el, {
                  autoAlpha: idx === i ? 1 : 0,
                  y: idx === i ? 0 : 16,
                  duration: 0.25,
                  overwrite: "auto",
                });
              });
            },
          });
        });

        mm.add("(max-width: 767px)", () => {
          slides.forEach((slide, idx) => {
            gsap.set(slide, { autoAlpha: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 28 });
            ScrollTrigger.create({
              trigger: slide,
              start: "top 78%",
              once: true,
              onEnter: () => gsap.to(slide, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }),
            });
          });
        });
      }, section);
    });

    return () => {
      cancelled = true;
      mm?.revert();
      ctx?.revert();
    };
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative bg-white">
      <div className="container-wide relative flex min-h-[72svh] flex-col justify-center py-10 md:block md:py-14">
        {items.map((item, index) => (
          <article
            key={item.n}
            data-intro-step
            className={
              reduce
                ? `w-full max-w-3xl ${index === 0 ? "" : "mt-10"}`
                : "relative flex min-h-[72svh] w-full max-w-3xl flex-col justify-center md:absolute md:inset-x-0 md:top-1/2 md:min-h-0 md:-translate-y-1/2"
            }
          >
            <p className="font-mono text-sm tracking-[0.22em] text-[var(--frekans-green-dark)]">{item.n}</p>
            <h2 className="section-title mt-4 text-[var(--frekans-navy)]">{item.t}</h2>
            <p className="mt-5 max-w-xl text-lg text-[var(--frekans-muted)]">{item.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;
    let destroyed = false;
    let lenis: { destroy: () => void } | null = null;

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, gsap, { ScrollTrigger }]) => {
        if (destroyed) return;
        gsap.default.registerPlugin(ScrollTrigger);
        const instance = new Lenis({ duration: 1.05, smoothWheel: true });
        instance.on("scroll", ScrollTrigger.update);
        gsap.default.ticker.add((time: number) => {
          instance.raf(time * 1000);
        });
        gsap.default.ticker.lagSmoothing(0);
        lenis = instance;
      },
    );

    return () => {
      destroyed = true;
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

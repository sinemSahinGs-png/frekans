"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] bg-[var(--frekans-navy)]/10">
      <motion.div style={{ scaleX, transformOrigin: "0% 50%" }} className="h-full bg-[var(--frekans-green)]" />
    </div>
  );
}

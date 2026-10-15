"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  interactive?: boolean;
  amplitude?: number;
  variant?: "hero" | "divider" | "footer";
};

export function FrekansWave({ className, interactive = false, amplitude = 1, variant = "hero" }: Props) {
  const reduce = useReducedMotion();
  const id = useId();
  const greenRef = useRef<SVGPathElement>(null);
  const navyRef = useRef<SVGPathElement>(null);
  const phase = useRef(0);
  const pointer = useRef(0);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const tick = () => {
      phase.current += 0.008;
      const p = phase.current;
      const inf = pointer.current * 0.03;
      const a = 18 * amplitude;
      greenRef.current?.setAttribute(
        "d",
        `M 0 ${50 + Math.sin(p) * a * 0.2} C 120 ${20 + Math.sin(p + inf) * a}, 240 ${80 - Math.sin(p) * a}, 360 ${50 + Math.cos(p) * a * 0.3} C 480 ${18 + Math.sin(p + 1) * a}, 600 ${82 - Math.cos(p) * a}, 720 ${50}`,
      );
      navyRef.current?.setAttribute(
        "d",
        `M 0 ${50 + Math.cos(p + 0.8) * a * 0.2} C 120 ${82 - Math.cos(p + inf) * a}, 240 ${18 + Math.cos(p) * a}, 360 ${50 - Math.sin(p) * a * 0.3} C 480 ${80 - Math.cos(p + 1) * a}, 600 ${20 + Math.sin(p) * a}, 720 ${50}`,
      );
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [amplitude, reduce]);

  useEffect(() => {
    if (!interactive || reduce) return;
    const onMove = (e: MouseEvent) => {
      pointer.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive, reduce]);

  const h = variant === "hero" ? 180 : variant === "divider" ? 64 : 90;

  return (
    <svg viewBox="0 0 720 100" className={cn("w-full overflow-visible", className)} style={{ height: h }} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00A84F" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#00A84F" stopOpacity="1" />
          <stop offset="100%" stopColor="#00A84F" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path ref={navyRef} d="M0 50 C120 82 240 18 360 50 C480 80 600 20 720 50" fill="none" stroke="#0B2857" strokeWidth={variant === "divider" ? 1.4 : 2.2} strokeLinecap="round" />
      <path ref={greenRef} d="M0 50 C120 20 240 80 360 50 C480 18 600 82 720 50" fill="none" stroke={`url(#${id}-g)`} strokeWidth={variant === "divider" ? 1.6 : 2.4} strokeLinecap="round" />
    </svg>
  );
}

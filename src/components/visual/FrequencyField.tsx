"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function FrequencyField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = 28;
      const rows = 10;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i / (cols - 1)) * width;
          const yBase = (j / (rows - 1)) * height;
          const wave = reduce ? 0 : Math.sin(i * 0.45 + t) * 7;
          ctx.fillStyle = j % 3 === 0 ? "rgba(0,168,79,0.18)" : "rgba(11,40,87,0.12)";
          ctx.beginPath();
          ctx.arc(x, yBase + wave, 1.15, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) {
        t += 0.018;
        raf = requestAnimationFrame(draw);
      }
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

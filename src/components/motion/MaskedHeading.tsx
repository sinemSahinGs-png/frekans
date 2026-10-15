"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MaskedHeading({
  as: Tag = "h2",
  className,
  lines,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  lines: string[];
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%", opacity: 0, filter: "blur(4px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

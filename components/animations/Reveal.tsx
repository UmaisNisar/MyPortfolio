"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  amount?: number;
};

/** Simple fade-and-rise on enter. The workhorse scroll reveal. */
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  className = "",
  amount = 0.35,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

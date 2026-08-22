"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  className?: string;
  /** Horizontal travel in px across the scroll journey. Negative flips direction. */
  distance?: number;
};

/** Scroll-linked horizontal drift — gives big headings editorial motion. */
export default function Drift({ children, className = "", distance = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { x }}>
      {children}
    </motion.div>
  );
}

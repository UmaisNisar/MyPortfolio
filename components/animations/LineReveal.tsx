"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  innerClassName?: string;
  /**
   * undefined → reveal when scrolled into view.
   * boolean   → controlled externally (e.g. after the preloader).
   */
  play?: boolean;
};

const variants: Variants = {
  hidden: { y: "115%", rotate: 2.5 },
  shown: { y: "0%", rotate: 0 },
};

/**
 * Masked line reveal — content rises out of an overflow-hidden wrapper.
 * The observer sits on the (always visible) wrapper: the clipped inner
 * element never intersects the viewport, so it can't be observed itself.
 */
export default function LineReveal({
  children,
  delay = 0,
  duration = 1,
  className = "",
  innerClassName = "",
  play,
}: Props) {
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      {...(play === undefined
        ? { whileInView: "shown", viewport: { once: true, amount: 0.4 } }
        : { animate: play ? "shown" : "hidden" })}
    >
      <motion.span
        className={`block origin-top-left will-change-transform ${innerClassName}`}
        variants={variants}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

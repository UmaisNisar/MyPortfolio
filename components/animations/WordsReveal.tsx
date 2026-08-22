"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "@/lib/motion";

export type WordSegment = { text: string; serif?: boolean; accent?: boolean };

type Props = {
  segments: WordSegment[];
  className?: string;
  stagger?: number;
  delay?: number;
};

/**
 * Staggered word-by-word reveal for editorial statements. The viewport
 * observer lives on the outer span (visible box); each clipped word
 * receives the variant with its own delay via `custom`.
 */
export default function WordsReveal({
  segments,
  className = "",
  stagger = 0.045,
  delay = 0,
}: Props) {
  let wordIndex = 0;

  const word: Variants = {
    hidden: { y: "110%" },
    shown: (i: number) => ({
      y: "0%",
      transition: { duration: 0.85, delay: delay + i * stagger, ease: EASE },
    }),
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      {segments.map((seg, si) => (
        <Fragment key={si}>
          {seg.text.split(" ").map((w, wi) => {
            const i = wordIndex++;
            return (
              <Fragment key={`${si}-${wi}`}>
                <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                  <motion.span
                    className={`inline-block will-change-transform ${
                      seg.serif ? "u-serif-accent" : ""
                    } ${seg.accent ? "text-accent" : ""}`}
                    custom={i}
                    variants={word}
                  >
                    {w}
                  </motion.span>
                </span>{" "}
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </motion.span>
  );
}

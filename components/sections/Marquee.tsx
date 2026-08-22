"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { wrap } from "@/lib/motion";

const WORDS = ["DESIGN", "DEVELOP", "EXPERIMENT", "CREATE"];

function Row() {
  return (
    <span className="flex shrink-0 items-baseline">
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-baseline">
          <span
            className={`u-display px-[0.35em] ${
              i % 2 === 1 ? "marquee-outline" : "text-paper"
            }`}
            style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)" }}
          >
            {w}
          </span>
          <span
            className="spin-slow inline-block self-center text-accent"
            aria-hidden
            style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)" }}
          >
            ✺
          </span>
        </span>
      ))}
    </span>
  );
}

/** Infinite marquee whose speed and direction react to scroll velocity. */
export default function Marquee() {
  const baseX = useMotionValue(0);
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-4, 0, 4], {
    clamp: true,
  });

  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * -1.6 * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section
      className="marquee-mask hairline-t hairline-b overflow-hidden py-6 md:py-8"
      aria-hidden
    >
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        <Row />
        <Row />
        <Row />
        <Row />
      </motion.div>
    </section>
  );
}

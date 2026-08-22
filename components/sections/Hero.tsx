"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback } from "react";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { useAppReady } from "@/components/providers/Preloader";
import { useLenis } from "@/components/providers/SmoothScroll";
import LineReveal from "@/components/animations/LineReveal";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  const ready = useAppReady();
  const lenis = useLenis();
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();

  // Normalized cursor position → gentle parallax on the type block.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const typeX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const typeY = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const metaX = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!finePointer || reduced) return;
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    },
    [finePointer, reduced, mx, my],
  );

  const scrollToWork = () =>
    lenis
      ? lenis.scrollTo("#work", { duration: 1.4 })
      : document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });

  const lineDelay = (i: number) => 0.15 + i * 0.12;

  return (
    <section
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-8 pt-24 md:px-10"
      onMouseMove={onMouseMove}
      aria-label="Introduction"
    >
      <HeroCanvas />

      {/* Top meta row */}
      <motion.div
        className="relative z-10 flex items-start justify-between"
        style={{ x: metaX }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="u-label text-muted">
          PORTFOLIO — 2026
          <br />
          <span className="text-muted-dark">FOLIO / 001</span>
        </p>
        <p className="u-label hidden text-right text-muted sm:block">
          {site.role.toUpperCase()}
          <br />
          <span className="text-muted-dark">
            {site.location.toUpperCase()} — {site.timezoneLabel}
          </span>
        </p>
      </motion.div>

      {/* Display statement */}
      <motion.h1
        className="u-display relative z-10 select-none text-paper"
        style={{
          x: typeX,
          y: typeY,
          fontSize: "clamp(4rem, min(16.5vw, 20svh), 15rem)",
        }}
      >
        <LineReveal play={ready} delay={lineDelay(0)} duration={1.15}>
          I MAKE
        </LineReveal>
        <LineReveal play={ready} delay={lineDelay(1)} duration={1.15}>
          THE WEB
        </LineReveal>
        <LineReveal play={ready} delay={lineDelay(2)} duration={1.15}>
          <span className="u-serif-accent pr-[0.06em]" style={{ fontSize: "0.92em" }}>
            move
          </span>
          <span className="text-accent">.</span>
        </LineReveal>
      </motion.h1>

      {/* Bottom row */}
      <div className="relative z-10 flex items-end justify-between">
        <motion.button
          onClick={scrollToWork}
          className="u-label group flex items-center gap-3 text-muted transition-colors hover:text-paper"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          aria-label="Scroll to selected work"
        >
          SCROLL
          <motion.span
            className="text-accent"
            animate={reduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.button>

        <motion.p
          className="u-label max-w-56 text-right text-muted-dark"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        >
          DESIGN, CODE &amp; MOTION —<br />
          BUILT FOR THE BROWSER
        </motion.p>
      </div>
    </section>
  );
}

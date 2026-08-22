"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { EASE } from "@/lib/motion";

type Variant = "default" | "link" | "view" | "media" | "hidden";

const RING_SIZE: Record<Variant, number> = {
  hidden: 0,
  default: 36,
  link: 56,
  media: 110,
  view: 104,
};

/**
 * Custom cursor: a precise dot plus a trailing ring that morphs per target.
 * Targets opt in via `data-cursor="view" | "media"`; links/buttons are
 * picked up automatically. Desktop (fine pointer) only.
 */
export default function CustomCursor() {
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>("hidden");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-native-hidden");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let seen = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!seen) {
        seen = true;
        ring.x = pos.x;
        ring.y = pos.y;
        setVariant((v) => (v === "hidden" ? "default" : v));
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "[data-cursor], a, button, [role='button']",
      );
      const requested = el?.getAttribute("data-cursor");
      if (requested === "view" || requested === "media") setVariant(requested);
      else if (requested === "none") setVariant("default");
      else if (el) setVariant("link");
      else setVariant("default");
    };

    const onLeave = () => setVariant("hidden");
    const onEnter = () => seen && setVariant("default");
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      // Dot snaps, ring trails.
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("cursor-native-hidden");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = RING_SIZE[variant];
  const filled = variant === "view" || variant === "media";

  return (
    <div className="pointer-events-none fixed inset-0 z-260 hidden md:block" aria-hidden>
      {/* Trailing ring / morphing badge */}
      <div ref={ringRef} className="absolute left-0 top-0 will-change-transform">
        <motion.div
          className="flex items-center justify-center rounded-full text-center"
          animate={{
            width: size,
            height: size,
            scale: pressed ? 0.85 : 1,
            backgroundColor:
              variant === "view"
                ? "var(--accent)"
                : variant === "media"
                  ? "rgba(233, 231, 225, 0.12)"
                  : "rgba(233, 231, 225, 0)",
            borderColor: filled
              ? "rgba(233, 231, 225, 0)"
              : variant === "link"
                ? "var(--accent)"
                : "rgba(143, 141, 133, 0.6)",
            opacity: variant === "hidden" ? 0 : 1,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{
            border: "1px solid",
            backdropFilter: variant === "media" ? "blur(3px)" : undefined,
          }}
        >
          <motion.span
            className="u-label select-none text-ink"
            style={{ fontSize: "0.5625rem", letterSpacing: "0.12em" }}
            animate={{ opacity: variant === "view" ? 1 : 0 }}
            transition={{ duration: 0.2, delay: variant === "view" ? 0.15 : 0 }}
          >
            VIEW
            <br />
            PROJECT →
          </motion.span>
        </motion.div>
      </div>

      {/* Precise dot */}
      <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
        <motion.div
          className="rounded-full bg-paper mix-blend-difference"
          animate={{
            width: variant === "view" || variant === "media" ? 0 : 7,
            height: variant === "view" || variant === "media" ? 0 : 7,
            opacity: variant === "hidden" ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: EASE }}
        />
      </div>
    </div>
  );
}

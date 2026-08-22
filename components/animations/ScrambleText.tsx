"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/=+*<>—";

type Props = {
  text: string;
  className?: string;
  /** Scramble automatically when the parent (or self) is hovered. */
  as?: "span";
};

/**
 * Decoding-style text scramble. Call `scramble()` via ref-free usage:
 * it triggers on mouseenter of the rendered element itself.
 */
export default function ScrambleText({ text, className = "" }: Props) {
  // null → resting; otherwise the currently scrambled string.
  const [display, setDisplay] = useState<string | null>(null);
  const frame = useRef(0);
  const raf = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const scramble = useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(raf.current);
    frame.current = 0;
    const totalFrames = text.length * 2 + 8;

    const step = () => {
      frame.current++;
      const settled = Math.floor(
        (frame.current / totalFrames) * (text.length + 2),
      );
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || i < settled) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );
      if (frame.current < totalFrames) raf.current = requestAnimationFrame(step);
      else setDisplay(null);
    };
    raf.current = requestAnimationFrame(step);
  }, [text, reduced]);

  return (
    <span className={className} onMouseEnter={scramble} aria-label={text}>
      {display ?? text}
    </span>
  );
}

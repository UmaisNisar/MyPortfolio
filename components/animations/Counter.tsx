"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  /** Zero-pad to this many digits, e.g. 2 → "03". */
  pad?: number;
  suffix?: string;
  className?: string;
  duration?: number;
};

/** Counts up from 0 when scrolled into view. */
export default function Counter({
  to,
  pad = 0,
  suffix = "",
  className = "",
  duration = 1.6,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: reduced ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {String(value).padStart(pad, "0")}
      {suffix}
    </span>
  );
}

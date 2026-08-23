"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

const LAG = 0.05; // how lazily it follows
const OFFSET = { x: 24, y: 30 }; // trails just below-right of the cursor
const SLEEP_AFTER = 4500; // ms of stillness before it dozes off

/**
 * A tiny companion dot that lazily follows the cursor, blinks now and
 * then, and falls asleep when you stop moving. Desktop only.
 */
export default function CursorCompanion() {
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;
  const ref = useRef<HTMLDivElement>(null);
  const [asleep, setAsleep] = useState(false);
  const asleepRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const pos = { x: -60, y: window.innerHeight / 2 };
    const target = { x: -60, y: window.innerHeight / 2 };
    let lastMove = performance.now();
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX + OFFSET.x;
      target.y = e.clientY + OFFSET.y;
      lastMove = performance.now();
      if (asleepRef.current) {
        asleepRef.current = false;
        setAsleep(false);
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * LAG;
      pos.y += (target.y - pos.y) * LAG;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (!asleepRef.current && performance.now() - lastMove > SLEEP_AFTER) {
        asleepRef.current = true;
        setAsleep(true);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-254 hidden md:block" aria-hidden>
      <div ref={ref} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`relative h-3.5 w-3.5 rounded-full bg-accent transition-opacity duration-700 ${
            asleep ? "opacity-50" : "opacity-90"
          }`}
        >
          {/* Eyes */}
          <span
            className={`companion-eye absolute left-[3.5px] top-[4px] h-[4px] w-[2.5px] rounded-full bg-ink ${
              asleep ? "scale-y-[0.15]" : ""
            }`}
          />
          <span
            className={`companion-eye absolute right-[3.5px] top-[4px] h-[4px] w-[2.5px] rounded-full bg-ink ${
              asleep ? "scale-y-[0.15]" : ""
            }`}
          />
          {/* Zzz while sleeping */}
          {asleep && (
            <span className="companion-z u-label absolute -top-4 left-3 text-[9px] text-muted">
              z
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

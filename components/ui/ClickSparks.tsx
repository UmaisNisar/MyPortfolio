"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Every click bursts a few ✺ particles from the pointer. */
export default function ClickSparks() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const onDown = (e: PointerEvent) => {
      const host = hostRef.current;
      if (!host) return;
      const count = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const s = document.createElement("span");
        s.textContent = "✺";
        s.style.cssText = `position:absolute;left:${e.clientX}px;top:${e.clientY}px;font-size:${7 + Math.random() * 8}px;color:${Math.random() < 0.65 ? "var(--accent)" : "var(--paper)"};transform:translate(-50%,-50%);will-change:transform,opacity;`;
        host.appendChild(s);

        const angle = Math.random() * Math.PI * 2;
        const dist = 28 + Math.random() * 55;
        const anim = s.animate(
          [
            { transform: "translate(-50%,-50%) rotate(0deg) scale(1)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) rotate(${Math.random() * 180 - 90}deg) scale(0.15)`,
              opacity: 0,
            },
          ],
          {
            duration: 420 + Math.random() * 260,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
        );
        anim.onfinish = () => s.remove();
      }
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduced]);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none fixed inset-0 z-255 overflow-hidden"
      aria-hidden
    />
  );
}

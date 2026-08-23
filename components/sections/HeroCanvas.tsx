"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

const SPACING = 60;
const INFLUENCE = 190; // px radius of cursor influence
const PUSH = 30; // max displacement
const RETURN = 0.075; // lerp back to rest
const WAVE_SPEED = 12;
const WAVE_BAND = 80; // thickness of the shockwave front
const WAVE_PUSH = 30;

type Dot = { ox: number; oy: number; x: number; y: number };
type Wave = { x: number; y: number; r: number; max: number };

/**
 * Interactive dot-field behind the hero. Dots breathe on their own, are
 * displaced by the cursor, and clicking sends a shockwave rippling
 * through the grid. Static under reduced motion.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    const waves: Wave[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * SPACING;
          const oy = r * SPACING;
          dots.push({ ox, oy, x: ox, y: oy });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Ambient breathing so the field feels alive even without a cursor.
      const t = reduced ? 0 : performance.now() / 1000;

      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < INFLUENCE && dist > 0.01) {
          const force = (1 - dist / INFLUENCE) ** 2 * PUSH;
          d.x += (dx / dist) * force * 0.22;
          d.y += (dy / dist) * force * 0.22;
        }

        // Shockwaves push dots outward as their front passes through.
        for (const w of waves) {
          const wx = d.x - w.x;
          const wy = d.y - w.y;
          const wd = Math.hypot(wx, wy);
          const band = Math.abs(wd - w.r);
          if (band < WAVE_BAND && wd > 0.01) {
            const force = (1 - band / WAVE_BAND) ** 2 * WAVE_PUSH;
            d.x += (wx / wd) * force * 0.3;
            d.y += (wy / wd) * force * 0.3;
          }
        }

        d.x += (d.ox - d.x) * RETURN;
        d.y += (d.oy - d.y) * RETURN;

        const phase = (d.ox + d.oy) * 0.012;
        const driftX = Math.sin(t * 0.55 + phase) * 3.2;
        const driftY = Math.cos(t * 0.45 + phase * 1.3) * 3.2;
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + phase * 2);

        // Dots near the cursor pick up a lighter violet and grow slightly.
        const heat = Math.max(0, 1 - dist / INFLUENCE);
        const radius = 1 + pulse * 0.5 + heat * 1.3;
        ctx.beginPath();
        ctx.arc(d.x + driftX, d.y + driftY, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          heat > 0.05
            ? `rgba(216, 164, 255, ${0.25 + heat * 0.55})`
            : `rgba(191, 95, 255, ${0.14 + pulse * 0.14})`;
        ctx.fill();
      }

      // Expanding rings for active shockwaves.
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.r += WAVE_SPEED;
        const alpha = Math.max(0, 1 - w.r / w.max);
        if (alpha <= 0) {
          waves.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(191, 95, 255, ${alpha * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!running && !reduced) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    draw(); // always render at least one static frame
    start();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < 0 || y > height) return;
      waves.push({ x, y, r: 0, max: Math.hypot(width, height) });
      if (waves.length > 4) waves.shift();
    };

    if (finePointer && !reduced) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }
    if (!reduced) {
      canvas.parentElement!.addEventListener("pointerdown", onPointerDown);
    }

    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(canvas.parentElement!);

    // Don't burn frames when the hero is off screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      canvas.parentElement?.removeEventListener("pointerdown", onPointerDown);
    };
  }, [reduced, finePointer]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

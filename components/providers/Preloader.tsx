"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { site } from "@/data/site";
import { useLenis } from "./SmoothScroll";

const AppReadyContext = createContext(false);

/** True once the preloader has finished — gate intro animations on this. */
export function useAppReady() {
  return useContext(AppReadyContext);
}

export function AppReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <AppReadyContext.Provider value={ready}>
      <Preloader onDone={() => setReady(true)} done={ready} />
      {children}
    </AppReadyContext.Provider>
  );
}

function Preloader({ onDone, done }: { onDone: () => void; done: boolean }) {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const progress = useMotionValue(0);
  const display = useTransform(progress, (v) =>
    String(Math.round(v)).padStart(3, "0"),
  );
  const barScale = useTransform(progress, (v) => v / 100);

  // Freeze scrolling while the loader is up.
  useEffect(() => {
    if (done) return;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [done, lenis]);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: reduced ? 0.3 : 1.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => setTimeout(onDone, reduced ? 0 : 250),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-300 flex flex-col justify-between bg-ink px-6 py-6 md:px-10 md:py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden
        >
          <div className="flex items-center justify-between">
            <span className="u-label text-muted">{site.wordmark}</span>
            <span className="u-label text-muted">PORTFOLIO — 2026</span>
          </div>

          <div className="flex items-end justify-between gap-8">
            <span className="u-label mb-3 hidden text-muted sm:block">
              LOADING EXPERIENCE
            </span>
            <motion.span
              className="u-display text-paper"
              style={{ fontSize: "clamp(6rem, 22vw, 18rem)" }}
            >
              <motion.span>{display}</motion.span>
              <span className="text-accent">%</span>
            </motion.span>
          </div>

          <motion.div
            className="h-px origin-left bg-accent"
            style={{ scaleX: barScale }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

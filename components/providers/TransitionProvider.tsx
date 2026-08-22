"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useLenis } from "./SmoothScroll";

type Phase = "idle" | "covering" | "revealing";

const TransitionContext = createContext<{
  navigateTo: (href: string, label?: string) => void;
}>({ navigateTo: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

/**
 * Full-screen wipe used between routes. `TransitionLink` calls `navigateTo`,
 * the overlay covers the page, the route changes underneath, then the
 * overlay reveals the new page.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const target = useRef<string | null>(null);

  const navigateTo = useCallback(
    (href: string, nextLabel = "") => {
      if (href.split("#")[0] === pathname || phase !== "idle") return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        router.push(href);
        return;
      }
      target.current = href;
      setLabel(nextLabel);
      lenis?.stop();
      setPhase("covering");
    },
    [pathname, phase, router, lenis],
  );

  // Once the new route has rendered under the cover, reveal it.
  useEffect(() => {
    if (phase === "covering" && target.current === null) return;
    if (phase === "covering" && pathname === target.current?.split("#")[0]) {
      const hadHash = target.current.includes("#");
      target.current = null;
      if (!hadHash) window.scrollTo(0, 0);
      const t = setTimeout(() => setPhase("revealing"), 150);
      return () => clearTimeout(t);
    }
  }, [pathname, phase]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <motion.div
        className="pointer-events-none fixed inset-0 z-250 flex items-end bg-paper"
        initial={false}
        animate={
          phase === "covering"
            ? { y: "0%" }
            : phase === "revealing"
              ? { y: "-100%" }
              : { y: "100%" }
        }
        transition={
          phase === "idle"
            ? { duration: 0 }
            : { duration: phase === "covering" ? 0.6 : 0.75, ease: EASE }
        }
        onAnimationComplete={() => {
          if (phase === "covering" && target.current) {
            router.push(target.current);
          } else if (phase === "revealing") {
            setPhase("idle");
            lenis?.start();
          }
        }}
        aria-hidden
      >
        <div className="w-full border-t-2 border-accent px-6 pb-8 pt-6 md:px-10">
          <span className="u-label text-muted-dark">
            {label || "LOADING"} —
          </span>
        </div>
      </motion.div>
    </TransitionContext.Provider>
  );
}

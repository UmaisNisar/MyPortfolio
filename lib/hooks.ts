"use client";

import { useCallback, useSyncExternalStore } from "react";

/** SSR-safe media query hook. Returns `false` on the server. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on devices with a precise pointer (i.e. not touch). */
export function useFinePointer() {
  return useMediaQuery("(pointer: fine)");
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

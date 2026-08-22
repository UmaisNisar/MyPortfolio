/** Shared motion language — one easing family across the whole site. */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

/** Wraps `v` into the range [min, max). */
export function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
}

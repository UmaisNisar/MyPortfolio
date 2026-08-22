"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";

type Props = ComponentProps<typeof Link> & {
  /** Small label shown on the transition overlay (e.g. project title). */
  transitionLabel?: string;
};

/** A next/link that routes through the page-transition overlay. */
export default function TransitionLink({
  transitionLabel,
  onClick,
  href,
  ...rest
}: Props) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Let modified clicks (new tab etc.) behave natively.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateTo(typeof href === "string" ? href : href.toString(), transitionLabel);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}

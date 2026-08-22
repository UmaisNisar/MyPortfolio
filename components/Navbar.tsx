"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { nav, site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import { usePageTransition } from "@/components/providers/TransitionProvider";
import ScrambleText from "@/components/animations/ScrambleText";

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { navigateTo } = usePageTransition();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Scrollspy — highlight the section currently in view.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    let io: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      const sections = nav
        .map((n) => document.getElementById(n.href.slice(1)))
        .filter((el): el is HTMLElement => el !== null);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(`#${e.target.id}`);
          }
        },
        { rootMargin: "-35% 0px -55% 0px" },
      );
      sections.forEach((s) => io!.observe(s));
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500 && !menuOpen);
    setScrolled(y > 60);
  });

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = useCallback(
    (hash: string) => {
      setMenuOpen(false);
      if (pathname === "/") {
        const el = document.querySelector(hash);
        if (!el) return;
        if (lenis) lenis.scrollTo(hash, { offset: -20, duration: 1.4 });
        else el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigateTo(`/${hash}`, hash.replace("#", "").toUpperCase());
      }
    },
    [pathname, lenis, navigateTo],
  );

  const goHome = useCallback(() => {
    setMenuOpen(false);
    if (pathname === "/") {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigateTo("/", "HOME");
    }
  }, [pathname, lenis, navigateTo]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-230 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !menuOpen
            ? "border-b border-line bg-ink/70 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav
          className="flex h-18 items-center justify-between px-6 md:px-10"
          aria-label="Primary"
        >
          <button
            onClick={goHome}
            className="u-label text-paper transition-colors hover:text-accent"
          >
            <ScrambleText text={site.wordmark} />
            <span className="text-accent">&nbsp;©</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {nav.map((item, i) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => goTo(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`u-label group flex items-baseline gap-1.5 border-b pb-0.5 transition-colors ${
                      isActive
                        ? "border-accent text-paper"
                        : "border-transparent text-muted hover:text-paper"
                    }`}
                  >
                    <span
                      className={`text-[0.5625rem] transition-colors group-hover:text-accent ${
                        isActive ? "text-accent" : "text-muted-dark"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <ScrambleText text={item.label.toUpperCase()} />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            className="u-label relative z-260 flex h-10 items-center gap-3 text-paper md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "CLOSE" : "MENU"}
            <span className="relative block h-2.5 w-6">
              <motion.span
                className="absolute left-0 top-0 block h-px w-full bg-current"
                animate={menuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-px w-full bg-current"
                animate={menuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-250 flex flex-col justify-between bg-ink-soft px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.button
                      className="u-display flex items-baseline gap-4 text-paper"
                      style={{ fontSize: "clamp(2.5rem, 11vw, 5rem)" }}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%", transition: { duration: 0.3 } }}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + i * 0.07,
                        ease: EASE,
                      }}
                      onClick={() => goTo(item.href)}
                    >
                      <span className="u-label text-accent">0{i + 1}</span>
                      {item.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex flex-col gap-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="u-label text-muted"
                  >
                    {s.label.toUpperCase()} ↗
                  </a>
                ))}
              </div>
              <a href={`mailto:${site.email}`} className="u-label text-accent">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

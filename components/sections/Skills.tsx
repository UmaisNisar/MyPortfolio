"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { skillCategories, type SkillCategory } from "@/data/skills";
import Reveal from "@/components/animations/Reveal";

gsap.registerPlugin(ScrollTrigger);

function Panel({ category }: { category: SkillCategory }) {
  return (
    <div className="skills-panel relative flex w-full shrink-0 flex-col justify-center border-l border-line px-6 py-16 md:w-[62vw] md:min-h-full md:px-14 md:py-0 lg:w-[52vw]">
      <span
        className="u-display pointer-events-none absolute right-4 top-8 select-none text-ink-soft md:top-1/2 md:-translate-y-1/2"
        style={{
          fontSize: "clamp(8rem, 24vw, 22rem)",
          WebkitTextStroke: "1px rgba(233,231,225,0.07)",
          color: "transparent",
        }}
        aria-hidden
      >
        {category.index}
      </span>

      <h3
        className="u-display relative text-paper"
        style={{ fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)" }}
      >
        {category.title.toUpperCase()}
      </h3>
      <p className="u-body relative mt-4 max-w-xs text-sm text-muted">
        {category.blurb}
      </p>

      <ul className="relative mt-10 flex max-w-md flex-col">
        {category.items.map((item, i) => (
          <li
            key={item}
            className="group flex items-baseline gap-4 border-b border-line py-3 transition-transform duration-300 ease-out hover:translate-x-2"
          >
            <span className="u-label text-muted-dark transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-base font-[450] tracking-wide text-paper/85 transition-colors group-hover:text-paper md:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Expertise — on desktop, vertical scroll drives a pinned horizontal track.
 * On mobile / reduced motion it degrades to a vertical stack.
 */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink md:h-svh"
      aria-label="Expertise"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-baseline justify-between bg-ink px-6 pb-4 pt-24 md:px-10">
        <p className="u-label text-muted-dark">03 — EXPERTISE</p>
        <p className="u-label hidden text-muted-dark md:block">( SCROLL )</p>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col pt-28 will-change-transform md:h-full md:flex-row md:pt-0"
      >
        {/* Leading editorial panel */}
        <div className="flex w-full shrink-0 flex-col justify-center px-6 py-12 md:w-[38vw] md:px-10 md:py-0">
          <Reveal>
            <h2
              className="u-display text-paper"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.25rem)", lineHeight: 0.95 }}
            >
              WHAT I<br />
              BRING TO
              <br />
              THE TABLE<span className="text-accent">.</span>
            </h2>
            <p className="u-body mt-6 max-w-xs text-sm text-muted">
              Four disciplines, one practice. Each feeds the others — the
              design informs the code, the code shapes the motion.
            </p>
          </Reveal>
        </div>

        {skillCategories.map((c) => (
          <Panel key={c.title} category={c} />
        ))}
      </div>

      {/* Scrub progress */}
      <div className="absolute inset-x-6 bottom-8 hidden h-px bg-line md:inset-x-10 md:block">
        <div
          ref={progressRef}
          className="h-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}

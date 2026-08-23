"use client";

import { skillCategories, type SkillCategory } from "@/data/skills";
import Drift from "@/components/animations/Drift";
import LineReveal from "@/components/animations/LineReveal";
import Reveal from "@/components/animations/Reveal";

function CategoryRow({ category, index }: { category: SkillCategory; index: number }) {
  const even = index % 2 === 0;

  return (
    <div className="relative overflow-hidden border-b border-line py-14 md:py-20">
      {/* Ghost numeral parallaxes against the row content */}
      <Drift
        distance={even ? -90 : 90}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none"
      >
        <span
          className="u-display"
          style={{
            fontSize: "clamp(7rem, 18vw, 16rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(191,95,255,0.14)",
          }}
          aria-hidden
        >
          {category.index}
        </span>
      </Drift>

      <Drift distance={even ? 60 : -60}>
        <Reveal amount={0.3} y={36}>
          <div className="grid grid-cols-1 items-baseline gap-6 md:grid-cols-12">
            <h3
              className="u-display text-paper md:col-span-5"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 6rem)" }}
            >
              {category.title.toUpperCase()}
            </h3>

            <div className="md:col-span-6 md:col-start-7">
              <p className="u-body max-w-sm text-sm text-muted">{category.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2.5">
                {category.items.map((item, i) => (
                  <li
                    key={item}
                    className="u-label group flex items-baseline gap-2 text-muted transition-colors duration-300 hover:text-paper"
                  >
                    <span className="text-[0.5625rem] text-muted-dark transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Drift>
    </div>
  );
}

/**
 * Expertise — editorial rows that drift horizontally at different speeds
 * while the page keeps its normal vertical scroll. No pinning, no pause.
 */
export default function Skills() {
  return (
    <section
      className="overflow-x-clip px-6 py-24 md:px-10 md:py-36"
      aria-label="Expertise"
    >
      <div className="mb-14 flex items-baseline justify-between md:mb-20">
        <p className="u-label text-muted-dark">03 — EXPERTISE</p>
        <p className="u-label hidden text-muted-dark sm:block">( FOUR DISCIPLINES )</p>
      </div>

      <div className="mb-16 grid grid-cols-1 items-end gap-10 md:mb-24 md:grid-cols-12">
        <h2
          className="u-display text-paper md:col-span-8"
          style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
        >
          <Drift distance={26}>
            <LineReveal duration={1.1}>WHAT I BRING</LineReveal>
          </Drift>
          <Drift distance={-26}>
            <LineReveal duration={1.1} delay={0.1} innerClassName="flex items-baseline gap-[0.25em]">
              <span className="u-serif-accent" style={{ fontSize: "0.9em" }}>
                to the table
              </span>
              <span className="text-accent">.</span>
            </LineReveal>
          </Drift>
        </h2>
        <Reveal className="md:col-span-3 md:col-start-10" delay={0.2}>
          <p className="u-body text-sm text-muted">
            Four disciplines, one practice. Each feeds the others — the design
            informs the code, the code shapes the motion.
          </p>
        </Reveal>
      </div>

      <div className="border-t border-line">
        {skillCategories.map((c, i) => (
          <CategoryRow key={c.title} category={c} index={i} />
        ))}
      </div>
    </section>
  );
}

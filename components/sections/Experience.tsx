"use client";

import { motion } from "framer-motion";
import { certifications, education, experience } from "@/data/experience";
import { EASE } from "@/lib/motion";
import Reveal from "@/components/animations/Reveal";
import LineReveal from "@/components/animations/LineReveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 py-24 md:px-10 md:py-36"
      aria-label="Experience"
    >
      <div className="mb-14 flex items-baseline justify-between md:mb-20">
        <p className="u-label text-muted-dark">04 — EXPERIENCE</p>
        <p className="u-label hidden text-muted-dark sm:block">( SELECTED ROLES )</p>
      </div>

      <h2 className="u-display mb-16 text-paper md:mb-24" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
        <LineReveal duration={1.1}>THE ROAD</LineReveal>
        <LineReveal duration={1.1} delay={0.1} innerClassName="flex items-baseline gap-[0.25em]">
          <span className="u-serif-accent" style={{ fontSize: "0.9em" }}>
            so far
          </span>
          <span className="text-accent">→</span>
        </LineReveal>
      </h2>

      <ol className="border-t border-line">
        {experience.map((e, i) => (
          <li key={e.company} className="border-b border-line">
            <Reveal delay={i * 0.08} y={40} amount={0.3}>
              <div className="group grid grid-cols-1 gap-4 py-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2 md:grid-cols-12 md:gap-6 md:py-14">
                <div className="flex items-baseline gap-4 md:col-span-3 md:block">
                  <span className="u-label text-muted-dark transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="u-label block text-muted md:mt-2">
                    {e.duration}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3
                    className="u-display text-paper"
                    style={{ fontSize: "clamp(1.75rem, 3.6vw, 3.25rem)" }}
                  >
                    {e.company.toUpperCase()}
                  </h3>
                  <p className="u-serif-accent mt-1 text-lg text-muted transition-colors duration-500 group-hover:text-paper md:text-xl">
                    {e.role}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <p className="u-body text-sm text-muted">{e.description}</p>
                  <p className="u-label mt-4 text-muted-dark">
                    {e.technologies.join(" / ").toUpperCase()}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Education — boxed panel, hover language matches the roles above */}
      <Reveal className="mt-20 md:mt-28" amount={0.2}>
        <div className="border border-line bg-ink-soft p-6 md:p-12">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h3 className="flex items-center gap-4">
              <span className="spin-slow inline-block text-accent" aria-hidden>
                ✺
              </span>
              <span
                className="u-display text-paper"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
              >
                EDUCATION
              </span>
            </h3>
            <p className="u-label text-muted-dark">
              CERTIFIED: {certifications[0].toUpperCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={0.1 + i * 0.12} y={24}>
                <div className="group relative overflow-hidden bg-ink px-6 py-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1, delay: 0.25 + i * 0.15, ease: EASE }}
                    aria-hidden
                  />
                  <p className="u-label flex items-center justify-between text-muted-dark">
                    <span className="transition-colors group-hover:text-accent">
                      {e.duration}
                    </span>
                    <span>{e.location.toUpperCase()}</span>
                  </p>
                  <h4
                    className="u-display mt-5 text-paper"
                    style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)" }}
                  >
                    {e.school.toUpperCase()}
                  </h4>
                  <p className="u-serif-accent mt-2 text-lg text-muted transition-colors duration-500 group-hover:text-paper">
                    {e.degree}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

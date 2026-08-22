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
                  <p className="u-serif-accent mt-1 text-lg text-muted md:text-xl">
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

      {/* Education — same editorial language as the roles, own sub-heading */}
      <div className="mt-24 md:mt-36">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <h3
            className="u-display text-paper"
            style={{ fontSize: "clamp(2.25rem, 6vw, 6rem)" }}
          >
            <LineReveal duration={1} innerClassName="flex items-baseline gap-[0.25em]">
              <span>STILL</span>
              <span className="u-serif-accent" style={{ fontSize: "0.9em" }}>
                learning
              </span>
              <span className="spin-slow inline-block self-center text-accent text-[0.35em]" aria-hidden>
                ✺
              </span>
            </LineReveal>
          </h3>
          <p className="u-label pb-2 text-muted-dark">
            ( {certifications[0].toUpperCase()} )
          </p>
        </div>

        <ol className="border-t border-line">
          {education.map((e, i) => (
            <li key={e.school} className="border-b border-line">
              <Reveal delay={i * 0.08} y={30} amount={0.4}>
                <div className="group relative grid grid-cols-1 gap-3 py-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2 md:grid-cols-12 md:gap-6 md:py-12">
                  {/* Accent tick draws in along the row's top edge */}
                  <motion.span
                    className="absolute -top-px left-0 h-px w-24 origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
                    aria-hidden
                  />
                  <div className="flex items-baseline gap-4 md:col-span-3 md:block">
                    <span className="u-label text-muted-dark transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="u-label block text-muted md:mt-2">
                      {e.duration}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <h4
                      className="u-display text-paper"
                      style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)" }}
                    >
                      {e.school.toUpperCase()}
                    </h4>
                    <p className="u-serif-accent mt-1 text-lg text-muted transition-colors duration-500 group-hover:text-paper md:text-xl">
                      {e.degree}
                    </p>
                  </div>

                  <div className="md:col-span-3 md:text-right">
                    <span className="u-label text-muted-dark">
                      {e.location.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

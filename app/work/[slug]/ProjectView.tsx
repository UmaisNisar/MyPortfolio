"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, type Project } from "@/data/projects";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useAppReady } from "@/components/providers/Preloader";
import TransitionLink from "@/components/ui/TransitionLink";
import LineReveal from "@/components/animations/LineReveal";
import Reveal from "@/components/animations/Reveal";

function CaseSection({
  label,
  children,
  index,
}: {
  label: string;
  index: string;
  children: string;
}) {
  return (
    <Reveal className="border-t border-line py-10 md:py-12" amount={0.25}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
        <p className="u-label text-muted-dark md:col-span-2">
          <span className="text-accent">{index}</span> — {label}
        </p>
        <p className="u-body text-base text-paper/85 md:col-span-6 md:max-w-2xl">
          {children}
        </p>
      </div>
    </Reveal>
  );
}

export default function ProjectView({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const ready = useAppReady();
  const reduced = usePrefersReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <article>
      {/* ---- Hero ------------------------------------------------------ */}
      <header className="px-6 pb-10 pt-32 md:px-10 md:pt-44">
        <motion.p
          className="u-label text-muted"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {project.category.toUpperCase()} — {project.year}
        </motion.p>

        <h1
          className="u-display mt-6 text-paper"
          style={{ fontSize: "clamp(3.25rem, 13vw, 13rem)" }}
        >
          <LineReveal play={ready} delay={0.15} duration={1.2}>
            {project.title.toUpperCase()}
            <span className="text-accent">.</span>
          </LineReveal>
        </h1>

        <motion.dl
          className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            ["CLIENT", project.client],
            ["ROLE", project.role],
            ["YEAR", project.year],
            ["INDEX", `${project.index} / ${String(projects.length).padStart(2, "0")}`],
          ].map(([dt, dd]) => (
            <div key={dt}>
              <dt className="u-label text-muted-dark">{dt}</dt>
              <dd className="u-label mt-2 text-paper">{dd.toUpperCase()}</dd>
            </div>
          ))}
        </motion.dl>
      </header>

      {/* ---- Primary visual ------------------------------------------- */}
      <div ref={heroRef} className="relative overflow-hidden" data-cursor="media">
        <motion.div
          className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/10]"
          style={reduced ? undefined : { y: heroY, scale: heroScale }}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* ---- Case study ------------------------------------------------ */}
      <div className="grid grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:px-10 md:py-32">
        {/* Sticky meta rail */}
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-28">
            <p className="u-label text-muted-dark">TECHNOLOGY</p>
            <ul className="mt-4 flex flex-col gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="u-label border-b border-line pb-2 text-muted">
                  {t.toUpperCase()}
                </li>
              ))}
            </ul>

            {(project.live || project.repo) && (
              <>
                <p className="u-label mt-10 text-muted-dark">LINKS</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {project.live && (
                    <li>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="u-label flex items-center justify-between border-b border-line pb-2 text-paper transition-colors hover:text-accent"
                      >
                        VISIT LIVE SITE <span className="text-accent">↗</span>
                      </a>
                    </li>
                  )}
                  {project.repo && (
                    <li>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="u-label flex items-center justify-between border-b border-line pb-2 text-paper transition-colors hover:text-accent"
                      >
                        SOURCE ON GITHUB <span className="text-accent">↗</span>
                      </a>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </aside>

        <div className="md:col-span-8 md:col-start-5">
          <Reveal amount={0.3}>
            <p
              className="u-body mb-14 text-xl text-paper md:text-2xl"
              style={{ lineHeight: 1.5 }}
            >
              {project.overview}
            </p>
          </Reveal>

          <CaseSection index="01" label="CHALLENGE">
            {project.challenge}
          </CaseSection>
          <CaseSection index="02" label="DESIGN APPROACH">
            {project.approach}
          </CaseSection>
          <CaseSection index="03" label="INTERACTION">
            {project.interaction}
          </CaseSection>
          <CaseSection index="04" label="DEVELOPMENT">
            {project.development}
          </CaseSection>
        </div>
      </div>

      {/* ---- Typographic detail poster (pure CSS, no asset) ------------ */}
      <div className="relative mx-6 overflow-hidden border border-line bg-ink-soft md:mx-10" aria-hidden>
        <div className="flex flex-col justify-between gap-16 px-6 py-16 md:px-14 md:py-24">
          <div className="flex items-baseline justify-between">
            <span className="u-label text-muted-dark">DETAIL — {project.index}</span>
            <span className="u-label text-accent">✺</span>
          </div>
          <span
            className="u-display select-none leading-none"
            style={{
              fontSize: "clamp(4rem, 15vw, 16rem)",
              WebkitTextStroke: "1px rgba(233,231,225,0.25)",
              color: "transparent",
            }}
          >
            {project.title.toUpperCase()}
          </span>
          <div className="flex flex-wrap justify-between gap-4">
            {project.technologies.map((t, i) => (
              <span key={t} className="u-label text-muted">
                {String(i + 1).padStart(2, "0")} / {t.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Result ---------------------------------------------------- */}
      <div className="px-6 py-24 md:px-10 md:py-36">
        <Reveal amount={0.4}>
          <p className="u-label mb-8 text-muted-dark">05 — THE RESULT</p>
          <blockquote
            className="u-serif-accent max-w-4xl text-3xl text-paper md:text-5xl"
            style={{ lineHeight: 1.25 }}
          >
            “{project.result}”
          </blockquote>
        </Reveal>
      </div>

      {/* ---- Next project ---------------------------------------------- */}
      <TransitionLink
        href={`/work/${nextProject.slug}`}
        transitionLabel={nextProject.title.toUpperCase()}
        className="group block border-t border-line px-6 py-20 md:px-10 md:py-28"
        aria-label={`Next project: ${nextProject.title}`}
      >
        <p className="u-label text-muted-dark">NEXT PROJECT</p>
        <div className="mt-6 flex items-baseline justify-between gap-6">
          <span
            className="u-display text-paper transition-colors duration-500 group-hover:text-accent"
            style={{ fontSize: "clamp(2.75rem, 9vw, 9rem)" }}
          >
            {nextProject.title.toUpperCase()}
          </span>
          <span
            className="u-display hidden text-muted transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:block"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
          >
            →
          </span>
        </div>
        <p className="u-label mt-4 text-muted-dark">
          {nextProject.category.toUpperCase()} / {nextProject.year}
        </p>
      </TransitionLink>
    </article>
  );
}

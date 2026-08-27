"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { usePrefersReducedMotion } from "@/lib/hooks";
import TransitionLink from "@/components/ui/TransitionLink";
import Reveal from "@/components/animations/Reveal";
import LineReveal from "@/components/animations/LineReveal";

function Visual({
  project,
  className = "",
  sizes,
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  // Images lean with scroll velocity — a liquid feel while browsing.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 220,
  });
  const skewY = useTransform(smoothVelocity, [-1200, 1200], [2.2, -2.2], {
    clamp: true,
  });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-ink-soft ${className}`}
      data-cursor="view"
    >
      <motion.div
        className="absolute -inset-y-[8%] inset-x-0 will-change-transform"
        style={reduced ? undefined : { y, skewY }}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
        />
      </motion.div>
      {/* Hover veil */}
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
    </div>
  );
}

function Meta({ project, align = "left" }: { project: Project; align?: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <p className="u-label text-muted-dark">
        {project.category.toUpperCase()} / {project.year}
      </p>
      <div
        className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        {project.technologies.slice(0, 3).map((t) => (
          <span key={t} className="u-label text-muted-dark">
            {t.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

function Title({ project, size = "large" }: { project: Project; size?: "large" | "medium" }) {
  // Long unbreakable titles (e.g. MACRONAUT) must fit the side column:
  // scale the medium size down by the longest word's length.
  const maxWord = Math.max(...project.title.split(" ").map((w) => w.length));
  const mediumVw = Math.min(4.5, 30 / maxWord);

  return (
    <span className="flex items-baseline gap-4 md:gap-6">
      <span className="u-label -translate-y-1 text-accent md:-translate-y-3">
        {project.index}
      </span>
      <LineReveal
        innerClassName="u-display text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
        className=""
        duration={1}
      >
        <span
          style={{
            fontSize:
              size === "large"
                ? "clamp(2.75rem, 8.5vw, 8rem)"
                : `clamp(1.75rem, ${mediumVw}vw, 4.25rem)`,
          }}
        >
          {project.title.toUpperCase()}
        </span>
      </LineReveal>
    </span>
  );
}

/**
 * One editorial project feature. Three compositions, chosen per project:
 * wide (full-bleed), left (image left / text right), right (tall image right).
 */
export default function ProjectFeature({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const href = `/work/${project.slug}`;
  const label = project.title.toUpperCase();

  if (project.layout === "wide") {
    return (
      <TransitionLink
        href={href}
        transitionLabel={label}
        className="group block"
        aria-label={`${project.title} — view project`}
      >
        <div className="mb-5 flex items-end justify-between px-6 md:px-10">
          <Title project={project} />
          <Reveal delay={0.15} y={16} className="hidden md:block">
            <Meta project={project} align="right" />
          </Reveal>
        </div>
        <Visual
          project={project}
          sizes="100vw"
          priority={priority}
          className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]"
        />
        <div className="mt-4 flex items-start justify-between px-6 md:px-10">
          <p className="u-body max-w-md text-sm text-muted">{project.description}</p>
          <span className="u-label hidden shrink-0 text-muted transition-colors group-hover:text-accent md:block">
            VIEW CASE →
          </span>
        </div>
        <div className="md:hidden mt-3 px-6">
          <Meta project={project} />
        </div>
      </TransitionLink>
    );
  }

  const imageLeft = project.layout === "left";

  return (
    <TransitionLink
      href={href}
      transitionLabel={label}
      className="group block px-6 md:px-10"
      aria-label={`${project.title} — view project`}
    >
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
        <div
          className={
            imageLeft
              ? "md:col-span-7"
              : "order-1 md:order-2 md:col-span-6 md:col-start-7"
          }
        >
          <Visual
            project={project}
            sizes="(min-width: 768px) 55vw, 100vw"
            className={imageLeft ? "aspect-[4/3]" : "aspect-[3/4] md:aspect-[4/5]"}
          />
        </div>

        <div
          className={
            imageLeft
              ? "md:col-span-4 md:col-start-9 md:pb-10"
              : "order-2 md:order-1 md:col-span-5 md:col-start-1 md:pb-16"
          }
        >
          <Title project={project} size="medium" />
          <Reveal delay={0.1} y={20}>
            <p className="u-body mt-5 max-w-sm text-sm text-muted">
              {project.description}
            </p>
            <div className="mt-6">
              <Meta project={project} />
            </div>
            <span className="u-label mt-8 inline-block text-muted transition-colors group-hover:text-accent">
              VIEW CASE →
            </span>
          </Reveal>
        </div>
      </div>
    </TransitionLink>
  );
}

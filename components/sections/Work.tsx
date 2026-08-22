"use client";

import { projects } from "@/data/projects";
import LineReveal from "@/components/animations/LineReveal";
import ProjectFeature from "./ProjectFeature";

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-36" aria-label="Selected work">
      <div className="mb-16 px-6 md:mb-24 md:px-10">
        <div className="flex items-baseline justify-between">
          <p className="u-label text-muted-dark">02 — SELECTED WORK</p>
          <p className="u-label text-muted-dark">( {String(projects.length).padStart(2, "0")} )</p>
        </div>
        <h2 className="u-display mt-8 text-paper" style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}>
          <LineReveal duration={1.1}>SELECTED</LineReveal>
          <LineReveal duration={1.1} delay={0.1}>
            <span className="pl-[0.6em]">WORK</span>
            <span className="text-accent">*</span>
          </LineReveal>
        </h2>
      </div>

      <div className="flex flex-col gap-28 md:gap-44">
        {projects.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}

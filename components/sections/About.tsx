"use client";

import Reveal from "@/components/animations/Reveal";
import WordsReveal from "@/components/animations/WordsReveal";
import Counter from "@/components/animations/Counter";

const stats = [
  { value: 3, pad: 2, suffix: "+", label: "YEARS EXPERIENCE" },
  { value: 10, pad: 2, suffix: "+", label: "PRODUCTS SHIPPED" },
  { value: null, pad: 0, suffix: "∞", label: "CURIOSITY" },
] as const;

/** Inverted editorial section — paper background, ink type. */
export default function About() {
  return (
    <section
      id="about"
      className="bg-paper px-6 py-24 text-ink md:px-10 md:py-36"
      aria-label="About"
    >
      <div className="mb-16 flex items-baseline justify-between md:mb-24">
        <p className="u-label text-muted-dark">01 — ABOUT</p>
        <p className="u-label hidden text-muted-dark sm:block">( THE SHORT VERSION )</p>
      </div>

      <h2
        className="u-display max-w-6xl text-ink"
        style={{ fontSize: "clamp(2rem, 5.6vw, 5.5rem)", lineHeight: 1.02 }}
      >
        <WordsReveal
          segments={[
            { text: "I CREATE DIGITAL EXPERIENCES WHERE" },
            { text: "design,", serif: true },
            { text: "CODE AND" },
            { text: "motion", serif: true },
            { text: "MEET." },
          ]}
        />
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12">
        <Reveal className="md:col-span-4 md:col-start-6" delay={0.1}>
          <p className="u-body text-base text-ink/80">
            I&apos;m Umais — a senior software engineer based in Toronto. By
            day I build full-stack products in .NET and Blazor; the rest of
            the time I treat the browser as a medium, not a document viewer —
            type that responds, layouts that breathe, interfaces that feel
            physical.
          </p>
        </Reveal>
        <Reveal className="md:col-span-3 md:col-start-10" delay={0.2}>
          <p className="u-body text-sm text-muted-dark">
            That double life is the point: the engineering background means
            the experimental work still ships on time, works on a phone, and
            survives production.
          </p>
        </Reveal>
      </div>

      {/* Stats — typographic columns, not cards */}
      <div className="mt-20 grid grid-cols-1 border-t border-line-dark sm:grid-cols-3 md:mt-32">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.12}
            className={`border-b border-line-dark py-10 sm:border-b-0 sm:py-12 ${
              i > 0 ? "sm:border-l sm:pl-10" : ""
            }`}
          >
            <p
              className="u-display text-ink"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              {s.value === null ? (
                <span aria-label="infinite">∞</span>
              ) : (
                <Counter to={s.value} pad={s.pad} suffix={s.suffix} />
              )}
            </p>
            <p className="u-label mt-3 text-muted-dark">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

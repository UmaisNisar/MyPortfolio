"use client";

import { site } from "@/data/site";
import LineReveal from "@/components/animations/LineReveal";
import Reveal from "@/components/animations/Reveal";
import Magnetic from "@/components/animations/Magnetic";

const rows = [
  { label: "EMAIL", href: `mailto:${site.email}`, external: false },
  ...site.socials.map((s) => ({
    label: s.label.toUpperCase(),
    href: s.href,
    external: true,
  })),
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 pb-32 pt-24 md:px-10 md:pb-44 md:pt-36"
      aria-label="Contact"
    >
      <div className="mb-14 flex items-baseline justify-between md:mb-20">
        <p className="u-label text-muted-dark">05 — CONTACT</p>
        <p className="u-label text-muted-dark">( SAY HELLO )</p>
      </div>

      <div className="grid grid-cols-1 items-end gap-16 lg:grid-cols-12">
        <h2
          className="u-display text-paper lg:col-span-7"
          style={{ fontSize: "clamp(4rem, 13vw, 13rem)" }}
        >
          <LineReveal duration={1.15}>LET&apos;S</LineReveal>
          <LineReveal duration={1.15} delay={0.1}>
            MAKE
          </LineReveal>
          <LineReveal duration={1.15} delay={0.2} innerClassName="flex items-baseline">
            <span className="u-serif-accent" style={{ fontSize: "0.94em" }}>
              something
            </span>
            <span className="text-accent">.</span>
          </LineReveal>
        </h2>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.2}>
            <p className="u-body mb-10 max-w-sm text-sm text-muted">
              Have a project that needs more than a template? I&apos;m
              currently {site.availability.toLowerCase()} — the fastest way to
              reach me is a short email.
            </p>
          </Reveal>

          <ul>
            {rows.map((row, i) => (
              <Reveal key={row.label} delay={0.25 + i * 0.07} y={24}>
                <li className="border-t border-line last:border-b">
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center justify-between py-5"
                  >
                    <span className="u-display text-xl text-paper transition-colors group-hover:text-accent md:text-2xl">
                      {row.label}
                    </span>
                    <span className="u-label -translate-x-2 text-muted opacity-60 transition-all duration-400 ease-out group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100">
                      →
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Big magnetic CTA */}
      <Reveal delay={0.3} className="mt-24 flex justify-center md:mt-32">
        <Magnetic strength={0.25}>
          <a
            href={`mailto:${site.email}?subject=New%20project`}
            className="group relative flex h-44 w-44 items-center justify-center rounded-full border border-line text-center transition-colors duration-500 hover:border-accent md:h-56 md:w-56"
            data-cursor="none"
          >
            <span className="absolute inset-0 scale-0 rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
            <span className="u-label relative z-10 text-paper transition-colors duration-300 group-hover:text-ink">
              START A<br />
              PROJECT ↗
            </span>
          </a>
        </Magnetic>
      </Reveal>
    </section>
  );
}

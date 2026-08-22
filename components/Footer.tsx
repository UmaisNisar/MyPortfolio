"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useLenis } from "@/components/providers/SmoothScroll";
import ScrambleText from "@/components/animations/ScrambleText";

function LocalTime() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: site.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time}
    </span>
  );
}

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  return (
    <footer className="hairline-t bg-ink px-6 pb-8 pt-14 md:px-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <p className="u-label text-paper">{site.wordmark} ©</p>
          <p className="u-label mt-2 text-muted">{site.role.toUpperCase()}</p>
        </div>

        <div className="md:col-span-3">
          <p className="u-label text-muted-dark">LOCATION</p>
          <p className="u-label mt-2 text-muted">
            {site.location.toUpperCase()} — {site.timezoneLabel}
          </p>
          <p className="u-label mt-1 text-muted">
            <LocalTime /> LOCAL
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="u-label text-muted-dark">STATUS</p>
          <p className="u-label mt-2 flex items-center gap-2 text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {site.availability.toUpperCase()}
          </p>
        </div>

        <div className="col-span-2 flex flex-col gap-2 md:col-span-2 md:items-end">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="u-label text-muted transition-colors hover:text-accent"
            >
              <ScrambleText text={s.label.toUpperCase()} /> ↗
            </a>
          ))}
        </div>
      </div>

      <div className="mt-14 flex items-end justify-between">
        <p className="u-label text-muted-dark">
          © {year} — DESIGNED &amp; BUILT BY {site.name.toUpperCase()}
        </p>
        <button
          onClick={() =>
            lenis
              ? lenis.scrollTo(0, { duration: 1.6 })
              : window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="u-label text-muted transition-colors hover:text-accent"
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}

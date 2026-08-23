import Link from "next/link";
import NotFoundGame from "@/components/NotFoundGame";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-start justify-center px-6 py-28 md:px-10">
      <p className="u-label text-muted-dark">ERROR — 404</p>
      <h1
        className="u-display mt-6 text-paper"
        style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
      >
        LOST IN
        <br />
        <span className="u-serif-accent" style={{ fontSize: "0.92em" }}>
          the void
        </span>
        <span className="text-accent">.</span>
      </h1>
      <Link
        href="/"
        className="u-label mt-10 border-b border-accent pb-1 text-paper transition-colors hover:text-accent"
      >
        BACK HOME →
      </Link>

      <NotFoundGame />
    </section>
  );
}

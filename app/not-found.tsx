import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-start justify-center px-6 md:px-10">
      <p className="u-label text-muted-dark">ERROR — 404</p>
      <h1
        className="u-display mt-6 text-paper"
        style={{ fontSize: "clamp(4rem, 16vw, 14rem)" }}
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
    </section>
  );
}

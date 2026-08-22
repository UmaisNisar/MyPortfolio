/**
 * Project data — all demo/fictional work. Replace with real projects.
 *
 * To add a project:
 *  1. Add an entry here (keep slugs kebab-case).
 *  2. Drop its poster into /public/projects/<slug>.svg (or .jpg/.png
 *     — just update `image`). Recommended ratio ~4:3 or taller.
 */

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  overview: string;
  challenge: string;
  approach: string;
  interaction: string;
  development: string;
  result: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  /** Controls the editorial composition on the home page. */
  layout: "wide" | "left" | "right";
};

export const projects: Project[] = [
  {
    slug: "nocturne",
    index: "01",
    title: "Nocturne",
    category: "Digital Flagship",
    year: "2026",
    client: "Nocturne Atelier",
    role: "Design & Frontend Development",
    description:
      "A cinematic digital flagship for an independent fashion atelier — built around darkness, type and restraint.",
    overview:
      "Nocturne Atelier needed a home on the web that felt like their runway shows: dark, deliberate and quiet until it moves. The site treats each collection as a scene, with typography carrying the narrative and imagery revealed through motion rather than layout.",
    challenge:
      "Fashion sites tend to collapse into grids of lookbook thumbnails. The atelier wanted the opposite — an experience where a single garment can hold the entire viewport, and where navigation feels like moving through a space rather than clicking through pages.",
    approach:
      "The design language borrows from printed show invitations: oversized condensed type, generous black space and a single signal color used only for wayfinding. Every layout was composed on a strict 12-column grid, then deliberately broken in one place per scene.",
    interaction:
      "Scroll velocity drives the pace of image reveals, so slow scrolling feels like studying a garment and fast scrolling like walking past it. A custom cursor becomes the only visible UI inside collection scenes.",
    development:
      "Built as a fully static Next.js site with GSAP scene choreography and a Lenis-driven scroll timeline. All imagery is lazy-loaded and transform-animated only, holding a steady 60fps on mid-range hardware.",
    result:
      "The flagship became the atelier's most-shared piece of marketing, doubling average session length against their previous site.",
    technologies: ["Next.js", "TypeScript", "GSAP", "Lenis", "Tailwind CSS"],
    image: "/projects/nocturne.svg",
    imageAlt: "Nocturne — dark editorial composition with orbital forms",
    layout: "wide",
  },
  {
    slug: "pulsegrid",
    index: "02",
    title: "Pulsegrid",
    category: "Interactive Experience",
    year: "2025",
    client: "Pulsegrid Festival",
    role: "Creative Development",
    description:
      "A real-time audio-reactive visual identity for an electronic music festival, running entirely in the browser.",
    overview:
      "Pulsegrid asked for a site that could feel like the festival itself: a system of pulsing geometry that reacts to sound and touch. The identity is generated live — no two visitors see exactly the same page.",
    challenge:
      "Audio-reactive visuals usually mean heavy WebGL builds that exclude older devices. The brief demanded the same energy on a three-year-old phone as on a studio display, with a hard performance budget.",
    approach:
      "Instead of shaders, the visual system is built from a dense canvas grid of points whose displacement, scale and color respond to a lightweight analysis loop. The grid doubles as the navigation background, so the identity is never decoration — it is the interface.",
    interaction:
      "Pointer movement injects energy into the grid; on mobile, the accelerometer nudges it. Lineup entries magnetize toward the cursor, and the schedule is explored through a scrubbed horizontal timeline.",
    development:
      "A single requestAnimationFrame loop drives the whole system with object pooling and zero per-frame allocation. The site degrades gracefully: reduced-motion visitors get a still composition of the same grid.",
    result:
      "Festival ticket pages saw a 3× increase in dwell time, and the visual system was reused across screens on site.",
    technologies: ["React", "TypeScript", "Canvas 2D", "Framer Motion"],
    image: "/projects/pulsegrid.svg",
    imageAlt: "Pulsegrid — pulsing dot grid distorted by a waveform",
    layout: "left",
  },
  {
    slug: "atlas-archive",
    index: "03",
    title: "Atlas Archive",
    category: "Editorial Platform",
    year: "2025",
    client: "Atlas Press",
    role: "Design & Frontend Development",
    description:
      "A digital archive of brutalist architecture, treated like an oversized printed index you can walk through.",
    overview:
      "Atlas Press digitized four decades of photography of concrete architecture. The archive presents each building as an editorial spread — plate number, coordinates, huge imagery — rather than a searchable database.",
    challenge:
      "Archives die when they feel like spreadsheets. The task was to make three hundred entries browsable without a single dropdown filter, keeping the tactility of the printed volumes the press is known for.",
    approach:
      "The index is a continuous vertical scroll of typographic plates; imagery loads only when a plate is opened. Metadata is set in a strict monospaced system inspired by archival catalog cards, and every page number, coordinate and date is real content, not ornament.",
    interaction:
      "Hovering a plate reveals its photograph behind the type, tilted by cursor position. A drag-driven horizontal strip lets visitors flip through a building's full set of photographs like contact sheets.",
    development:
      "Static generation renders all three hundred plates at build time. Images are aggressively sized through the framework's image pipeline, and the whole archive weighs less than a single uncompressed archive photograph.",
    result:
      "The archive was featured in three design publications and became the press's primary sales channel for the printed volumes.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/projects/atlas-archive.svg",
    imageAlt: "Atlas Archive — brutalist geometric blocks and archival grid",
    layout: "right",
  },
  {
    slug: "verra",
    index: "04",
    title: "Verra",
    category: "E-Commerce Concept",
    year: "2024",
    client: "Verra Objects",
    role: "Frontend Development",
    description:
      "A slow-commerce storefront for sculptural homeware, where every product page reads like a catalog essay.",
    overview:
      "Verra makes six objects a year. Their store rejects the conventions of e-commerce urgency — no sales, no countdowns — in favor of long-form product storytelling with a deliberate, unhurried pace.",
    challenge:
      "Conversion patterns and editorial pacing usually fight each other. The store needed to keep a purchase always one gesture away without ever letting commerce interrupt the reading experience.",
    approach:
      "Each object's page is a single scroll narrative: material studies, process photography and the maker's notes, with a persistent, quiet purchase bar that only asserts itself when scrolling stops. Typography does the selling.",
    interaction:
      "Product photography responds to the cursor with a subtle parallax between object and shadow. The cart is a full-screen takeover with its own choreographed entrance rather than a slide-out tray.",
    development:
      "Built fully static with client-side cart state, keeping the stack deployable from a repository alone. Checkout hands off to a hosted payment page, so the storefront itself needs no backend at all.",
    result:
      "The concept validated slow-commerce for the studio: average order value rose while support requests fell.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Zustand"],
    image: "/projects/verra.svg",
    imageAlt: "Verra — still-life arrangement of abstract sculptural forms",
    layout: "left",
  },
  {
    slug: "signal-path",
    index: "05",
    title: "Signal Path",
    category: "Data Storytelling",
    year: "2024",
    client: "Meridian Research",
    role: "Design & Frontend Development",
    description:
      "An interactive annual report that turns a year of research data into a scroll-driven signal journey.",
    overview:
      "Meridian's annual report had lived in PDFs for a decade. Signal Path rebuilds it as a single continuous scroll where each chapter's data draws itself as the reader arrives, in one uninterrupted line.",
    challenge:
      "Data storytelling often decorates numbers instead of explaining them. Every animated chart had to earn its motion — movement only where it clarified change over time, magnitude or connection.",
    approach:
      "One continuous SVG path — the 'signal' — runs the entire length of the report, becoming in turn a timeline, a line chart and a divider. Chapters are typeset like a printed annual with numbered folios and marginal annotations.",
    interaction:
      "Scroll position draws the signal path and triggers chart states. Key figures count up in place, and readers can scrub any chart backward simply by scrolling back — nothing is fire-once.",
    development:
      "Charts are hand-built SVG animated with scroll-linked timelines, not a charting library, keeping the bundle small and the motion fully art-directed. All data ships as static JSON at build time.",
    result:
      "Report readership tripled year over year, and completion analytics showed most readers reaching the final chapter.",
    technologies: ["React", "TypeScript", "GSAP", "SVG"],
    image: "/projects/signal-path.svg",
    imageAlt: "Signal Path — continuous line drawing through chart forms",
    layout: "wide",
  },
  {
    slug: "kinetic-type",
    index: "06",
    title: "Kinetic Type",
    category: "Experiment",
    year: "2023",
    client: "Self-initiated",
    role: "Everything",
    description:
      "A self-initiated playground of typographic motion studies — type that stretches, shatters and breathes.",
    overview:
      "Kinetic Type is an ongoing series of browser-native motion studies: variable fonts pushed through scroll, cursor and time. Each study isolates a single idea and refuses to add a second one.",
    challenge:
      "Experiments sprawl. The constraint was one interaction per study, shipping monthly, each performant enough to run full-screen on a phone — a discipline of subtraction rather than accumulation.",
    approach:
      "Every study is built on the same minimal chassis: one variable font, one input (scroll, cursor or clock), one transformation. The series identity comes from the consistency of the chassis, not a shared visual style.",
    interaction:
      "Studies include weight that follows scroll velocity, glyphs that scatter from the cursor and re-set themselves, and a clock face typeset entirely through variable font axes shifting in real time.",
    development:
      "Each study is a self-contained route sharing a tiny animation core built on requestAnimationFrame and the Web Animations API. The whole series ships without a single animation dependency.",
    result:
      "The series became the most-visited part of the portfolio and the origin of techniques used across client work.",
    technologies: ["TypeScript", "Variable Fonts", "Web Animations API"],
    image: "/projects/kinetic-type.svg",
    imageAlt: "Kinetic Type — oversized glyphs mid-transformation",
    layout: "right",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

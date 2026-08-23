/**
 * Real projects, pulled from github.com/UmaisNisar.
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
  /** Optional outbound links shown on the detail page. */
  live?: string;
  repo?: string;
  /** Controls the editorial composition on the home page. */
  layout: "wide" | "left" | "right";
};

export const projects: Project[] = [
  {
    slug: "invest-advisor",
    index: "01",
    title: "InvestAdvisor",
    category: "AI-Powered Web App",
    year: "2026",
    client: "Personal product",
    role: "Design & Full-Stack Development",
    description:
      "A personal AI investment advisor that watches my portfolio, screens the market and tells me where to look next.",
    overview:
      "InvestAdvisor is a single-user investment monitoring and advisory tool I built for my own portfolio. It pulls holdings and live market data, has an LLM review the entire portfolio in one pass, and surfaces per-holding calls — add, hold, trim or sell — each with a conviction level and a data-grounded reason, plus a daily cross-asset shortlist of where to look next.",
    challenge:
      "LLM output is only useful for investing if it can be trusted not to hallucinate. Every call had to be grounded in real numbers, API costs had to stay near zero, and the data layer had to cover stocks, ETFs and crypto across three currencies — using only free-tier sources.",
    approach:
      "A percentile-rank factor model (growth, valuation, momentum, quality, analyst and insider signals) forms the quantitative spine. The LLM narrates on top of scored data instead of inventing figures, and the consolidated daily analysis is capped to a single call to control cost. The dashboard surfaces the strongest calls first.",
    interaction:
      "A responsive MudBlazor dashboard that works on a phone: drop in a Wealthsimple CSV export and holdings reconstruct themselves into quotable tickers, a watchlist fires on price targets, and email alerts flag drift or critical warnings.",
    development:
      "C# and Blazor end to end. Multi-source pricing stitches together Finnhub for US equities, Yahoo Finance for international listings, CoinGecko for crypto and Frankfurter for FX — with everything converted to USD at live rates for totals and P/L.",
    result:
      "It's now my daily research tool — portfolio-wide analysis on demand without a premium data subscription, while every trade decision stays human.",
    technologies: ["C#", ".NET", "Blazor", "MudBlazor", "LLM APIs", "SQL"],
    image: "/projects/invest-advisor.svg",
    imageAlt: "InvestAdvisor — market signal line with portfolio call markers",
    repo: "https://github.com/UmaisNisar/InvestAdvisor",
    layout: "wide",
  },
  {
    slug: "the-hidden-gem",
    index: "02",
    title: "The Hidden Gem",
    category: "Photography Portfolio",
    year: "2025",
    client: "The Hidden Gem",
    role: "Design & Development",
    description:
      "A portfolio and booking site for a sports photography and videography studio — built to let the work lead.",
    overview:
      "The Hidden Gem shoots sports — action photography, team photos, event coverage and highlight reels. Their site is a portfolio-first experience where galleries and video carry the story, backed by a booking flow so a visit can turn directly into a session.",
    challenge:
      "Sports photography lives on energy, and most portfolio templates flatten it. The site had to frame heavy imagery without stealing attention from it, stay fast on phones where most visitors arrive, and turn interest into bookings without a back-and-forth email chain.",
    approach:
      "Gallery-first information architecture: photography and reels front and center, services and booking one gesture away. Motion is used to give stills momentum — transitions and reveals that echo the pace of the sports being shot.",
    interaction:
      "Interactive galleries for browsing shoots, a video section for highlight reels, an integrated session-booking flow and a direct contact form.",
    development:
      "Next.js with TypeScript and Tailwind CSS, Radix UI primitives for accessible components, React Hook Form for the booking and contact flows, and Framer Motion for the animation layer.",
    result:
      "Shipped as the studio's home on the web — galleries, reels and session booking in one place.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion"],
    image: "/projects/the-hidden-gem.svg",
    imageAlt: "The Hidden Gem — camera aperture blades and frame markings",
    repo: "https://github.com/UmaisNisar/the-hidden-gem",
    layout: "left",
  },
  {
    slug: "tandoori-tastes",
    index: "03",
    title: "Tandoori Tastes",
    category: "Restaurant Site & CMS",
    year: "2025",
    client: "Tandoori Tastes",
    role: "Design & Development",
    description:
      "A restaurant website with a complete self-serve admin panel — the owner runs everything without a developer.",
    overview:
      "Tandoori Tastes needed more than a brochure: a warm, appetizing public site and a way for the owner to change what's on it — menu, specials, hours, photos — without ever calling a developer. The project pairs a mobile-first storefront with a full content management panel.",
    challenge:
      "Restaurant sites go stale the moment a menu changes. The real problem wasn't the public pages — it was giving a non-technical owner safe, complete control over menu items, holiday hours, announcements, reviews and gallery images from day one.",
    approach:
      "A warm, menu-first design for guests, and a protected admin panel organized around the owner's actual tasks: update a dish, post a special, set holiday hours, approve a testimonial, upload photos. Every piece of public content is editable.",
    interaction:
      "Guests browse a dynamic menu, current announcements and specials, store hours and a gallery. The owner signs into the admin panel and edits the same content through simple forms with image upload.",
    development:
      "Next.js 14 App Router with TypeScript and Tailwind CSS. Content lives in SQLite through Prisma ORM, and the admin panel is secured with NextAuth v5 authentication.",
    result:
      "Deployed on Vercel and handed off — the owner manages the entire site personally, with no developer involvement since launch.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "NextAuth"],
    image: "/projects/tandoori-tastes.svg",
    imageAlt: "Tandoori Tastes — plate ring with rising steam and menu lines",
    live: "https://tandoori-taste-website.vercel.app",
    repo: "https://github.com/UmaisNisar/TandooriTasteWebsite",
    layout: "right",
  },
  {
    slug: "dojo-sequence",
    index: "04",
    title: "Dojo Sequence",
    category: "Training Platform",
    year: "2026",
    client: "Self-initiated",
    role: "Design & Development",
    description:
      "A structured training curriculum for learning Tekken 8 characters — learn, drill, pass, unlock the next skill.",
    overview:
      "Fighting games teach terribly: a hundred-move list and a shrug. Dojo Sequence turns learning a Tekken 8 character into a strict, ordered curriculum — it ships with a complete Kazuya course of 45 training items across 8 stages, from movement to full gameplan, with frame data cross-verified against TekkenDocs and Wavu Wiki and execution tips written for leverless players.",
    challenge:
      "Practice only works when it's measurable and ordered. The app had to know what you should practice right now, refuse to mark a skill learned until its pass condition is genuinely met, and keep frame data trustworthy across game patches — all without a backend.",
    approach:
      "A linear unlock system: stages and items open in strict order, while locked content stays visible so the road ahead is always on screen. A Today screen answers 'what should I practice right now?', and already-learned skills resurface for retention based on how stale they've become.",
    interaction:
      "Session mode runs a fast loop over your next items plus retention reps. Drills are measurable — consecutive reps, accuracy sets, timed holds, concept checks — and the whole app is built to sit on a phone next to your controller, with an in-app reduce-motion toggle.",
    development:
      "Fully static Next.js App Router with everything running in the browser — progress lives in localStorage with validated JSON export/import. Frame data has a single source of truth per character, stamped with game version, and the app background-checks it against Wavu Wiki's live database daily, highlighting values a patch has changed.",
    result:
      "Live and free at dojo-sequence.vercel.app — a complete, patch-aware Kazuya curriculum with no accounts, no database, no server.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "localStorage"],
    image: "/projects/dojo-sequence.svg",
    imageAlt: "Dojo Sequence — arcade input notation lighting up in order",
    live: "https://dojo-sequence.vercel.app",
    repo: "https://github.com/UmaisNisar/dojo-sequence",
    layout: "wide",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

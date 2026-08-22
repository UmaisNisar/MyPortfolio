# Umais Nisar — Portfolio

An experimental, animation-driven personal portfolio. 100% static frontend —
no backend, no APIs, no environment variables. Built with:

- **Next.js 16** (App Router, static generation, Turbopack)
- **TypeScript** + **Tailwind CSS v4**
- **Framer Motion** (reveals, transitions, marquee, cursor states)
- **GSAP + ScrollTrigger** (pinned horizontal expertise section)
- **Lenis** (smooth scrolling)

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

Push to GitHub and import the repository in Vercel. No configuration needed.

## Customizing

All content lives in `data/` — no component edits required:

| File | What it holds |
| --- | --- |
| `data/site.ts` | Name, email, location, socials, availability, site URL |
| `data/projects.ts` | Projects (currently fictional demos) + case-study copy |
| `data/experience.ts` | Experience timeline entries |
| `data/skills.ts` | Expertise categories for the horizontal section |

**Add a project:** add an entry to `data/projects.ts` and drop its poster in
`public/projects/<slug>.svg` (or `.jpg`/`.png` — update the `image` path).
The detail page, home feature and next-project link are generated from data.

**Change the accent color:** edit `--accent` in `app/globals.css`
(also used in the SVG posters and `app/opengraph-image.tsx`).

**After deploying:** update `site.url` in `data/site.ts` so Open Graph
metadata and the sitemap point at your real domain.

## Structure

```
app/                  routes, layout, SEO (og image, icon, sitemap, robots)
app/work/[slug]/      project detail experience
components/
  animations/         reveal / magnetic / scramble / counter primitives
  providers/          Lenis smooth scroll, preloader, page transitions
  sections/           home page sections
  ui/                 custom cursor, scroll progress, transition link
data/                 ALL editable content
lib/                  motion constants, hooks
public/projects/      poster artwork
```

## Accessibility & performance

- Respects `prefers-reduced-motion` everywhere (Lenis, GSAP, Framer, cursor)
- Custom cursor is desktop-only; mobile gets native interactions
- Canvas hero pauses off-screen; animations are transform/opacity only
- Semantic HTML, skip link, keyboard-visible focus states

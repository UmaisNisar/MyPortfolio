/**
 * Expertise categories — shown in the horizontal scroll section.
 */

export type SkillCategory = {
  index: string;
  title: string;
  blurb: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    index: "01",
    title: "Design",
    blurb: "Interfaces composed like editorial spreads — type first, decoration last.",
    items: [
      "Interaction Design",
      "Typography",
      "Layout & Composition",
      "Design Systems",
      "Figma",
      "Art Direction",
    ],
  },
  {
    index: "02",
    title: "Frontend",
    blurb: "Modern React architecture with an obsession for the last 16 milliseconds.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML / CSS",
    ],
  },
  {
    index: "03",
    title: "Interaction",
    blurb: "Motion as language — choreographed, purposeful, never decorative noise.",
    items: [
      "GSAP / ScrollTrigger",
      "Framer Motion",
      "Lenis",
      "Canvas 2D",
      "SVG Animation",
      "Variable Fonts",
    ],
  },
  {
    index: "04",
    title: "Technology",
    blurb: "A full-stack past that keeps the frontend honest and shippable.",
    items: ["ASP.NET Core", "Blazor", "C#", "SQL Server", "Azure", "EF Core"],
  },
];

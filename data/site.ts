/**
 * Global site data — edit everything here.
 */

export const site = {
  name: "Umais Nisar",
  initials: "UN",
  wordmark: "UMAIS NISAR",
  role: "Senior Software Engineer & Creative Developer",
  email: "umais.nisar01@gmail.com",
  location: "Toronto, Canada",
  timezoneLabel: "ET",
  timezone: "America/Toronto",
  availability: "Available for select projects",
  url: "https://umaisnisar.vercel.app", // update after deploying
  description:
    "Umais Nisar — senior software engineer and creative developer crafting cinematic, animation-driven digital experiences where design, code and motion meet.",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/umais-nisar-18ab70220/",
    },
    { label: "GitHub", href: "https://github.com/UmaisNisar" },
    { label: "Instagram", href: "https://www.instagram.com/umais.nisar/" },
  ],
} as const;

// Order matches the scroll order of sections on the home page.
export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

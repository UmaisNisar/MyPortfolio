/**
 * Experience timeline — sourced from the real resume.
 */

export type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  technologies: string[];
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "VCA Software",
    role: "Senior Software Engineer",
    duration: "Sep 2026 — Now",
    technologies: ["C#", ".NET", "SQL", "Azure"],
    description:
      "Senior engineering across the stack — owning features end to end, from architecture and APIs to the interfaces people actually touch.",
  },
  {
    company: "Enable App Inc.",
    role: "Full Stack Developer",
    duration: "Feb 2024 — Aug 2026",
    technologies: ["Blazor WASM", "ASP.NET Core", "Azure", "MSSQL"],
    description:
      "Built multiple products end to end — ERP data pipelines, Stripe and Zoho integrations, CQRS clean architecture and a modular inspection-reporting system.",
  },
  {
    company: "MRS Technologies",
    role: "Software Engineer I",
    duration: "Oct 2024 — Mar 2025",
    technologies: ["Blazor Server", "MudBlazor", "EF Core", "SQL Server"],
    description:
      "Developed responsive Blazor Server applications with robust REST APIs, hardened authentication with Identity Core and tuned database performance.",
  },
  {
    company: "The Byng Group",
    role: "Jr. Full Stack Developer",
    duration: "Jun 2023 — Feb 2024",
    technologies: ["Blazor WASM", ".NET MAUI", "SQL"],
    description:
      "Enhanced a Blazor WebAssembly product and re-architected the migration of a 500,000-line Silverlight codebase to Blazor.",
  },
];

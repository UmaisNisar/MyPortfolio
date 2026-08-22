/**
 * Experience timeline — sourced from the real resume.
 * Check the VCA Software start date; it was assumed as 2025.
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
    duration: "2025 — Now",
    technologies: ["C#", ".NET", "SQL", "Azure"],
    description:
      "Senior engineering across the stack — owning features end to end, from architecture and APIs to the interfaces people actually touch.",
  },
  {
    company: "Enable App Inc.",
    role: "Full Stack Developer",
    duration: "2024 — 2025",
    technologies: ["Blazor WASM", "ASP.NET Core", "Azure", "MSSQL"],
    description:
      "Built multiple products end to end — ERP data pipelines, Stripe and Zoho integrations, CQRS clean architecture and a modular inspection-reporting system.",
  },
  {
    company: "MRS Technologies",
    role: "Software Engineer I",
    duration: "2024 — 2025",
    technologies: ["Blazor Server", "MudBlazor", "EF Core", "SQL Server"],
    description:
      "Developed responsive Blazor Server applications with robust REST APIs, hardened authentication with Identity Core and tuned database performance.",
  },
  {
    company: "The Byng Group",
    role: "Jr. Full Stack Developer",
    duration: "2023 — 2024",
    technologies: ["Blazor WASM", ".NET MAUI", "SQL"],
    description:
      "Enhanced a Blazor WebAssembly product and re-architected the migration of a 500,000-line Silverlight codebase to Blazor.",
  },
];

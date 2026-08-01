export const PROJECT_CATEGORIES = [
  "Web Development",
  "Mobile Apps",
  "AI & ML",
  "SaaS",
  "Open Source",
  "DevTools",
  "UI/UX",
  "Game Development",
  "Browser Extension",
  "API",
  "CLI",
  "Other",
] as const;

export type ProjectCategory =
  (typeof PROJECT_CATEGORIES)[number];
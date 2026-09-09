export async function getMyProjects() {
  const res = await fetch("/api/projects/me");

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}
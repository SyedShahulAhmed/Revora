// src/app/projects/page.tsx

import { connectDB } from "@/lib/db";
import { getProjects } from "@/services/project.service";
import ProjectCard from "@/components/project/ProjectCard";

export default async function ProjectsPage() {
  await connectDB();

  const projects = await getProjects({
    status: "published",
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Projects
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover projects, explore ideas, and provide valuable feedback to
          fellow builders.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="flex min-h-75 items-center justify-center rounded-2xl border">
          <p className="text-muted-foreground">
            No projects have been published yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard
              key={project._id.toString()}
              project={{
                ...project,
                _id: project._id.toString(),
                ownerId: {
                  ...project.ownerId,
                  _id: project.ownerId?._id?.toString(),
                },
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
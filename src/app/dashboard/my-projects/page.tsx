import Link from "next/link";
import { Plus } from "lucide-react";

import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { getProjects } from "@/services/project.service";
import ProjectCard from "@/components/project/ProjectCard";

export default async function MyProjectsPage() {
  await connectDB();

  const authUser = await getAuthUser();

  if (!authUser) {
    return null;
  }

  const projects = await getProjects({
    ownerId: authUser.userId,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            My Projects
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage and track all your submitted projects.
          </p>
        </div>

        <Link
          href="/dashboard/my-projects/new"
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed">
          <h3 className="text-xl font-semibold">
            No Projects Yet
          </h3>

          <p className="mt-2 text-muted-foreground">
            Submit your first project to start receiving reviews.
          </p>

          <Link
            href="/dashboard/my-projects/new"
            className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-400 transition hover:bg-cyan-500/20"
          >
            Create Project
          </Link>
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
              showActions
            />
          ))}
        </div>
      )}
    </div>
  );
}
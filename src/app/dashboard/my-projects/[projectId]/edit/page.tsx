import { connectDB } from "@/lib/db";
import { getProjectById } from "@/services/project.service";
import { notFound } from "next/navigation";

import ProjectForm from "@/components/project/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) {
  await connectDB();

  const { projectId } =
    await params;

  const project =
    await getProjectById(
      projectId
    );

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Edit Project
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your project.
        </p>
      </div>

      <ProjectForm
        project={JSON.parse(
          JSON.stringify(project)
        )}
      />
    </div>
  );
}
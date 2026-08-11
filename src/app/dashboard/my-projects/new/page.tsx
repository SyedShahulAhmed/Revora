import ProjectForm from "@/components/project/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Create Project
        </h1>

        <p className="mt-2 text-muted-foreground">
          Submit your project and start receiving reviews from the community.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
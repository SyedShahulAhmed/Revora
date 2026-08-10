import Image from "next/image";
import Link from "next/link";
import { Pencil, Star } from "lucide-react";

import { Project } from "@/types/project";
import DeleteProjectButton from "./DeleteProjectButton";

type ProjectCardProps = {
  project: Project;
  showActions?: boolean;
};

export default function ProjectCard({
  project,
  showActions = false,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
      <Link href={`/dashboard/projects/${project.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.coverImage || "/images/default.png"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full border px-2 py-1 text-xs">
                {project.category}
              </span>

              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-current" />
                <span>{project.averageRating.toFixed(1)}</span>
              </div>
            </div>

            <h3 className="line-clamp-1 text-lg font-semibold">
              {project.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-muted px-2 py-1 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              {project.ownerId?.avatar ? (
                <Image
                  src={project.ownerId.avatar}
                  alt={project.ownerId.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {project.ownerId?.name?.charAt(0)}
                </div>
              )}

              <div>
                <p className="text-xs font-medium">
                  {project.ownerId?.name}
                </p>

                <p className="text-[11px] text-muted-foreground">
                  @{project.ownerId?.username}
                </p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {project.reviewCount} Reviews
            </div>
          </div>
        </div>
      </Link>

      {showActions && (
        <div className="flex gap-2 border-t p-4">
          <Link
            href={`/dashboard/my-projects/${project._id}/edit`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:border-cyan-500 hover:text-cyan-400"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>

          <DeleteProjectButton projectId={project._id} />
        </div>
      )}
    </article>
  );
}
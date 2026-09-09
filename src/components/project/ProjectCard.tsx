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
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/10
        bg-zinc-950/90
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-cyan-400/40
        hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
      "
    >
      <Link href={`/dashboard/projects/${project.slug}`}>
        {/* IMAGE */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.coverImage || "/images/default.png"}
            alt={project.title}
            fill
            className="
              object-cover
              transition-all
              duration-700
              group-hover:scale-110
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

          {/* Rating */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border border-cyan-500/30 bg-black/70 px-3 py-1 backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
            <span className="text-xs font-medium text-white">
              {project.averageRating.toFixed(1)}
            </span>
          </div>

          {/* Category */}
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className="
                rounded-full
                border
                border-cyan-500/30
                bg-cyan-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-cyan-300
                backdrop-blur-md
              "
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-5 p-5">
          <div>
            <h3
              className="
                line-clamp-1
                text-xl
                font-bold
                tracking-tight
                text-white
                transition-colors
                duration-300
                group-hover:text-cyan-300
              "
            >
              {project.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
              {project.shortDescription}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span>{project.reviewCount} Reviews</span>
            <span>•</span>
            <span>{project.techStack.length} Technologies</span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-1
                  text-xs
                  text-zinc-300
                  transition-all
                  duration-300
                  hover:border-cyan-500/30
                  hover:text-cyan-300
                "
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-3">
              {project.ownerId?.avatar ? (
                <Image
                  src={project.ownerId.avatar}
                  alt={project.ownerId.name}
                  width={36}
                  height={36}
                  className="
                    rounded-full
                    ring-2
                    ring-cyan-500/20
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-cyan-500/10
                    text-sm
                    font-semibold
                    text-cyan-300
                  "
                >
                  {project.ownerId?.name?.charAt(0)}
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-white">
                  {project.ownerId?.name}
                </p>

                <p className="text-xs text-zinc-500">
                  @{project.ownerId?.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {showActions && (
        <div className="flex gap-2 border-t border-white/5 p-4">
          <Link
            href={`/dashboard/my-projects/${project._id}/edit`}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              px-4
              py-2.5
              text-sm
              transition-all
              duration-300
              hover:border-cyan-500
              hover:bg-cyan-500/10
              hover:text-cyan-300
            "
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
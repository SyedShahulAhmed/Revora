import Image from "next/image";
import Link from "next/link";
import { Eye, Star, ArrowRight } from "lucide-react";

type Props = {
  projects?: any[];
};

export default function PublicProfileProjects({
  projects = [],
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Projects
          </h2>

          <p className="mt-1 text-sm text-neutral-400">
            {projects.length} published projects
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
          <p className="text-neutral-500">
            No published projects yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={String(project._id)}
              href={`/projects/${project.slug}`}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                transition-all
                hover:border-white/20
              "
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={
                    project.coverImage ||
                    "/images/default.png"
                  }
                  alt={project.title}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {project.category && (
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-black/50
                        px-3
                        py-1
                        text-xs
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {project.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                  {project.shortDescription}
                </p>

                {project.techStack?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack
                      .slice(0, 3)
                      .map((tech: string) => (
                        <span
                          key={tech}
                          className="
                            rounded-full
                            border
                            border-white/10
                            px-2.5
                            py-1
                            text-xs
                            text-neutral-300
                          "
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Eye size={15} />
                      {project.views || 0}
                    </span>

                    <span className="flex items-center gap-1">
                      <Star size={15} />
                      {project.reviewCount || 0}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-sm text-neutral-300 transition group-hover:text-white">
                    View
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
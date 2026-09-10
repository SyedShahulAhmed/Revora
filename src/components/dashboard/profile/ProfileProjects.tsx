import Image from "next/image";
import Link from "next/link";
import { Eye, Star, ArrowRight } from "lucide-react";

type Props = {
  projects: any[];
};

export default function ProfileProjects({ projects = [] }: Props) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-cyan-500/10
        bg-zinc-950/90
        p-6
        backdrop-blur-xl
      "
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects</h2>

          <p className="mt-1 text-sm text-zinc-500">
            {projects.length} published projects
          </p>
        </div>

        <Link
          href="/dashboard/my-projects"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-cyan-500/20
            bg-cyan-500/5
            px-4
            py-2
            text-sm
            text-cyan-300
            transition-all
            hover:border-cyan-500/40
            hover:bg-cyan-500/10
          "
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cyan-500/10 py-16 text-center">
          <p className="text-zinc-500">No projects published yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 6).map((project) => (
            <Link
              key={project._id}
              href={`/dashboard/projects/${project.slug}`}
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

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

                {/* Rating */}
                <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border border-cyan-500/30 bg-black/70 px-3 py-1 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
                  <span className="text-xs font-medium text-white">
                    {project.reviewCount}
                  </span>
                </div>

                {/* Category */}
                {project.category && (
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
                )}
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

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech: string) => (
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
                )}

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-cyan-500/10 pt-4">
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {project.views}
                    </span>

                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {project.reviewCount}
                    </span>
                  </div>

                  <span
                    className="
                      text-sm
                      text-cyan-300
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    View →
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

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Globe, FileText, PlayCircle, Star, Eye } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { connectDB } from "@/lib/db";
import { getProjectBySlug } from "@/services/project.service";
import GalleryLightbox from "@/components/project/ProjectGallery";
import ProjectGallery from "@/components/project/ProjectGallery";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectDB();

  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const owner = project.ownerId as unknown as {
    avatar: string;
    name: string;
    username: string;
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="space-y-10">
        {/* HERO */}
        <section className="relative h-[550px] overflow-hidden rounded-[32px] border border-cyan-500/10">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300 backdrop-blur">
                {project.category}
              </span>

              <span className="rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-sm backdrop-blur">
                ⭐ {project.averageRating.toFixed(1)}
              </span>

              <span className="rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-sm backdrop-blur">
                👁 {project.views}
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold text-white md:text-6xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-zinc-300">
              {project.shortDescription}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* ABOUT */}
            <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-8 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-bold">About Project</h2>

              <p className="whitespace-pre-wrap leading-8 text-zinc-400">
                {project.description}
              </p>
            </section>

            {/* TECH STACK */}
            <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-8 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-bold">Tech Stack</h2>

              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="
                      rounded-full
                      border
                      border-cyan-500/20
                      bg-cyan-500/5
                      px-4
                      py-2
                      text-sm
                      text-cyan-300
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* GALLERY */}
            <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-8 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-bold">Gallery</h2>

              <ProjectGallery
                images={[project.coverImage, ...project.gallery]}
              />
            </section>

            {/* REVIEWS */}
            <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-8 backdrop-blur-xl">
              <h2 className="text-2xl font-bold">Reviews</h2>

              <p className="mt-3 text-zinc-500">
                Be the first reviewer to share feedback about this project.
              </p>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* CREATOR */}
            <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 backdrop-blur-xl">
              <h3 className="mb-5 text-lg font-semibold">Creator</h3>

              <div className="flex flex-col items-center text-center">
                <Image
                  src={owner.avatar}
                  alt={owner.name}
                  width={96}
                  height={96}
                  className="rounded-full ring-2 ring-cyan-500/20"
                />

                <h4 className="mt-4 text-lg font-semibold">{owner.name}</h4>

                <p className="text-sm text-zinc-500">@{owner.username}</p>
                <Link
                  href={`/user/${owner.username}`}
                  className="
    mt-4
    inline-flex
    items-center
    justify-center
    rounded-xl
    border
    border-cyan-500/20
    bg-cyan-500/5
    px-4
    py-2
    text-sm
    font-medium
    text-cyan-300
    transition-all
    duration-300
    hover:border-cyan-500/50
    hover:bg-cyan-500/10
    hover:text-cyan-200
  "
                >
                  Visit Profile
                </Link>
              </div>
            </section>

            {/* LINKS */}
            <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 backdrop-blur-xl">
              <h3 className="mb-5 text-lg font-semibold">Project Links</h3>

              <div className="space-y-3">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                    transition-all
                    hover:border-cyan-500/40
                    hover:bg-cyan-500/10
                  "
                >
                  <SiGithub className="h-4 w-4" />
                  GitHub Repository
                </Link>

                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                      transition-all
                      hover:border-cyan-500/40
                      hover:bg-cyan-500/10
                    "
                  >
                    <Globe className="h-4 w-4" />
                    Live Demo
                  </Link>
                )}

                {project.docsUrl && (
                  <Link
                    href={project.docsUrl}
                    target="_blank"
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                      transition-all
                      hover:border-cyan-500/40
                      hover:bg-cyan-500/10
                    "
                  >
                    <FileText className="h-4 w-4" />
                    Documentation
                  </Link>
                )}

                {project.videoUrl && (
                  <Link
                    href={project.videoUrl}
                    target="_blank"
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                      transition-all
                      hover:border-cyan-500/40
                      hover:bg-cyan-500/10
                    "
                  >
                    <PlayCircle className="h-4 w-4" />
                    Demo Video
                  </Link>
                )}
              </div>
            </section>

            {/* STATS */}
            <section className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 backdrop-blur-xl">
              <h3 className="mb-5 text-lg font-semibold">Project Stats</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Rating</span>
                  <span>{project.averageRating.toFixed(1)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Views</span>
                  <span>{project.views}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Technologies</span>
                  <span>{project.techStack.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Reviews</span>
                  <span>{project.reviewCount}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

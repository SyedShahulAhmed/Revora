import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  FileText,
  PlayCircle,
  Star,
  Eye,
} from "lucide-react";

import { connectDB } from "@/lib/db";
import { getProjectBySlug } from "@/services/project.service";
import { SiGithub } from "react-icons/si";

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

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-8">
        {/* Cover */}
        <div className="relative aspect-video overflow-hidden rounded-3xl border">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Header */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full border px-3 py-1 text-xs">
              {project.category}
            </span>

            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-current" />
              {project.averageRating.toFixed(1)}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              {project.views}
            </div>
          </div>

          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={project.githubUrl}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2"
          >
            <SiGithub className="h-4 w-4" />
            GitHub
          </Link>

          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2"
            >
              <Globe className="h-4 w-4" />
              Live Demo
            </Link>
          )}

          {project.docsUrl && (
            <Link
              href={project.docsUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2"
            >
              <FileText className="h-4 w-4" />
              Docs
            </Link>
          )}

          {project.videoUrl && (
            <Link
              href={project.videoUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2"
            >
              <PlayCircle className="h-4 w-4" />
              Demo Video
            </Link>
          )}
        </div>

        {/* About */}
        <section className="rounded-2xl border p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            About Project
          </h2>

          <p className="whitespace-pre-wrap text-muted-foreground">
            {project.description}
          </p>
        </section>

        {/* Tech Stack */}
        <section className="rounded-2xl border p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-lg bg-muted px-3 py-2 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <section className="rounded-2xl border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Gallery
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image: string) => (
                <div
                  key={image}
                  className="relative aspect-video overflow-hidden rounded-xl border"
                >
                  <Image
                    src={image}
                    alt="Project Screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Creator */}
        <section className="rounded-2xl border p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Creator
          </h2>

          <div className="flex items-center gap-4">
            <Image
              src={project.ownerId.avatar}
              alt={project.ownerId.name}
              width={60}
              height={60}
              className="rounded-full"
            />

            <div>
              <p className="font-semibold">
                {project.ownerId.name}
              </p>

              <p className="text-muted-foreground">
                @{project.ownerId.username}
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Placeholder */}
        <section className="rounded-2xl border p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Reviews
          </h2>

          <p className="text-muted-foreground">
            Review system coming soon.
          </p>
        </section>
      </div>
    </div>
  );
}
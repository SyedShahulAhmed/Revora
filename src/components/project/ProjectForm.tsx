"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProjectSchema,
  CreateProjectInput,
} from "@/validations/project.validation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";

type ProjectFormProps = {
  project?: Project;
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const [coverImage, setCoverImage] = useState(project?.coverImage || "");

  const [gallery, setGallery] = useState<string[]>(project?.gallery || []);
  const [uploading, setUploading] = useState(false);
  const [techStackInput, setTechStackInput] = useState(
    project?.techStack?.join(", ") || "",
  );
  const router = useRouter();
  const isEdit = !!project;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),

    defaultValues: {
      title: project?.title || "",
      shortDescription: project?.shortDescription || "",

      description: project?.description || "",

      category: project?.category || "Web Development",

      techStack: project?.techStack || [],

      githubUrl: project?.githubUrl || "",

      demoUrl: project?.demoUrl || "",

      docsUrl: project?.docsUrl || "",

      videoUrl: project?.videoUrl || "",

      coverImage: project?.coverImage || "",

      gallery: project?.gallery || [],
    },
  });

  async function onSubmit(data: CreateProjectInput) {
    try {
      const payload = {
        ...data,
        coverImage,
        gallery,
      };

      const endpoint = isEdit
        ? `/api/projects/${project!._id}`
        : "/api/projects";

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(
        isEdit
          ? "Project updated successfully!"
          : "Project created successfully!",
      );

      router.push("/dashboard/my-projects");

      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/cover-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setCoverImage(data.imageUrl);
    setValue("coverImage", data.imageUrl, {
      shouldValidate: true,
    });
    setUploading(false);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files?.length) return;

    setUploading(true);

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch("/api/upload/gallery", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setGallery(data.images.map((img: any) => img.imageUrl));
    setValue(
      "gallery",
      data.images.map((img: any) => img.imageUrl),
    );
    setUploading(false);
  }
  useEffect(() => {
    setValue("techStack", project?.techStack || []);
  }, [project, setValue]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl border p-6"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">Project Title</label>

        <input
          {...register("title")}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="Revora"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Short Description
        </label>

        <textarea
          {...register("shortDescription")}
          rows={3}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="Short summary of your project..."
        />

        {errors.shortDescription && (
          <p className="mt-1 text-sm text-red-500">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">Description</label>

        <textarea
          {...register("description")}
          rows={8}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="Detailed description..."
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">Category</label>

        <input
          {...register("category")}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="Web Development"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Tech Stack</label>

        <input
          value={techStackInput}
          onChange={(e) => {
            const value = e.target.value;

            setTechStackInput(value);

            setValue(
              "techStack",
              value
                .split(",")
                .map((tech) => tech.trim())
                .filter(Boolean),
              {
                shouldValidate: true,
              },
            );
          }}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="Next.js, TypeScript, MongoDB, TailwindCSS"
        />

        <p className="mt-2 text-xs text-muted-foreground">
          Separate technologies using commas.
        </p>

        {errors.techStack && (
          <p className="mt-1 text-sm text-red-500">
            {errors.techStack.message}
          </p>
        )}
      </div>

      {/* GitHub */}
      <div>
        <label className="mb-2 block text-sm font-medium">GitHub URL</label>

        <input
          {...register("githubUrl")}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="https://github.com/..."
        />

        {errors.githubUrl && (
          <p className="mt-1 text-sm text-red-500">
            {errors.githubUrl.message}
          </p>
        )}
      </div>

      {/* Demo URL */}
      <div>
        <label className="mb-2 block text-sm font-medium">Demo URL</label>

        <input
          {...register("demoUrl")}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="https://..."
        />
      </div>

      {/* Docs URL */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Documentation URL
        </label>

        <input
          {...register("docsUrl")}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="https://..."
        />
      </div>

      {/* Video URL */}
      <div>
        <label className="mb-2 block text-sm font-medium">Video URL</label>

        <input
          {...register("videoUrl")}
          className="w-full rounded-xl border bg-background px-4 py-3"
          placeholder="https://youtube.com/..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Cover Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleCoverUpload}
          className="w-full rounded-xl border bg-background px-4 py-3"
        />

        {coverImage && (
          <div className="relative mt-4 aspect-video overflow-hidden rounded-xl border">
            <Image
              src={coverImage}
              alt="Cover Preview"
              fill
              className="object-cover"
            />
          </div>
        )}

        {errors.coverImage && (
          <p className="mt-1 text-sm text-red-500">
            {errors.coverImage.message}
          </p>
        )}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Gallery Images</label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleGalleryUpload}
          className="w-full rounded-xl border bg-background px-4 py-3"
        />

        {gallery.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-xl border"
              >
                <Image
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="rounded-xl bg-cyan-500 px-5 py-3 font-medium text-black transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {uploading
          ? "Uploading Images..."
          : isSubmitting
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
              ? "Update Project"
              : "Create Project"}
      </button>
    </form>
  );
}

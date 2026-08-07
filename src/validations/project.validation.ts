import { z } from "zod";
import { PROJECT_CATEGORIES } from "../constants/project";

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(80, "Title cannot exceed 80 characters."),

  shortDescription: z
    .string()
    .trim()
    .min(20, "Short description must be at least 20 characters.")
    .max(180, "Short description cannot exceed 180 characters."),

  description: z
    .string()
    .trim()
    .min(50, "Description must be at least 50 characters.")
    .max(5000, "Description cannot exceed 5000 characters."),

  category: z.enum(PROJECT_CATEGORIES),

  techStack: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one technology.")
    .max(20),

  githubUrl: z.string().url("Invalid GitHub URL."),

  demoUrl: z.string().url("Invalid Demo URL.").optional().or(z.literal("")),

  docsUrl: z
    .string()
    .url("Invalid Documentation URL.")
    .optional()
    .or(z.literal("")),

  videoUrl: z.string().url("Invalid Video URL.").optional().or(z.literal("")),

  coverImage: z.string().min(1, "Cover image is required."),

  gallery: z
    .array(z.string())
    .max(6, "Maximum 6 screenshots allowed.")
    .default([]),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name cannot exceed 50 characters."),

  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters.")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores."
    ),

  bio: z
    .string()
    .max(200, "Bio cannot exceed 200 characters.")
    .optional(),

  avatar: z
    .string()
    .url("Invalid avatar URL.")
    .or(z.literal(""))
    .optional(),

  githubUrl: z
    .string()
    .url("Invalid GitHub URL.")
    .or(z.literal(""))
    .optional(),

  portfolioUrl: z
    .string()
    .url("Invalid portfolio URL.")
    .or(z.literal(""))
    .optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
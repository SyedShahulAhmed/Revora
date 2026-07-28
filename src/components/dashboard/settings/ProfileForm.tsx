"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  profileSchema,
  type ProfileInput,
} from "@/validations/profile.validation";
import AvatarUploader from "./AvatarUploader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const { user, refreshUser } = useCurrentUser();

  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      avatar: "",
      githubUrl: "",
      portfolioUrl: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name,
      username: user.username,
      bio: user.bio || "",
      avatar: user.avatar || "",
      githubUrl: user.githubUrl || "",
      portfolioUrl: user.portfolioUrl || "",
    });
  }, [user, reset]);

  async function onSubmit(data: ProfileInput) {
    try {
      setSaving(true);

      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      reset(result.user);

      await refreshUser();

      toast.success("Profile updated successfully.");
      router.push(`/dashboard/profile`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <AvatarUploader
        value={watch("avatar") || ""}
        onChange={(url) =>
          setValue("avatar", url, {
            shouldDirty: true,
          })
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-neutral-300">Name</label>

          <input
            {...register("name")}
            className="w-full rounded-xl border border-white/10  px-4 py-3 outline-none transition focus:border-cyan-500"
          />

          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Username
          </label>

          <input
            {...register("username")}
            className="w-full rounded-xl border border-white/10  px-4 py-3 outline-none transition focus:border-cyan-500"
          />

          {errors.username && (
            <p className="mt-2 text-sm text-red-400">
              {errors.username.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-neutral-300">Bio</label>

        <textarea
          rows={5}
          {...register("bio")}
          className="w-full rounded-xl border border-white/10 px-4 py-3 outline-none transition focus:border-cyan-500"
        />

        <div className="mt-2 flex justify-between">
          {errors.bio ? (
            <p className="text-sm text-red-400">{errors.bio.message}</p>
          ) : (
            <span />
          )}

          <span className="text-sm text-neutral-500">
            {watch("bio")?.length || 0}/200
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            GitHub URL
          </label>

          <input
            {...register("githubUrl")}
            className="w-full rounded-xl border border-white/10  px-4 py-3 outline-none transition focus:border-cyan-500"
          />

          {errors.githubUrl && (
            <p className="mt-2 text-sm text-red-400">
              {errors.githubUrl.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Portfolio URL
          </label>

          <input
            {...register("portfolioUrl")}
            className="w-full rounded-xl border border-white/10 px-4 py-3 outline-none transition focus:border-cyan-500"
          />

          {errors.portfolioUrl && (
            <p className="mt-2 text-sm text-red-400">
              {errors.portfolioUrl.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || saving}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

"use client";

import { Mail, User as UserIcon } from "lucide-react";

import type { User } from "@/types/user";

interface ProfileAboutProps {
  user: User;
}

export default function ProfileAbout({
  user,
}: ProfileAboutProps) {
  return (
    <section className="rounded-3xl border border-white/10  p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          About
        </h2>

        <p className="mt-1 text-sm text-neutral-400">
          Basic information about your account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 p-5">
          <div className="mb-2 flex items-center gap-2 text-neutral-400">
            <UserIcon size={18} />
            <span className="text-sm">Name</span>
          </div>

          <p className="text-lg font-medium text-white">
            {user.name}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="mb-2 flex items-center gap-2 text-neutral-400">
            <UserIcon size={18} />
            <span className="text-sm">Username</span>
          </div>

          <p className="text-lg font-medium text-white">
            @{user.username}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10  p-5 md:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-neutral-400">
            <Mail size={18} />
            <span className="text-sm">Email</span>
          </div>

          <p className="text-lg font-medium break-all text-white">
            {user.email}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10  p-5 md:col-span-2">
          <h3 className="mb-3 text-sm font-medium text-neutral-400">
            Bio
          </h3>

          <p className="leading-7 text-neutral-300">
            {user.bio || "No bio added yet."}
          </p>
        </div>
      </div>
    </section>
  );
}
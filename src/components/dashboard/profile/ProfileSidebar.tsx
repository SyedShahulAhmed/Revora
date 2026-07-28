"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings, Star } from "lucide-react";

import type { User } from "@/types/user";

interface ProfileSidebarProps {
  user: User;
}

export default function ProfileSidebar({
  user,
}: ProfileSidebarProps) {
  return (
    <aside className="rounded-3xl border border-white/10 p-8 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-cyan-500/20">
          <Image
            src={user.avatar || "/images/avatar-placeholder.png"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-white">
          {user.name}
        </h1>

        <p className="mt-1 text-neutral-400">
          @{user.username}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-medium text-yellow-300">
            {user.reputation} Reputation
          </span>
        </div>

        <div className="my-8 h-px w-full bg-white/10" />

        <Link
          href="/dashboard/settings"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-cyan-400 transition hover:bg-cyan-500/20"
        >
          <Settings size={18} />
          Edit Profile
        </Link>
      </div>
    </aside>
  );
}
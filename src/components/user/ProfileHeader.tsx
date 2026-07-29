import Image from "next/image";
import Link from "next/link";
import { Globe, Star } from "lucide-react";

import { User } from "@/types/user";
import { SiGithub } from "react-icons/si";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-cyan-500/20">
          <Image
            src={user.avatar || "/images/avatar-placeholder.png"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-white">{user.name}</h1>

          <p className="mt-2 text-lg text-neutral-400">@{user.username}</p>

          {user.bio && (
            <p className="mt-6 max-w-2xl text-neutral-300">{user.bio}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />

              <span className="font-medium text-yellow-300">
                {user.reputation} Reputation
              </span>
            </div>

            {user.githubUrl && (
              <Link
                href={user.githubUrl}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-cyan-500/30 hover:text-cyan-400"
              >
                <SiGithub size={18} />
                GitHub
              </Link>
            )}

            {user.portfolioUrl && (
              <Link
                href={user.portfolioUrl}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-cyan-500/30 hover:text-cyan-400"
              >
                <Globe size={18} />
                Portfolio
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

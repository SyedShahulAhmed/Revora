"use client";

import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";

import type { User } from "@/types/user";
import { SiGithub } from "react-icons/si";

interface ProfileLinksProps {
  user: User;
}

export default function ProfileLinks({
  user,
}: ProfileLinksProps) {
  return (
    <section className="rounded-3xl border border-white/10 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Developer Links
        </h2>

        <p className="mt-1 text-sm text-neutral-400">
          Connect with me through these platforms.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10  p-5">
          <div className="mb-4 flex items-center gap-3">
            <SiGithub size={22} className="text-white" />

            <h3 className="font-medium text-white">
              GitHub
            </h3>
          </div>

          {user.githubUrl ? (
            <Link
              href={user.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
            >
              Visit GitHub
              <ExternalLink size={16} />
            </Link>
          ) : (
            <p className="text-neutral-500">
              GitHub profile not added.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10  p-5">
          <div className="mb-4 flex items-center gap-3">
            <Globe size={22} className="text-cyan-400" />

            <h3 className="font-medium text-white">
              Portfolio
            </h3>
          </div>

          {user.portfolioUrl ? (
            <Link
              href={user.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
            >
              Visit Website
              <ExternalLink size={16} />
            </Link>
          ) : (
            <p className="text-neutral-500">
              Portfolio not added.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
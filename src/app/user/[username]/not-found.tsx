"use client";

import { useRouter } from "next/navigation";
import { UserX, ArrowLeft } from "lucide-react";
import { GridBackground } from "@/components/shared/GridBackground";

export default function NotFound() {
  const router = useRouter();

  return (
    <GridBackground className="bg-black">
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-3xl border border-cyan-500/10 bg-black/40 p-10 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
            <UserX className="h-10 w-10 text-cyan-400" />
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">
            User Not Found
          </h1>

          <p className="mt-3 text-neutral-400">
            The profile you're looking for doesn't exist or may have been
            removed.
          </p>

          <button
            onClick={() => router.back()}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 font-medium text-cyan-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/20 hover:text-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </GridBackground>
  );
}

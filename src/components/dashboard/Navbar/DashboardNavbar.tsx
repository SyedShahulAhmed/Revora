"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import DashboardSearch from "./DashboardSearch";
import DashboardProfile from "./DashboardProfile";
import { Meteors } from "@/components/landing/Meteors";
import { HudCorners } from "@/components/landing/HudCorners";

export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-50 px-4 py-4">
      <nav className="relative isolate mx-auto flex h-16 w-full max-w-7xl items-center justify-between border border-white/20 bg-black/35 p-10 backdrop-blur-3xl ">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5" />

        <HudCorners />

        {/* Content */}
        <div className="relative z-20 flex w-full items-center justify-between gap-6">
          {/* ================= Logo ================= */}
          <Link
            href="/dashboard"
            className="group flex shrink-0 items-center gap-3"
          >
            <div>
              <h1 className="text-xl font-bold tracking-[0.35em] text-white transition-colors duration-300 group-hover:text-cyan-400">
                REVORA
              </h1>
            </div>
          </Link>

          {/* ================= Search ================= */}
          <DashboardSearch />

          {/* ================= Right ================= */}
          <div className="flex items-center gap-3">


            <DashboardProfile />
          </div>
        </div>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import DashboardProfile from "./DashboardProfile";
import { Meteors } from "@/components/landing/Meteors";
import { HudCorners } from "@/components/landing/HudCorners";

const navItems = [
  {
    label: "Projects",
    href: "/dashboard/projects",
  },
  {
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
  },
  {
    label: "My Projects",
    href: "/dashboard/my-projects",
  },
  {
    label: "Reviews",
    href: "/dashboard/reviews",
  },
];

export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="relative max-w-7xl mt-5 mx-auto border-b border-cyan-500/10 bg-black/70 backdrop-blur-xl">
        <HudCorners />

        <nav className="mx-auto h-20 max-w-7xl px-6 lg:px-8">
          {/* Content */}
          <div className="relative z-20 flex h-full w-full items-center justify-between gap-6">
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

            {/* ================= Navigation ================= */}
            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-sm font-medium tracking-[0.2em] text-zinc-400 transition-all duration-300 hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* ================= Right ================= */}
            <div className="flex items-center gap-3">
              <DashboardProfile />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
"use client";

import { Search } from "lucide-react";

export default function DashboardSearch() {
  return (
    <div className="hidden flex-1 justify-center px-8 lg:flex">
      <div className="group relative w-full max-w-2xl">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors duration-300 group-focus-within:text-cyan-400"
        />

        <input
          type="text"
          placeholder="Search projects, users, reviews..."
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            pl-11
            pr-4
            text-sm
            text-white
            placeholder:text-zinc-500
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400
            focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]
          "
        />
      </div>
    </div>
  );
}
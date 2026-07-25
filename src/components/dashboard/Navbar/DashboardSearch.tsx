"use client";

import { Search } from "lucide-react";

export default function DashboardSearch() {
  return (
    <div className="hidden flex-1 justify-center px-8 lg:flex">
      <div className="group relative w-full max-w-2xl">
        <Search
          size={18}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500 transition-colors duration-300 group-focus-within:text-cyan-400"
        />
        <input
          type="text"
          placeholder="Search projects, users, reviews..."
          className="
            h-11
            w-full
            rounded-lg
            border
            border-white/15
            bg-white/5
            pl-11
            pr-20
            text-sm
            text-white
            placeholder:text-zinc-500
            backdrop-blur-xl
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400/70
            focus:bg-cyan-400/5
          "
        />

        <kbd
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-md
            border
            border-white/10
            bg-white/5
            px-2
            py-1
            text-[10px]
            font-medium
            uppercase
            tracking-wider
            text-zinc-400
          "
        >
          Ctrl K
        </kbd>
      </div>
    </div>
  );
}

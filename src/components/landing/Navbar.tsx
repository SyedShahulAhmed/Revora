"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HudCorners } from "./HudCorners";
import { Meteors } from "./Meteors";
;

const navItems = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      {/* ================= NAVBAR ================= */}
      <nav className="relative isolate mx-auto flex h-16 w-full max-w-7xl items-center justify-between overflow-hidden border border-white/20 bg-black/35 px-5 backdrop-blur-3xl">
        <Meteors  />
        {/* Decorative Layers */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5" />

        <HudCorners />

        {/* Content */}
        <div className="relative z-20 flex w-full items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.35em] text-white transition-colors duration-300 hover:text-cyan-400 md:text-2xl"
          >
            REVORA
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-sm uppercase tracking-[0.18em] text-zinc-300 transition-colors duration-300 hover:text-cyan-400"
              >
                {item.name}

                <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/auth/signin"
              className="group hidden h-11 items-center gap-2 rounded-lg border border-white/25  px-6 text-xs font-medium uppercase tracking-[0.28em] text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/80 hover:bg-cyan-400/5 hover:text-cyan-300 lg:flex"
            >
              <span>Get Started</span>

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
            {/* Burger */}
            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400 lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "mt-3 max-h-125" : "max-h-0"
        }`}
      >
        <div className="relative isolate overflow-hidden border border-white/20 bg-black/70 p-6 backdrop-blur-3xl">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />
          <HudCorners />

          <div className="relative z-20 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 pb-3 text-sm uppercase tracking-[0.18em] text-zinc-300 transition-colors duration-300 hover:text-cyan-400"
              >
                {item.name}

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
            <Link
              href="/auth/signin"
              onClick={() => setOpen(false)}
              className="group mt-4 flex h-12 w-full items-center justify-center border border-white/25 text-xs font-medium uppercase tracking-[0.28em] text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/80 hover:bg-cyan-400/5 hover:text-cyan-300"
            >
              <span>Get Started</span>

              <ArrowUpRight
                size={15}
                className="ml-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

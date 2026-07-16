import { ArrowRight } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex h-[calc(100vh-80px)] max-w-7xl flex-col justify-between px-6 py-12 text-white">
        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Build{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]">
              Better
            </span>
            <br />
            Projects Through
            <br />
            <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]">
              Community Reviews
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            Submit your{" "}
            <span className="font-medium text-cyan-300">projects</span>, receive{" "}
            <span className="font-medium text-cyan-300">
              structured feedback
            </span>{" "}
            from experienced developers and designers, and{" "}
            <span className="font-medium text-cyan-300">improve faster</span>{" "}
            with actionable insights.
          </p>
        </div>
        {/* Buttons */}
        <div className="flex justify-end">
          <div className="flex gap-4">
            <button className="group relative overflow-hidden rounded-lg border border-cyan-400/60 bg-cyan-400 px-8 py-3 font-semibold text-black  transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-cyan-300  active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>

              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <button className="group relative overflow-hidden rounded-lg border border-white/20 bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:text-cyan-400 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Explore
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-cyan-300/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

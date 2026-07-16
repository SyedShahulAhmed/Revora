import { Check, X } from "lucide-react";

const oldWay = [
  "Project showcase only",
  "No detailed feedback",
  "Hard to improve",
  "No reviewer credibility",
];

const revoraWay = [
  "Structured reviews",
  "Category ratings",
  "Actionable suggestions",
  "Project growth tracking",
];

const AboutSection = () => {
  return (
    <section id="about" className="relative  overflow-hidden py-28 text-white">
      <div className="absolute bottom-0 left-1/2 h-72 w-175 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Why Revora */}
        <div className="mb-6 flex justify-center">
          <span className="flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium backdrop-blur">
            <span className="mr-2 h-2.5 w-2.5 animate-blink-glow rounded-full bg-cyan-400" />

            <span className="text-gray-300">
              Why <span className="font-semibold text-cyan-400">Revora</span>
            </span>
          </span>
        </div>
        {/* Header */}
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Every <span className="text-cyan-400">Review</span> Helps You
            <br />
            Build a Better <span className="text-cyan-400">Project</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-400">
            Unlike traditional showcase platforms, Revora provides structured
            feedback, trusted reviewers, and clear improvement paths. so every
            submission becomes an opportunity to learn, refine, and grow.
          </p>
        </div>
        {/* Cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* OLD */}
          <div className="group rounded-3xl border border-white/10 bg-white/2 p-10 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/4">
            <div className="border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                  <X className="h-6 w-6 text-red-500" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">The Old Way</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Traditional project showcase platforms
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-5">
              {oldWay.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-transparent px-2 py-2 transition-all duration-300"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <X className="h-4 w-4 text-red-500" />
                  </div>

                  <span className="text-lg font-medium text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* REVORA */}
          <div className="group relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-cyan-500/3 p-10 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/5 backdrop-blur-lg">
            {/* Glow */}
            <div className="absolute inset-x-16 bottom-0 h-40 rounded-full bg-cyan-500/20 blur-[100px]" />

            <div className="relative">
              {/* Header */}
              <div className="border-b border-cyan-400/30 pb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                    <Check className="h-6 w-6 text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">
                      The Revora Way
                    </h3>

                    <p className="mt-1 text-sm text-cyan-100/60">
                      Built for developers who want to improve
                    </p>
                  </div>
                </div>
              </div>

              {/* Points */}
              <div className="mt-8 space-y-5">
                {revoraWay.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-transparent px-2 py-2 transition-all duration-300"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                      <Check className="h-4 w-4 text-cyan-400" />
                    </div>

                    <span className="text-lg font-medium text-gray-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

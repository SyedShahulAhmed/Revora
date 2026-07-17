"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";

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
const section = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const leftCard = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const rightCard = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const list = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const listItem = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
    },
  },
};

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={section}
      className="relative overflow-hidden py-28 text-white"
    >
      <div className="absolute bottom-0 left-1/2 h-72 w-175 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-6 flex justify-center">
          <span className="flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium backdrop-blur">
            <span className="mr-2 h-2.5 w-2.5 animate-blink-glow rounded-full bg-cyan-400" />
            <span className="text-gray-300">
              Why <span className="font-semibold text-cyan-400">Revora</span>
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={fadeUp} className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Every <span className="text-cyan-400">Review</span> Helps You
            <br />
            Build a Better <span className="text-cyan-400">Project</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-400">
            Unlike traditional showcase platforms, Revora provides structured
            feedback, trusted reviewers, and clear improvement paths—so every
            submission becomes an opportunity to learn, refine, and grow.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* OLD */}
          <motion.div
            variants={leftCard}
            whileHover={{
              y: -8,
              transition: { duration: 0.25 },
            }}
            className="group rounded-3xl border border-white/10 bg-white/2 p-10 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/4"
          >
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

            <motion.div variants={list} className="mt-8 space-y-5">
              {oldWay.map((item) => (
                <motion.div
                  key={item}
                  variants={listItem}
                  className="flex items-center gap-4 rounded-xl px-2 py-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <X className="h-4 w-4 text-red-500" />
                  </div>

                  <span className="text-lg font-medium text-gray-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* REVORA */}
          <motion.div
            variants={rightCard}
            whileHover={{
              y: -8,
              scale: 1.01,
              transition: { duration: 0.25 },
            }}
            className="group relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-cyan-500/3 p-10 backdrop-blur-lg transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/5"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-x-16 bottom-0 h-40 rounded-full bg-cyan-500/20 blur-[100px]"
            />

            <div className="relative">
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

              <motion.div variants={list} className="mt-8 space-y-5">
                {revoraWay.map((item) => (
                  <motion.div
                    key={item}
                    variants={listItem}
                    className="flex items-center gap-4 rounded-xl px-2 py-2"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                      <Check className="h-4 w-4 text-cyan-400" />
                    </div>

                    <span className="text-lg font-medium text-gray-200">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;

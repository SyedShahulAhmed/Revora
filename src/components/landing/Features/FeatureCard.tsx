"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  eyebrow: string;
  title: string;
  description: string;
  image: ReactNode;
  reverse?: boolean;
}

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 24,
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

export function FeatureCard({
  eyebrow,
  title,
  description,
  image,
  reverse = false,
}: FeatureCardProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative py-20"
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row lg:gap-24",
          reverse && "lg:flex-row-reverse"
        )}
      >
        {/* Image */}
        <motion.div
          variants={reverse ? fadeRight : fadeLeft}
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: {
              duration: 0.3,
            },
          }}
          className="w-full lg:w-1/2"
        >
          <motion.div
            initial={{
              boxShadow: "0 0 0 rgba(34,211,238,0)",
            }}
            whileInView={{
              boxShadow: "0 0 90px rgba(34,211,238,.12)",
            }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-3xl border border-cyan-500/10 bg-zinc-950"
          >
            {image}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <motion.span
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-400"
          >
            {eyebrow}
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-8 text-zinc-400"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
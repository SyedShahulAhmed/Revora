"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const transition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 18,
};

export default function CTAButtons() {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={transition}
      className="mt-8"
    >
      <Link
        href="/signup"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-cyan-400/40 bg-cyan-400 px-8 py-3.5 font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.45)]"
      >
        {/* Shine Effect */}
        <span className="absolute -left-24 top-0 h-full w-20 -skew-x-12 bg-white/40 transition-all duration-700 group-hover:left-[120%]" />

        <span className="relative z-10">Get Started</span>

        <motion.span
          className="relative z-10"
          whileHover={{ x: 4, y: -4, rotate: 10 }}
          transition={transition}
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.span>
      </Link>
    </motion.div>
  );
}
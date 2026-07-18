"use client";

import { motion } from "framer-motion";
import GalaxyBackground from "./GalaxyBackground";
import CTAButtons from "./CTAButtons";

export default function CTASection() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
        >
          {/* Background Animation */}
          <GalaxyBackground />

          {/* Border Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-8 py-15 text-center md:px-14">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Ready to{" "}
              <span className="bg-linear-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                Build Better?
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-2"
            >
              <CTAButtons />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
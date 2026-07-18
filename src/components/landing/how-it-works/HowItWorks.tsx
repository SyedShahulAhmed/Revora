"use client";

import { motion } from "framer-motion";
import WorkflowCarousel from "./WorkflowCarousel";
import {
  ownerWorkflow,
  reviewerWorkflow,
} from "./workflowData";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-10 text-white"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-40 h-96 w-xl -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-6 flex justify-center"
        >
          <span className="flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium backdrop-blur">
            <span className="mr-2 h-2.5 w-2.5 animate-blink-glow rounded-full bg-cyan-400" />

            <span className="text-gray-300">
              How <span className="font-semibold text-cyan-400">Revora</span>{" "}
              Works
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Built for{" "}
            <span className="text-cyan-400">Developers</span> &
            <span className="text-cyan-400"> Reviewers</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Revora connects project owners and reviewers through a structured
            feedback workflow, making every review more meaningful and every
            project better than before.
          </p>
        </motion.div>

       {/* Workflow Cards */}
<div className="mt-20 space-y-14">

  {/* Project Owner */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl"
  >
    <WorkflowCarousel
      role="Project Owner"
      slides={ownerWorkflow}
    />
  </motion.div>

  {/* Reviewer */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      duration: 0.7,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl"
  >
    <WorkflowCarousel
      role="Reviewer"
      slides={reviewerWorkflow}
    />
  </motion.div>

</div>
      </div>
    </section>
  );
}
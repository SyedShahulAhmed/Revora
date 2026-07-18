"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "./Faq";


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

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-28 text-white"
    >
      <div className="relative mx-auto max-w-5xl px-6">
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
              Frequently Asked{" "}
              <span className="font-semibold text-cyan-400">
                Questions
              </span>
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Everything You Need
            <br />
            To Know About{" "}
            <span className="text-cyan-400">Revora</span>
          </h2>
        </motion.div>

        {/* FAQ */}
        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                }}
                className="overflow-hidden rounded-2xl border border-white/10   transition-all duration-300 hover:border-cyan-400/30"
              >
                <button
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 45 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="rounded-full border border-cyan-400/20 bg-cyan-500/10 p-2"
                  >
                    <Plus className="h-4 w-4 text-cyan-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <div className="border-t border-white/10 px-6 py-5">
                        <p className="leading-7 text-zinc-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { WorkflowSlide } from "./workflowData";

interface WorkflowCarouselProps {
  role: string;
  slides: WorkflowSlide[];
  delay?: number;
}

export default function WorkflowCarousel({
  role,
  slides,
  delay = 5000,
}: WorkflowCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, delay);

    return () => clearInterval(interval);
  }, [delay, slides.length]);

  const slide = slides[current];

  return (
    <div className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:gap-10">
      {/* IMAGE */}
      <div className="lg:w-3/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.02,
            }}
            transition={{
              duration: 0.45,
            }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              width={1600}
              height={900}
              priority
              className="h-62.5 w-full object-cover lg:h-90"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="flex lg:w-2/5 flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {role}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <h3 className="mt-4 text-3xl font-bold text-white">
              {slide.title}
            </h3>

            <p className="mt-5 text-base leading-7 text-zinc-400">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === index
                  ? "w-10 bg-cyan-400"
                  : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
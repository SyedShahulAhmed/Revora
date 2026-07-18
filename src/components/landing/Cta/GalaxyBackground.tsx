"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function GalaxyBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 220 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 6,
      })),
    []
  );


  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl bg-black">

      {/* Stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Floating Dust */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />
    </div>
  );
}
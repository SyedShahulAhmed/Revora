"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Platform: [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
  Developer: [
    { name: "GitHub", href: "https://github.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cyan-500/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-col gap-20 lg:flex-row lg:justify-between">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <Link
              href="/"
              className="inline-block text-4xl font-bold tracking-tight text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Revora
            </Link>

            <p className="mt-8 text-sm leading-7 text-zinc-400">
              Helping developers improve projects through structured
              community reviews, actionable feedback, and collaborative
              learning.
            </p>

            <p className="mt-8 text-sm text-zinc-500">
              © {new Date().getFullYear()} Revora. All rights reserved.
            </p>
          </motion.div>

          {/* Links */}
          <div className="grid flex-1 grid-cols-2 gap-12 md:grid-cols-4">
            {Object.entries(footerLinks).map(([title, links], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                viewport={{ once: true }}
              >
                <h3 className="mb-7 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
                  {title}
                </h3>

                <ul className="space-y-5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-[15px] text-zinc-400 transition-all duration-300 hover:text-white"
                      >
                        {link.name}

                        <span className="ml-0 w-0 overflow-hidden text-cyan-400 transition-all duration-300 group-hover:ml-2 group-hover:w-3">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Big Watermark */}
      <motion.h1
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute -bottom-28 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-tight text-white/3"
      >
        REVORA
      </motion.h1>
    </footer>
  );
}
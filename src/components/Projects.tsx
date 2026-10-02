"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-violet-400 font-medium">Projects</p>
        <h2 className="text-4xl sm:text-5xl font-bold mt-2">
          Featured <span className="gradient-text">work</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-7 mt-14">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 2) * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group relative glass rounded-3xl p-7 overflow-hidden flex flex-col"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition duration-500`}
            />
            <div className="relative flex flex-col h-full">
              <span className="text-xs text-[var(--muted)] font-mono">
                0{i + 1}
              </span>
              <h3 className="text-2xl font-semibold mt-2">{p.title}</h3>
              <p className="text-[var(--muted)] mt-3 text-sm leading-relaxed flex-1">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-full glass hover:bg-white/10 transition"
                >
                  <Code2 size={16} /> Code
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 transition"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

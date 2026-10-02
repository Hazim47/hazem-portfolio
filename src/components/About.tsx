"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Languages } from "lucide-react";

const stats = [
  { n: "20+", l: "Full-stack projects" },
  { n: "5", l: "Months internship" },
  { n: "10+", l: "Technologies" },
];

const fade = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="py-28 px-6 max-w-5xl mx-auto">
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-violet-400 font-medium">About me</p>
        <h2 className="text-4xl sm:text-5xl font-bold mt-2">
          Turning ideas into{" "}
          <span className="gradient-text">real products</span>
        </h2>
        <p className="mt-6 text-[var(--muted)] text-lg leading-relaxed max-w-3xl">
          I&apos;m a Full-Stack Developer from Amman, Jordan with hands-on
          experience building web applications using React.js, Node.js,
          Express.js and PostgreSQL. I enjoy developing responsive interfaces,
          RESTful APIs and database-driven applications that solve real
          problems.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mt-12">
        {stats.map((s, idx) => (
          <motion.div
            key={s.l}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold gradient-text">
              {s.n}
            </div>
            <div className="text-xs sm:text-sm text-[var(--muted)] mt-1">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {[
          {
            icon: <Briefcase />,
            t: "Full Stack Intern — Offerat",
            d: "Jan 2026 – May 2026 · Built features with React, Node.js, Express and PostgreSQL; integrated REST APIs; collaborated via Git & GitHub.",
          },
          {
            icon: <GraduationCap />,
            t: "Tafila Technical University",
            d: "Bachelor's Degree in Smart Devices Computing.",
          },
          {
            icon: <Languages />,
            t: "Languages",
            d: "Arabic (Native) · English (Intermediate)",
          },
        ].map((c, idx) => (
          <motion.div
            key={c.t}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6"
          >
            <div className="text-violet-400 mb-3">{c.icon}</div>
            <h3 className="font-semibold">{c.t}</h3>
            <p className="text-sm text-[var(--muted)] mt-2">{c.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Database, Wrench } from "lucide-react";

const groups = [
  {
    title: "Frontend",
    icon: <Monitor />,
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Material UI",
      "Vite",
      "Zustand",
    ],
  },
  {
    title: "Backend",
    icon: <Server />,
    items: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "JWT", "RBAC"],
  },
  {
    title: "Databases",
    icon: <Database />,
    items: ["PostgreSQL", "MongoDB", "Sequelize ORM", "Prisma", "SQL"],
  },
  {
    title: "Tools & Deployment",
    icon: <Wrench />,
    items: ["Docker", "Git", "GitHub", "Postman", "Render", "Vercel"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-violet-400 font-medium">Skills</p>
        <h2 className="text-4xl sm:text-5xl font-bold mt-2">
          My <span className="gradient-text">tech stack</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mt-14">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1, duration: 0.6 }}
            className="glass rounded-3xl p-7 hover:border-violet-500/40 transition"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-violet-500/15 text-violet-400">
                {g.icon}
              </div>
              <h3 className="text-xl font-semibold">{g.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {g.items.map((s, si) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 + si * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3.5 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-[var(--fg)] cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail, Briefcase, Layers } from "lucide-react";

const roles = [
  "Full-Stack Developer",
  "React & Next.js Engineer",
  "Node.js API Builder",
];

const tech = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Docker",
  "FastAPI",
  "Tailwind",
  "Prisma",
];

export default function Hero() {
  /* typing effect */
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = roles[i];

    const t = setTimeout(
      () => {
        if (!del) {
          setText(full.slice(0, text.length + 1));

          if (text.length + 1 === full.length) {
            setTimeout(() => setDel(true), 1400);
          }
        } else {
          setText(full.slice(0, text.length - 1));

          if (text.length - 1 === 0) {
            setDel(false);
            setI((i + 1) % roles.length);
          }
        }
      },
      del ? 40 : 80,
    );

    return () => clearTimeout(t);
  }, [text, del, i]);

  /* 3D tilt on photo */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 15,
  });

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 15,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();

    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-28 pb-20">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/30 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/25 blur-[120px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
        {/* TEXT */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-[var(--muted)]"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.8,
            }}
            className="mt-6 text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05]"
          >
            Hi, I&apos;m <br />
            <span className="gradient-text">Hazem Alqralh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 text-xl sm:text-2xl text-[var(--muted)] h-9"
          >
            {text}

            <span className="animate-pulse text-violet-400">|</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-[var(--muted)] max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            I build responsive, database-driven web applications with React,
            Node.js and PostgreSQL, from polished interfaces to secure, scalable
            RESTful APIs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 font-medium hover:scale-105 transition shadow-lg shadow-violet-500/30"
            >
              View my work
            </a>

            <a
              href="/Hazem_Alqralh_CV.pdf"
              download
              className="px-7 py-3 rounded-full glass font-medium hover:bg-white/10 transition flex items-center gap-2"
            >
              <Download size={18} />
              Download CV
            </a>

            <a
              href="#contact"
              className="px-7 py-3 rounded-full glass font-medium hover:bg-white/10 transition flex items-center gap-2"
            >
              <Mail size={18} />
              Contact
            </a>
          </motion.div>
        </div>

        {/* PHOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.9,
            ease: "easeOut",
          }}
          className="order-1 lg:order-2 flex justify-center"
          style={{ perspective: 1000 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="
              relative
              w-64 h-64
              sm:w-80 sm:h-80
              xl:w-[420px] xl:h-[420px]
            "
          >
            {/* Rotating gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                -inset-[3px]
                rounded-[2.5rem]
                bg-[conic-gradient(from_0deg,#8b5cf6,#22d3ee,#ec4899,#8b5cf6)]
                blur-[2px]
              "
            />

            {/* Glow */}
            <div
              className="
                absolute
                -inset-6
                rounded-[3rem]
                bg-gradient-to-br
                from-violet-500/30
                to-cyan-500/30
                blur-3xl
              "
            />

            {/* Image */}
            <div
              className="
                relative
                w-full
                h-full
                rounded-[2.4rem]
                overflow-hidden
                bg-[#0c0c16]
                border
                border-white/10
              "
            >
              <Image
                src="/me.jpg"
                alt="Hazem Alqralh"
                fill
                priority
                sizes="(max-width: 640px) 256px, (max-width: 1280px) 320px, 420px"
                className="object-cover"
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#07070d]/50
                  via-transparent
                  to-transparent
                "
              />
            </div>

            {/* ============================= */}
            {/* EXPERIENCE BADGE */}
            {/* Desktop / Tablet only */}
            {/* ============================= */}

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: "translateZ(60px)",
              }}
              className="
                hidden
                sm:flex

                absolute
                -left-10
                top-10

                glass
                rounded-2xl
                px-4
                py-3

                items-center
                gap-3

                z-20
              "
            >
              <div className="p-2 rounded-lg bg-violet-500/20 text-violet-300">
                <Briefcase size={18} />
              </div>

              <div>
                <div className="text-xs text-[var(--muted)]">Experience</div>

                <div className="text-sm font-semibold text-black">
                  Full-Stack Intern
                </div>
              </div>
            </motion.div>

            {/* ============================= */}
            {/* PROJECTS BADGE */}
            {/* Desktop / Tablet only */}
            {/* ============================= */}

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: "translateZ(80px)",
              }}
              className="
                hidden
                sm:flex

                absolute
                -right-10
                bottom-12

                glass
                rounded-2xl
                px-4
                py-3

                items-center
                gap-3

                z-20
              "
            >
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                <Layers size={18} />
              </div>

              <div>
                <div className="text-xs text-[var(--muted)]">Projects</div>

                <div className="text-sm font-semibold text-black">
                  20+ Full-Stack Apps
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* TECH MARQUEE */}
      <div
        className="
          relative
          z-10
          mt-20
          overflow-hidden
          [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]
        "
      >
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 w-max"
        >
          {[...tech, ...tech].map((t, idx) => (
            <span
              key={idx}
              className="
                px-5
                py-2
                rounded-full
                glass
                text-sm
                text-[var(--muted)]
                whitespace-nowrap
              "
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* SCROLL DOWN */}
      <motion.a
        href="#about"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          text-[var(--muted)]
          hidden
          md:block
        "
      >
        <ArrowDown />
      </motion.a>
    </section>
  );
}

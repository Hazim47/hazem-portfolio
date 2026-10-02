"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const info = [
  {
    icon: <Mail />,
    label: "Email",
    value: "alqralh2003@gmail.com",
    href: "mailto:alqralh2003@gmail.com",
  },
  {
    icon: <Phone />,
    label: "Phone",
    value: "+962 78 233 3118",
    href: "tel:+962782333118",
  },
  { icon: <MapPin />, label: "Location", value: "Amman, Jordan" },
];

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:bg-white/[0.07] transition placeholder:text-white/30";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-28 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-violet-400 font-medium">Contact</p>
        <h2 className="text-4xl sm:text-5xl font-bold mt-2">
          Let&apos;s build something{" "}
          <span className="gradient-text">together</span>
        </h2>
        <p className="text-[var(--muted)] mt-4">
          Open to internships, junior roles and freelance projects.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mt-14">
        <div className="space-y-4">
          {info.map((c, i) => {
            const Wrapper = c.href ? "a" : "div";
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Wrapper
                  {...(c.href ? { href: c.href } : {})}
                  className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-violet-500/40 transition"
                >
                  <div className="p-3 rounded-xl bg-violet-500/15 text-violet-400">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted)]">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}

          <div className="flex gap-3 pt-2">
            <a
              href="https://github.com/Hazim47"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-full px-5 py-2 text-sm hover:bg-white/10 transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/hazem-alqralh-0541ab2a6"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-full px-5 py-2 text-sm hover:bg-white/10 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-7 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-16 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="text-emerald-400"
                >
                  <CheckCircle2 size={64} />
                </motion.div>
                <h3 className="text-2xl font-semibold">Message sent!</h3>
                <p className="text-[var(--muted)] text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm px-5 py-2 rounded-full glass hover:bg-white/10 transition"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* honeypot - مخفي عن المستخدمين */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={set("company")}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <input
                  required
                  minLength={2}
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your name"
                  className={field}
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="Your email"
                  className={field}
                />
                <textarea
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Your message"
                  className={`${field} resize-none`}
                />

                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-rose-400">
                    <AlertCircle size={16} /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 font-medium hover:opacity-90 hover:scale-[1.02] transition disabled:opacity-60 disabled:hover:scale-100"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

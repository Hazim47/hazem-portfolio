export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-[var(--muted)]">
      <p>
        © {new Date().getFullYear()} Hazem Alqralh. Built with{" "}
        <span className="gradient-text font-medium">Next.js</span>,{" "}
        <span className="gradient-text font-medium">Tailwind</span> &{" "}
        <span className="gradient-text font-medium">Framer Motion</span>.
      </p>
    </footer>
  );
}

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    title: "Delivery Accounting System",
    description:
      "Full-stack accounting platform for a delivery company: orders, restaurants, drivers, expenses and settlements, with JWT auth, RBAC, Excel import for thousands of orders, and dashboards.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "Material UI",
      "JWT",
    ],
    github: "https://github.com/Hazim47/delivery-accounting",
    live: "https://delivery-accounting-alpha.vercel.app/",
    gradient: "from-violet-500/30 to-cyan-500/20",
  },
  {
    title: "ZYA — E-Commerce",
    description:
      "Complete e-commerce platform with customer and admin sides: search, filtering, cart, favorites, coupons, checkout and secure authentication.",
    tech: ["React", "Zustand", "Express", "PostgreSQL", "Sequelize", "Docker"],
    github: "https://github.com/Hazim47/stylehub",
    live: "https://stylehub-seven-eta.vercel.app/",
    gradient: "from-pink-500/30 to-violet-500/20",
  },
  {
    title: "Distributed Monitoring Platform",
    description:
      "Real-time system monitoring CPU and RAM across distributed services, with authenticated REST APIs, a live dashboard, and Docker containerization.",
    tech: ["FastAPI", "Python", "Flutter", "Docker", "JWT"],
    github: "https://github.com/Hazim47/distributed-monitoring-platform",
    gradient: "from-emerald-500/30 to-cyan-500/20",
  },
  {
    title: "Smart Inventory Management",
    description:
      "Inventory system to track products and stock levels with search, filtering, low-stock alerts, and analytics dashboards with data visualizations.",
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Prisma"],
    github: "https://github.com/Hazim47/inventory-management",
    gradient: "from-amber-500/30 to-rose-500/20",
  },
];

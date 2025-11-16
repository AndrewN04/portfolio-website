import { type IconType } from "react-icons";
import {
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiOpencv,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

const LangChainIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9.5 7.5a3 3 0 0 1 4.243 0l2.757 2.757a3 3 0 0 1 0 4.243l-1.061 1.061"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <path
      d="M14.5 16.5a3 3 0 0 1-4.243 0L7.5 13.743a3 3 0 0 1 0-4.243L8.56 8.44"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </svg>
);

export type TechKey =
  | "nextjs"
  | "postgres"
  | "prisma"
  | "python"
  | "opencv"
  | "langchain"
  | "mongodb"
  | "tailwind";

export const techRegistry: Record<
  TechKey,
  { label: string; icon: IconType; color: string; background: string }
> = {
  nextjs: {
    label: "Next.js",
    icon: SiNextdotjs,
    color: "#F1F5F9",
    background: "rgba(248,250,252,0.08)",
  },
  postgres: {
    label: "PostgreSQL",
    icon: SiPostgresql,
    color: "#48A9DC",
    background: "rgba(14,165,233,0.12)",
  },
  prisma: {
    label: "Prisma",
    icon: SiPrisma,
    color: "#0C344B",
    background: "rgba(148,163,184,0.12)",
  },
  python: {
    label: "Python",
    icon: SiPython,
    color: "#FACC15",
    background: "rgba(250,204,21,0.1)",
  },
  opencv: {
    label: "OpenCV",
    icon: SiOpencv,
    color: "#4ADE80",
    background: "rgba(74,222,128,0.12)",
  },
  langchain: {
    label: "LangChain",
    icon: LangChainIcon,
    color: "#22D3EE",
    background: "rgba(45,212,191,0.12)",
  },
  mongodb: {
    label: "MongoDB",
    icon: SiMongodb,
    color: "#34D399",
    background: "rgba(52,211,153,0.12)",
  },
  tailwind: {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#38BDF8",
    background: "rgba(56,189,248,0.12)",
  },
};

export type Project = {
  title: string;
  description: string;
  link: string;
  tech: TechKey[];
};

export const projects: Project[] = [
  {
    title: "TMDB Explorer",
    description:
      "Movie discovery experience with curated collections, smart search, and personalized watchlists powered by TMDB.",
    link: "https://github.com/AndrewN04/tmdb-app",
    tech: ["nextjs", "postgres", "prisma"],
  },
  {
    title: "Service AI Agent",
    description:
      "Multi-agent research assistant built for CS4485 that evaluates prompts, plans tasks, and orchestrates LLM responses.",
    link: "https://github.com/AndrewN04/CS4485-AI-Agent",
    tech: ["python", "langchain", "mongodb"],
  },
  {
    title: "Weather Dashboard",
    description:
      "Weather intelligence dashboard with live radar, geolocation alerts, and responsive offline-ready UI.",
    link: "https://github.com/AndrewN04/weather-app",
    tech: ["nextjs", "tailwind"],
  },
  {
    title: "Human Pose Detection",
    description:
      "Real-time skeletal tracking prototype combining WebGL overlays with TensorFlow pose estimation.",
    link: "https://github.com/AndrewN04/human-pos-detection",
    tech: ["python", "opencv"],
  },
];

export const toolbelt = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "HTML, CSS, JS",
  "PostgreSQL",
  "React",
  "Tailwind CSS",
  "Python",
  "C++",
  "Docker",
];

export const focusAreas = [
  {
    title: "Product-minded engineering",
    copy:
      "Pairing strong UX instincts with platform knowledge to ship experiences that feel fast, polished, and purposeful.",
  },
  {
    title: "Performance-first web",
    copy:
      "Designing resilient architectures that lean on streaming, caching, and edge compute when scale matters.",
  },
];

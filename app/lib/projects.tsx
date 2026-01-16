import { type IconType } from "react-icons";
import {
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiOpencv,
  SiMongodb,
  SiTailwindcss,
  SiTensorflow,
  SiFastapi,
  SiSqlite,
  SiCplusplus,
  SiTypescript,
  SiSupabase,
} from "react-icons/si";

const LangChainIcon: IconType = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
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

const NeonIcon: IconType = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.18l5.45 2.73L12 9.64 6.55 6.91 12 4.18zM6 8.27l5 2.5v7.96l-5-2.5V8.27zm12 7.96l-5 2.5V10.77l5-2.5v7.96z" />
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
  | "tailwind"
  | "tensorflow"
  | "fastapi"
  | "sqlite"
  | "cplusplus"
  | "typescript"
  | "supabase"
  | "neon";

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
    color: "#FFFFFF",
    background: "rgba(255,255,255,0.08)",
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
  tensorflow: {
    label: "TensorFlow",
    icon: SiTensorflow,
    color: "#F97316",
    background: "rgba(249,115,22,0.12)",
  },
  fastapi: {
    label: "FastAPI",
    icon: SiFastapi,
    color: "#10B981",
    background: "rgba(16,185,129,0.12)",
  },
  sqlite: {
    label: "SQLite",
    icon: SiSqlite,
    color: "#38AADD",
    background: "rgba(56,170,221,0.12)",
  },
  cplusplus: {
    label: "C++",
    icon: SiCplusplus,
    color: "#2563EB",
    background: "rgba(37,99,235,0.12)",
  },
  typescript: {
    label: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    background: "rgba(49,120,198,0.12)",
  },
  supabase: {
    label: "Supabase",
    icon: SiSupabase,
    color: "#3FCF8E",
    background: "rgba(63,207,142,0.12)",
  },
  neon: {
    label: "Neon",
    icon: NeonIcon,
    color: "#00E599",
    background: "rgba(0,229,153,0.12)",
  },
};

// Skills registry for skills section
export type SkillKey =
  | "html"
  | "css"
  | "react"
  | "nextjs"
  | "tailwind"
  | "nodejs"
  | "python"
  | "cplusplus"
  | "javascript"
  | "typescript"
  | "postgres"
  | "mongodb"
  | "supabase"
  | "convex"
  | "firebase"
  | "docker"
  | "linux"
  | "git"
  | "github"
  | "prisma"
  | "figma"
  | "postman"
  | "langchain"
  | "aws";

export const skillsRegistry: Record<SkillKey, { label: string; svg: string }> =
  {
    html: {
      label: "HTML",
      svg: "/html5.svg",
    },
    css: {
      label: "CSS",
      svg: "/css3.svg",
    },
    react: {
      label: "React",
      svg: "/react.svg",
    },
    nextjs: {
      label: "Next.js",
      svg: "/nextjs.svg",
    },
    tailwind: {
      label: "Tailwind CSS",
      svg: "/tailwind.svg",
    },
    nodejs: {
      label: "Node.js",
      svg: "/nodejs.svg",
    },
    python: {
      label: "Python",
      svg: "/python.svg",
    },
    cplusplus: {
      label: "C++",
      svg: "/cplusplus.svg",
    },
    javascript: {
      label: "JavaScript",
      svg: "/javascript.svg",
    },
    typescript: {
      label: "TypeScript",
      svg: "/typescript.svg",
    },
    postgres: {
      label: "PostgreSQL",
      svg: "/postgresql.svg",
    },
    mongodb: {
      label: "MongoDB",
      svg: "/mongodb.svg",
    },
    supabase: {
      label: "Supabase",
      svg: "/supabase.svg",
    },
    convex: {
      label: "Convex",
      svg: "/convex.svg",
    },
    firebase: {
      label: "Firebase",
      svg: "/firebase.svg",
    },
    docker: {
      label: "Docker",
      svg: "/docker.svg",
    },
    linux: {
      label: "Linux",
      svg: "/linux.svg",
    },
    git: {
      label: "Git",
      svg: "/git.svg",
    },
    github: {
      label: "GitHub",
      svg: "/github.svg",
    },
    prisma: {
      label: "Prisma",
      svg: "/prisma.svg",
    },
    figma: {
      label: "Figma",
      svg: "/figma.svg",
    },
    postman: {
      label: "Postman",
      svg: "/postman.svg",
    },
    langchain: {
      label: "LangChain",
      svg: "/langchain.svg",
    },
    aws: {
      label: "AWS",
      svg: "/aws.svg",
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
    title: "TMDB Chart",
    description:
      "Movie discovery app with smart search and personalized watchlists.",
    link: "https://github.com/AndrewN04/tmdb-app",
    tech: ["nextjs", "typescript", "supabase", "prisma"],
  },
  {
    title: "go.a04.dev",
    description:
      "Security-first URL shortener with expiring links and cross-browser extension.",
    link: "https://github.com/AndrewN04/url-shortner",
    tech: ["nextjs", "typescript", "neon"],
  },
  {
    title: "Service AI Agent",
    description:
      "Multi-agent assistant that plans tasks and orchestrates LLM responses.",
    link: "https://github.com/AndrewN04/CS4485-AI-Agent",
    tech: ["python", "langchain", "mongodb"],
  },
  {
    title: "Weather Dashboard",
    description: "Weather dashboard with live radar and geolocation alerts.",
    link: "https://github.com/AndrewN04/weather-app",
    tech: ["nextjs", "typescript", "tailwind"],
  },
  {
    title: "Human Pose Detection",
    description: "Real-time skeletal tracking with TensorFlow pose estimation.",
    link: "https://github.com/AndrewN04/human-pos-detection",
    tech: ["python", "opencv", "tensorflow"],
  },
  {
    title: "Task Management Web App (Planned)",
    description:
      "Productivity suite for task prioritization with real-time collaboration.",
    link: "",
    tech: ["nextjs", "typescript", "postgres", "prisma"],
  },
  {
    title: "Data Visualization Tool (Planned)",
    description:
      "Analytics playground with custom dashboards and FastAPI pipelines.",
    link: "",
    tech: ["nextjs", "python", "fastapi"],
  },
  {
    title: "Personal Finance Tracker (Planned)",
    description: "Privacy-first budgeting app with lightweight native modules.",
    link: "",
    tech: ["sqlite", "cplusplus"],
  },
];

// Tech key type for project tech stacks (currently unused in UI but kept for data structure)
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
    | "neon"
    | "docker"
    | "linux";

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
            "Movie discovery app with smart search and personalized watchlists. Built with Next.js and Supabase for real-time data synchronization.",
        link: "https://github.com/AndrewN04/tmdb-app",
        tech: ["nextjs", "typescript", "supabase", "prisma"],
    },
    {
        title: "go.a04.dev",
        description:
            "Security-first URL shortener with expiring links and cross-browser extension. Features secure link generation with customizable expiration times and browser extension integration.",
        link: "https://github.com/AndrewN04/url-shortner",
        tech: ["nextjs", "typescript", "neon"],
    },
    {
        title: "Service AI Agent",
        description:
            "Multi-agent assistant that plans tasks and orchestrates LLM responses. Uses LangChain for agent coordination and MongoDB for persistent state management.",
        link: "https://github.com/AndrewN04/CS4485-AI-Agent",
        tech: ["python", "langchain", "mongodb"],
    },
    {
        title: "Weather Dashboard",
        description:
            "Weather dashboard with live radar and geolocation alerts. Provides real-time weather data visualization with interactive maps and location-based notifications.",
        link: "https://github.com/AndrewN04/weather-app",
        tech: ["nextjs", "typescript", "tailwind"],
    },
    {
        title: "Human Pose Detection",
        description:
            "Real-time skeletal tracking with TensorFlow pose estimation. Uses OpenCV for video processing and TensorFlow for accurate pose keypoint detection.",
        link: "https://github.com/AndrewN04/human-pos-detection",
        tech: ["python", "opencv", "tensorflow"],
    },
    {
        title: "Proxmox Homelab: Media Automation + Game Server",
        description:
            "Homelab on Proxmox with isolated VMs for NAS/media, infrastructure, and gaming. Services include Jellyfin, the *arr stack, RomM, and Crafty/Minecraft, with WireGuard remote access and VPN-isolated torrenting via Gluetun + qSticky.",
        link: "https://github.com/AndrewN04/proxmox-homelab",
        tech: ["docker", "linux"],
    },
    {
        title: "Task Management Web App (Planned)",
        description:
            "Productivity suite for task prioritization with real-time collaboration. Will feature intelligent task scheduling and team coordination with live updates.",
        link: "",
        tech: ["nextjs", "typescript", "postgres", "prisma"],
    },
    {
        title: "Data Visualization Tool (Planned)",
        description:
            "Analytics playground with custom dashboards and FastAPI pipelines. Will enable interactive data exploration with real-time processing and visualization capabilities.",
        link: "",
        tech: ["nextjs", "python", "fastapi"],
    },
    {
        title: "Personal Finance Tracker (Planned)",
        description:
            "Privacy-first budgeting app with lightweight native modules. Will provide local-first data storage with high-performance calculations using C++ modules.",
        link: "",
        tech: ["sqlite", "cplusplus"],
    },
];

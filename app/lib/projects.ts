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
    | "neon";

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

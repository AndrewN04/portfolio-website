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
    | "aws"
    | "vite"
    | "playwright";

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
    vite: {
        label: "Vite",
        svg: "/vite.svg",
    },
    playwright: {
        label: "Playwright",
        svg: "/playwright.svg",
    },
};

import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Andrew Nguyen | Software Engineer",
  description:
    "Portfolio website for Andrew Nguyen, a software engineer and web developer crafting thoughtful, modern web experiences.",
  metadataBase: new URL("https://andrew-nguyen.dev"),
  openGraph: {
    title: "Andrew Nguyen | Software Engineer",
    description:
      "Modern portfolio showcasing full-stack and front-end projects by Andrew Nguyen.",
    url: "https://andrew-nguyen.dev",
    siteName: "Andrew Nguyen Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Nguyen | Software Engineer",
    description:
      "Modern portfolio showcasing full-stack and front-end projects by Andrew Nguyen.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} antialiased`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {children}
      </body>
    </html>
  );
}

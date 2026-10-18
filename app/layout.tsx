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
  title: "a04.dev",
  description:
    "Portfolio website for Andrew Nguyen, a software engineer and web developer crafting thoughtful, modern web experiences.",
  metadataBase: new URL("https://a04.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "a04.dev",
    description:
      "Modern portfolio showcasing full-stack and front-end projects by Andrew Nguyen.",
    url: "https://a04.dev",
    siteName: "Andrew Nguyen Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "a04.dev",
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
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

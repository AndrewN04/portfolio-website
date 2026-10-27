import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const martianMono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrew Nguyen · a04.dev",
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
        className={`${archivo.variable} ${martianMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/landing/Navbar";
import { cn } from "@/lib/utils";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Revora",
  description:
    "A community-driven platform for showcasing projects, receiving structured peer reviews, and improving through actionable feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", oxanium.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

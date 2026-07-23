import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

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
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "bg-black border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10",

              success:
                "bg-cyan-500 text-black border border-cyan-400 shadow-lg shadow-cyan-500/20",

              error:
                "bg-black text-white border border-red-500/50 shadow-lg shadow-red-500/10",

              warning:
                "bg-black text-yellow-400 border border-yellow-500/40 shadow-lg shadow-yellow-500/10",

              info: "bg-black text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10",
            },
          }}
        />
        <body className="min-h-screen flex flex-col">{children}</body>
      </AuthProvider>
    </html>
  );
}

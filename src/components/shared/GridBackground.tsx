"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

interface GridBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-white dark:bg-black",
        className,
      )}
    >
      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[40px_40px]",
          "bg-[linear-gradient(to_right,rgb(0_229_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_229_255/0.06)_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,rgb(0_229_255/0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_229_255/0.10)_1px,transparent_1px)]",
        )}
      />

      {/* Mouse Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-150"
        style={{
          background: `radial-gradient(
  420px circle at ${position.x}px ${position.y}px,
  rgba(0,229,255,0.16),
  transparent 75%
)`,
        }}
      />

      {/* Fade */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const Meteors = ({
  number = 10,
  minDelay = 0.2,
  maxDelay = 1.5,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );

  useEffect(() => {
    // measure container width instead of window, so it works inside any wrapper
    const width =
      typeof document !== "undefined"
        ? document.documentElement.clientWidth
        : 1920;

    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * width)}px)`,
      animationDelay:
        (Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2) + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    })) as React.CSSProperties[];

    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full bg-cyan-500 shadow-[0_0_0_1px_#ffffff10]",
            className,
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-transparent" />
        </span>
      ))}
    </>
  );
};

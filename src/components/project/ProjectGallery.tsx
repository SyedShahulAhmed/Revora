"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Props = {
  images: string[];
};

export default function ProjectGallery({
  images,
}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => {
    setActive((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setActive((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (paused || images.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [paused, images.length]);

  if (!images?.length) return null;

  return (
    <div className="space-y-6">
      {/* Featured Image */}
      <div
        className="
          group
          relative
          aspect-video
          overflow-hidden
          rounded-3xl
          border
          border-cyan-500/10
          bg-black
        "
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Image
          key={images[active]}
          src={images[active]}
          alt={`Screenshot ${active + 1}`}
          fill
          priority
          className="
            object-cover
            transition-all
            duration-700
            group-hover:scale-[1.02]
          "
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* Previous */}
        {images.length > 1 && (
          <button
            onClick={prev}
            className="
              absolute
              left-4
              top-1/2
              z-10
              -translate-y-1/2
              rounded-full
              border
              border-white/10
              bg-black/50
              p-3
              backdrop-blur
              transition
              hover:border-cyan-500/40
              hover:bg-black/70
            "
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={next}
            className="
              absolute
              right-4
              top-1/2
              z-10
              -translate-y-1/2
              rounded-full
              border
              border-white/10
              bg-black/50
              p-3
              backdrop-blur
              transition
              hover:border-cyan-500/40
              hover:bg-black/70
            "
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Counter */}
        <div
          className="
            absolute
            bottom-4
            right-4
            rounded-full
            border
            border-white/10
            bg-black/50
            px-4
            py-2
            text-sm
            backdrop-blur
          "
        >
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => setActive(index)}
              className={`
                relative
                aspect-video
                overflow-hidden
                rounded-2xl
                border
                transition-all
                duration-300
                ${
                  active === index
                    ? "border-cyan-500 ring-2 ring-cyan-500/20"
                    : "border-white/10 hover:border-cyan-500/30"
                }
              `}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />

              {active === index && (
                <div className="absolute inset-0 bg-cyan-500/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
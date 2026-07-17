import Image from "next/image";

interface FeatureImageProps {
  src: string;
  alt: string;
}

export function FeatureImage({ src, alt }: FeatureImageProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={900}
        className="h-auto w-full object-cover"
        priority
      />
    </div>
  );
}

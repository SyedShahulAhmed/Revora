import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070A]">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full border border-cyan-500/20 animate-ping" />

        <LoaderCircle
          className="h-12 w-12 animate-spin text-cyan-400"
          strokeWidth={1.5}
        />

        <div className="absolute h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
      </div>
    </div>
  );
}
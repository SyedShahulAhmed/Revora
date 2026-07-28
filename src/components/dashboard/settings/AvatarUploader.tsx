"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

type AvatarUploaderProps = {
  value: string;
  onChange: (url: string) => void;
};

export default function AvatarUploader({
  value,
  onChange,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("avatar", file);

      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      onChange(data.data.url);
    } catch (error) {
      console.error(error);

      // TODO:
      // toast.error(...)
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 border-b border-white/10 pb-10 md:flex-row">
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-cyan-500/20">
        <Image
          src={
            value || "/images/avatar-placeholder.png"
          }
          alt="Avatar"
          fill
          className="object-cover"
        />

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">
          Profile Picture
        </h3>

        <p className="max-w-sm text-sm text-neutral-400">
          Upload a JPG, PNG, or WEBP image.
          Maximum file size is 5 MB.
        </p>

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-cyan-400 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="h-4 w-4" />
              Change Avatar
            </>
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
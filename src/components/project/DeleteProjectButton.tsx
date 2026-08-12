"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteProjectButton({
  projectId,
}: {
  projectId: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this project?"
    );

    if (!confirmed) return;

    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete project");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-500/30 px-3 py-2 text-red-400"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
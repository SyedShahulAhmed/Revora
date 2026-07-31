import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white">
        User Not Found
      </h1>

      <p className="mt-3 text-neutral-400">
        The profile you're looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black"
      >
        Go Home
      </Link>
    </div>
  );
}
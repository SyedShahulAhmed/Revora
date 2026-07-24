"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { GridBackground } from "@/components/shared/GridBackground";

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    loading,
    logout,
  } = useAuth();

  async function handleLogout() {
    await logout();

    router.push("/auth/sign-in");
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
  <GridBackground>
      <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p>Name: {user?.name}</p>

      <p>Email: {user?.email}</p>

      <p>Username: {user?.username}</p>

      <button
        onClick={handleLogout}
        className="mt-5 rounded bg-red-600 px-5 py-2 text-white"
      >
        Logout
      </button>
    </div>
  </GridBackground>
  );
}
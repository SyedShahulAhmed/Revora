"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { getCurrentUser, logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type UserType = {
  name: string;
  avatar?: string | null;
};

export default function DashboardProfile() {
  const [loggingOut, setLoggingOut] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        setUser(data.user ?? data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      router.replace("/auth/sign-in");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoggingOut(false);
    }
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-cyan-300">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-14 z-999 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#09090B]/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-3xl transition-all duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b  border-white/10 px-5 py-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-15 w-15 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-15 w-15 items-center bg-cyan-400/10 justify-center rounded-full  text-sm font-bold text-cyan-300">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-white">
              {user?.name ?? "Guest"}
            </p>

            <p className="text-xs text-zinc-500">Manage your account</p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-2">
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-300 transition-all duration-200 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <User size={18} />
            Profile
          </Link>

          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-300 transition-all duration-200 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <Settings size={18} />
            Settings
          </Link>

          <div className="my-2 border-t border-white/10" />

          <button
            disabled={loggingOut}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-400 transition-all duration-200 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

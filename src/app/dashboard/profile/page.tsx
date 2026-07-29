"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/shared/Loader";
import { getCurrentUser } from "@/services/auth.service";
import type { User } from "@/types/user";
import ProfileLinks from "@/components/dashboard/profile/ProfileLinks";
import ProfileAbout from "@/components/dashboard/profile/ProfileAbout";
import ProfileSidebar from "@/components/dashboard/profile/ProfileSidebar";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-neutral-400">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <ProfileSidebar user={user} />

      <div className="space-y-6">
        <ProfileAbout user={user} />
        <ProfileLinks user={user} />
      </div>
    </div>
  );
}

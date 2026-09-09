"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/shared/Loader";

import { getCurrentUser } from "@/services/auth.service";
import { getMyProjects } from "@/services/project-client.service";

import type { User } from "@/types/user";
import type { Project } from "@/types/project";

import ProfileAbout from "@/components/dashboard/profile/ProfileAbout";
import ProfileLinks from "@/components/dashboard/profile/ProfileLinks";
import ProfileSidebar from "@/components/dashboard/profile/ProfileSidebar";
import ProfileProjects from "@/components/dashboard/profile/ProfileProjects";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, projectsData] = await Promise.all([
          getCurrentUser(),
          getMyProjects(),
        ]);

        setUser(userData.user);
        setProjects(projectsData?.projects || []);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
        <ProfileProjects projects={projects} />
        <ProfileLinks user={user} />
      </div>
    </div>
  );
}
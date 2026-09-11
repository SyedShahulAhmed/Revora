import { notFound } from "next/navigation";

import { GridBackground } from "@/components/shared/GridBackground";
import ProfileHeader from "@/components/user/ProfileHeader";
import PublicProfileProjects from "@/components/user/PublicProfileProjects";

import { connectDB } from "@/lib/db";

import User from "@/models/user.model";
import Project from "@/models/project.model";

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;

  await connectDB();

  const user = await User.findOne({
    username: username.toLowerCase(),
  })
    .select("-password -email -createdAt -updatedAt -__v")
    .lean();

  if (!user) {
    notFound();
  }

  const projects = await Project.find({
    ownerId: user._id,
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <GridBackground>
      <div className="mx-auto max-w-7xl text-white space-y-6 px-4 py-8">
        <ProfileHeader user={user} />

        <PublicProfileProjects projects={projects} />
      </div>
    </GridBackground>
  );
}

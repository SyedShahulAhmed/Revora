import { GridBackground } from "@/components/shared/GridBackground";
import ProfileHeader from "@/components/user/ProfileHeader";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { notFound } from "next/navigation";




type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage({
  params,
}: PageProps) {
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

  return (
    <GridBackground>
      <ProfileHeader user={user} />

      {/* Projects Section */}

      {/* <ProjectGrid projects={projects} /> */}
    </GridBackground>
  );
}
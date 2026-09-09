import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import Project from "@/models/project.model";

export async function GET() {
  try {
    await connectDB();

    const { userId } = await getAuthUser();

    const projects = await Project.find({
      ownerId: userId,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}
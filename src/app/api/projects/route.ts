import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { createProject, getProjects } from "@/services/project.service";
import { createProjectSchema } from "@/validations/project.validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const projects = await getProjects();

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects.",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId } = await getAuthUser();

    const body = await req.json();

    const validated = createProjectSchema.parse(body);

    const project = await createProject(userId, validated);

    return NextResponse.json(
      {
        success: true,
        project,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 },
    );
  }
}

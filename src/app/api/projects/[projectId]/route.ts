import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/services/project.service";
import { updateProjectSchema } from "@/validations/project.validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    await connectDB();

    const { projectId } = await params;

    const project = await getProjectById(projectId);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { projectId } = await params;

    const project = await getProjectById(projectId);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 },
      );
    }

    // Only the project owner can update it
    if (project.ownerId._id.toString() !== authUser.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 },
      );
    }

    const body = await req.json();

    const validatedData = updateProjectSchema.parse(body);

    const updatedProject = await updateProject(projectId, validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Project updated successfully.",
        project: updatedProject,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { projectId } = await params;

    const project = await getProjectById(projectId);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 },
      );
    }

    // Only the project owner can delete it
    if (project.ownerId.toString() !== authUser.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 },
      );
    }

    await deleteProject(projectId);

    return NextResponse.json(
      {
        success: true,
        message: "Project deleted successfully.",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong.",
      },
      { status: 500 },
    );
  }
}

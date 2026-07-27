import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth";
import { profileSchema } from "@/validations/profile.validation";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { userId } = verifyToken(token);

    const body = await req.json();

    const validatedData = profileSchema.parse(body);

    const existingUser = await User.findOne({
      username: validatedData.username,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken.",
        },
        { status: 409 },
      );
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: validatedData,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully.",
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Profile Update Error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0].message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{
  username: string;
}>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();

    const { username } = await params;

    const user = await User.findOne({
      username: username.toLowerCase(),
    }).select("-password -email -createdAt -updatedAt -__v");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Get User Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

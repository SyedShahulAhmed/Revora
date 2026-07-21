import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/lib/bcrypt";
import { loginSchema } from "@/validations/auth.validation";
import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, password } = validation.data;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const token = generateToken(user._id.toString());

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully.",
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

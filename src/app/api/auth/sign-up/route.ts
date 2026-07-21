import { NextRequest, NextResponse } from "next/server";

import { signupSchema } from "@/validations/auth.validation";
import { hashPassword } from "@/lib/bcrypt";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { name, username, email, password } = validation.data;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            existingUser.email === email
              ? "Email already exists."
              : "Username already exists.",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
      },
      { status: 201 },
    );
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

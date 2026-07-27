import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/file";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
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
    verifyToken(token);

    const formData = await req.formData();

    const avatar = formData.get("avatar");
    if (!(avatar instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Avatar image is required.",
        },
        { status: 400 },
      );
    }

    const uploadedImage = await uploadImage(avatar, "revora/avatars");

    return NextResponse.json(
      {
        success: true,
        message: "Avatar uploaded successfully.",
        data: {
          url: uploadedImage.secure_url,
          publicId: uploadedImage.public_id,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Avatar Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

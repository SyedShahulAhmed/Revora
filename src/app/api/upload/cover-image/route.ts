import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "revora/covers",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 },
    );
  }
}

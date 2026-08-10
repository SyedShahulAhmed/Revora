import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No files uploaded",
        },
        { status: 400 },
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "revora/gallery",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      uploadedImages.push({
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 },
    );
  }
}

import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImage(file: File) {
  if (!file) {
    throw new Error("Image is required.");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Only JPG, JPEG, PNG, and WEBP images are allowed.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image size cannot exceed 5MB.");
  }
}

export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function uploadImage(
  file: File,
  folder: string,
): Promise<UploadApiResponse> {
  validateImage(file);

  const buffer = await fileToBuffer(file);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Image upload failed."));
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });
}

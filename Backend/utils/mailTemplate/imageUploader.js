//import cloudinary from "../../config/cloudinary.js";
import { cloudinary } from "../../config/cloudinary.js";
import fs from "fs";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const uploadImageToCloudinary = async (file, folder, height, quality) => {
  // 1. Make sure a file exists
  if (!file) {
    throw new Error("Image file is required");
  }

  // 2. Only images
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new Error("Only JPG, PNG, WEBP or GIF images are allowed");
  }

  // 3. Max 5 MB
  if (file.size > MAX_SIZE) {
    throw new Error("Image size must not be more than 5 MB");
  }

  // 4. Build Cloudinary options
  const options = { folder, resource_type: "image" }; // "image", not "auto", so videos/PDFs are rejected

  if (height) {
    options.height = height;
    options.crop = "limit"; // without crop, height is ignored; "limit" never upscales
  }
  if (quality) {
    options.quality = quality; // a number (1-100) or "auto"
  }

  try {
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } finally {
    // 5. Remove the temp file whether the upload worked or not
    fs.unlink(file.tempFilePath, () => {});
  }
};
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";

// TEMP STORAGE (storage on server, not Cloudinary)
const storage = multer.diskStorage({});
export const upload = multer({ storage });

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// UPLOAD AVATAR (FULL QUALITY)
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload full-quality, no compression, lossless
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      quality: "100",
      fetch_format: "auto",
      flags: "lossless",
      dpr: "2.0", // High pixel density
      transformation: [], // NO RESIZING ✔
    });

    return res.json({
      success: true,
      avatar: result.secure_url,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ message: "Avatar upload failed" });
  }
};

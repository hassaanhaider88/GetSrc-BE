import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import HandleUserAndVideo from "../upload.js";
import userAuth from "../middleware/userAuth.js";


dotenv.config();
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/", userAuth, upload.single("Uploader"), async (req, res) => {
  const { UserCreated, File_Name, IsPrivate = false } = req.body;
  try {
    const fileBuffer = req.file?.buffer;
    const originalName = req.file?.originalname;
    const ext = originalName.split(".").pop();
    const sanitize = (str) => str.replace(/[^a-zA-Z0-9-_]/g, "_");

    const publicId = sanitize(`video_${Date.now()}_${File_Name || "video"}`);

    // ProPlan: {
    if (req.user.uploadedMedia.length >= 15 && req.user.ProPlan == false) {
      return res.status(403).json({ error: "Upload limit reached. You can only upload up to 15 media items." });
    }

    // Cloudinary Upload using stream
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "user_videos",
            public_id: publicId,
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer);
      });

    const result = await streamUpload();
    var Res = await HandleUserAndVideo(
      File_Name,
      result.secure_url,
      UserCreated,
      IsPrivate
    );
    res.status(201).json({
      message: "Video uploaded and saved",
      previewUrl: result.secure_url,
      Res,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;



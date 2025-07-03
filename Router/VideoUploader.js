import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import HandleUserAndVideo from "../upload.js";


dotenv.config();
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/", upload.single("Uploader"), async (req, res) => {
  const { UserCreated, File_Name } = req.body;
  try {
    const fileBuffer = req.file?.buffer;
    const originalName = req.file?.originalname;
    const ext = originalName.split(".").pop();
    const sanitize = (str) => str.replace(/[^a-zA-Z0-9-_]/g, "_");

    const publicId = sanitize(`video_${Date.now()}_${File_Name || "video"}`);

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
      UserCreated
    );
    console.log(Res);
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

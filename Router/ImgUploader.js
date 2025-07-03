import { ImgUpload, UploadByUrl } from "../Controllers/ImagesController.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import express from "express";

const router = express.Router();

router.post("/", upload.single("Uploader"), ImgUpload);
router.post("/url", UploadByUrl);
export default router;

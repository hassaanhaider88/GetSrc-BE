import { ImgUpload, UploadByUrl } from "../Controllers/ImagesController.js";
import multer from "multer";
import userAuth from "../middleware/userAuth.js";
const upload = multer({ dest: "uploads/" });
import express from "express";

const router = express.Router();

router.post("/", userAuth, upload.single("Uploader"), ImgUpload);
router.post("/url", userAuth, UploadByUrl);
export default router;

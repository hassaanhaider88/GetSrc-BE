import express from "express";
import Media from "../Models/MediaMode.js";
import { DeleteUserMedia } from "../Controllers/UserController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/:id", userAuth,DeleteUserMedia);

export default router;

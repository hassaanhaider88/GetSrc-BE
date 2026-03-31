import express from "express"
import { HandleUserSearchForImages, HandleUserSearchForVideos } from "../Controllers/UserSearchController.js";

const router = express.Router()

router.get('/imgs', HandleUserSearchForImages);
router.get('/videos', HandleUserSearchForVideos);

export default router;
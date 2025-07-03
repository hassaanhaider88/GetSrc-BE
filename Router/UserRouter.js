import {
  GetUserPost,
  SignIn,
  SignUp,
  UserUpdate,
} from "../Controllers/UserData.js";
import express from "express";

const router = express.Router();

router.post("/sign-in", SignIn); //login Existing User
router.post("/sign-up", SignUp); // Create New User
router.get("/update/:id", UserUpdate);
router.get("/:id", GetUserPost);

export default router;

import {
  getUser,        
  GetUserPost,
  SignIn,
  SignUp,
  UserUpdate,
} from "../Controllers/UserController.js";
import express from "express";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/sign-in", SignIn); //login Existing User
router.post("/sign-up", SignUp); // Create New User
router.get("/update/:id", userAuth, UserUpdate);
router.get("/me", userAuth, getUser);
router.get("/posts", userAuth, GetUserPost);

export default router;

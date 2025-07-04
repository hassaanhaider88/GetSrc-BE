import express from "express";
import UserEmail from "../Models/UserEmail.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const findEmail = await UserEmail.find({email:email})
    if(findEmail.length  < 0) return res.status(202).json({ message: "Email Exist",success: false });
    const newEmail = new UserEmail({ email });
    await newEmail.save();

    res.status(201).json({ message: "Email saved",success: true });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ error: "Server error",success: false  });
  }
});

export default router;

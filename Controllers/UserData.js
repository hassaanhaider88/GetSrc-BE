import bcrypt from "bcrypt";
import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export async function UserUpdate(req, res) {
  try {
    const { id } = req.params;
    const { full_name, email, profile } = req.body;

    if (!id) return res.status(400).json({ error: "User ID is required" });

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { full_name, email, profile },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
}
// check if user exist and return user data
export async function SignIn(req, res) {
  try {
    const { Email, password } = req.body;
    if (!Email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email: Email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        profile: user.profile,
        full_name: user.full_name,
        email: user.email,
        ProPlan: user.ProPlan,
        uploadedMedia: user.uploadedMedia,
      },
      token,
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

// create new user
export async function SignUp(req, res) {
  try {
    const { FullName, Email, password } = req.body;
    if (!FullName || !Email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email: Email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    // Create and save new user
    const newUser = new User({
      full_name: FullName,
      email: Email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log(token);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

export async function GetUserPost(req, res) {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found.", succuss: true });
    }
    const userPost = req.user.uploadedMedia;
    if (!userPost) {
      return res.status(404).json({ error: "User not found.", succuss: true });
    }
    res.status(200).json({ data: userPost, succuss: true });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

export async function getUser(req, res) {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found.", succuss: false });
    }
    return res.status(200).json({ data: req.user, succuss: true });

  } catch (error) {
    return res.json({
      succuss: false,
      message: "Something went wrong on server",
      error
    })
  }
}

import express from "express";
import Media from "../Models/MediaMode.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    const deletedFile = await Media.findByIdAndDelete(id);

    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(202).json({ data: deletedFile });
  } catch (err) {
    console.error("Deletion error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;

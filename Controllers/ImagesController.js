import Media from "../Models/MediaMode.js";
import User from "../Models/userModel.js";

const ImgUpload = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ msg: "Images will be processed here." });
  } catch (error) {
    console.error("❌ Error in ImgUpload:", error.message);
    res.status(500).json({ error: "Server error while handling image upload." });
  }
};

const UploadByUrl = async (req, res) => {
  try {
    const { ImgUrl, Video, UserCreated, FileType, File_Name } = req.body;


    if (!UserCreated || (!ImgUrl && !Video)) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const mediaDoc = await Media.create({
      video: Video || null,
      img: ImgUrl || null,
      FileName: File_Name || "Untitled",
      FileType: FileType || "unknown",
    });

    await User.findByIdAndUpdate(
      UserCreated,
      { $push: { uploadedMedia: mediaDoc._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json({ msg: "✅ Upload successful", media: mediaDoc });
  } catch (err) {
    console.error("❌ Error uploading via URL:", err.message);
    res.status(500).json({ error: "Failed to upload media." });
  }
};

export { ImgUpload, UploadByUrl };

import Media from "../Models/MediaMode.js";
const cache = new Map();
export async function AllFilesData(req, res) {
  try {
    const cachedData = await cache.get("files");
    if (cachedData) {
      console.log("serving Cached..")
      return res.json(cachedData);
    }

    const data = await Media.find().sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).json({ message: "No files found" });
    }
    cache.set("files", data);

    res.json(data);
  } catch (error) {
    console.log("Error:", error);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
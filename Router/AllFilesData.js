import Media from "../Models/MediaMode.js";

export async function AllFilesData(req, res) {
  try {
    var FilesData = await Media.find();
    return res.json({ Data: FilesData });
  } catch (error) {
    console.log(error);
    res.status(404).json({ Data: "No Data to Show" })
  }
  res.json({ msg: "all Vidoes data" });
}

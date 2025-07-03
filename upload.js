import Media from "./Models/MediaMode.js";
import User from "./Models/userModel.js";
const HandleUserAndVideo = async (File_Name, secure_url, UserCreated) => {
  // Save to MongoDB
  const media = new Media({
    FileName: File_Name,
    FileType: "Videos",
    video: secure_url,
    img: null,
  });

  await media.save();

  var user = await User.findOneAndUpdate(
    { _id: UserCreated },
    { $push: { uploadedMedia: media._id } },
    { new: true }
  );
  return Media.findById(media._id);
};

export default HandleUserAndVideo;

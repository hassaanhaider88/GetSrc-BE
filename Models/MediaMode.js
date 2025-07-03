import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  video: {
    type: String,
    default: null,
  },
  img: {
    type: String,
    default: null,
  },
  FileName: {
    type: String,
    default: "",
  },
  FileType: {
    type: String,
    required: true,
    enum: ["Images", "Videos", "GIFs"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1296000,
  },
});

const Media = mongoose.model("Media", MediaSchema);
export default Media;

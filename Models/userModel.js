import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      type: String,
      default:
        "https://i.pinimg.com/236x/84/ff/48/84ff48281001c29ac37220ccac046fca.jpg",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    ProPlan: {
      type: Boolean,
      default: false,
    },
    uploadedMedia: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

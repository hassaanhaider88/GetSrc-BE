import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("UsersEmail", EmailSchema);

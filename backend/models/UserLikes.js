import mongoose from "mongoose";

const userLikes = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserLikes", userLikes);

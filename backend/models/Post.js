import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      //required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);

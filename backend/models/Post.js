import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    // required: true,
  },
});

export default mongoose.model("Post", postSchema);

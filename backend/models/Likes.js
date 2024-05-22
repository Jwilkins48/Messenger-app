import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Likes", likesSchema);

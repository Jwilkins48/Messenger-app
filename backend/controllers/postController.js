import Post from "../models/Post.js";
import mongoose from "mongoose";

const displayPosts = async (req, res) => {
  // const userId = req.user._id;
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

const newPost = async (req, res) => {
  const { post } = req.body;

  if (!post) {
    new Error("Cannot leave field empty");
  }

  try {
    // const userId = req.user._id;
    const newPost = await Post.create({ post });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePosts = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Post Found" });
  }

  if (!post) {
    return res.status(400).json({ error: "No Post Found" });
  }

  res.status(200).json(post);
};

export { deletePosts, displayPosts, newPost };

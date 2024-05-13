import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

const displayPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

const newPost = async (req, res) => {
  const { post, author } = req.body;

  if (!post) {
    new Error("Cannot leave field empty");
  }

  try {
    const email = req.user.email;
    const newPost = await Post.create({ post, email, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// IF DELETE POST - DELETE COMMENTS !!!
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

// COMMENTS

// SHOW ALL - /api/post/comments
const displayComments = async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.status(200).json(comments);
};

// CREATE NEW - /api/post/comments/new
const newComment = async (req, res) => {
  const { comment, postId, author } = req.body;
  if (!comment) {
    new Error("Cannot leave field empty");
  }
  try {
    await Post.updateOne({ _id: postId }, { $push: { comments: comment } });

    const newPost = await Comment.create({ comment, postId, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Comment Found" });
  }

  if (!comment) {
    return res.status(400).json({ error: "No Comment Found" });
  }

  res.status(200).json(comment);
};

export {
  deletePosts,
  displayPosts,
  newPost,
  displayComments,
  newComment,
  deleteComment,
};

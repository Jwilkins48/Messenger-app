import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

// POSTS

// SHOW ALL
const displayPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// CREATE POST
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

// DELETE POST
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

// CREATE COMMENT - /api/post/comments/new
const newComment = async (req, res) => {
  const { comment, postId, postedBy } = req.body;
  if (!comment) {
    new Error("Cannot leave field empty");
  }

  try {
    await Post.updateOne(
      { _id: postId },
      { $push: { comments: { comment: comment, postedBy: postedBy } } },
      { new: true }
    );

    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE COMMENT - /api/post/comment/delete
const deleteComment = async (req, res) => {
  const { postComment, postId, postedBy } = req.body;

  await Post.updateOne(
    { _id: postId },
    { $pull: { comments: { comment: postComment, postedBy: postedBy } } },
    { new: true }
  );
  const posts = await Post.find().sort({ createdAt: -1 });

  res.status(200).json(posts);
};

export {
  deletePosts,
  displayPosts,
  newPost,
  displayComments,
  newComment,
  deleteComment,
};

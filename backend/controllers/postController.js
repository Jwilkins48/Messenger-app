import Post from "../models/Post.js";

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
  // const userId = req.user._id;
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

export { deletePosts, displayPosts, newPost };

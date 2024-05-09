import express from "express";
import {
  deletePosts,
  displayPosts,
  newPost,
  displayComments,
  newComment,
  deleteComment,
} from "../controllers/postController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

// COMMENTS

// - /api/post/comments
router.get("/comments", displayComments);

// - /api/post/comment/new
router.post("/comment/new", newComment);

// - /api/post/comment/:id
router.delete("/comment/:id", deleteComment);

// - /api/post/
router.get("/", displayPosts);

// - /api/post/new
router.post("/new", newPost);

// - /api/post/:id
router.delete("/:id", deletePosts);

export default router;

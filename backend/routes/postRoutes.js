import express from "express";
import {
  newLike,
  newPost,
  deleteLike,
  newComment,
  deletePosts,
  displayPosts,
  displayComments,
  deleteComment,
} from "../controllers/postController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);

// COMMENTS //
// - /api/post/comments
router.get("/comments", displayComments);

// - /api/post/comment/new
router.post("/comment/new", newComment);

// - /api/post/comment/delete
router.post("/comment/delete", deleteComment);

// POSTS //
// - /api/post/
router.get("/", displayPosts);

// - /api/post/new
router.post("/new", newPost);

// - /api/post/:id
router.delete("/:id", deletePosts);

// LIKES //
// - /api/post/likes/new
router.post("/likes/new", newLike);

// - /api/post/likes/delete
router.post("/likes/delete", deleteLike);

export default router;

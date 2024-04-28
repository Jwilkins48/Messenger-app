import express from "express";
import {
  deletePosts,
  displayPosts,
  newPost,
} from "../controllers/postController.js";

const router = express.Router();

// - /api/post/
router.get("/", displayPosts);

// - /api/post/new
router.post("/new", newPost);

// - /api/post/:id
router.delete("/:id", deletePosts);

export default router;

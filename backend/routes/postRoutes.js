import express from "express";
import {
  deletePosts,
  displayPosts,
  newPost,
} from "../controllers/postController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);

// - /api/post/
router.get("/", displayPosts);

// - /api/post/new
router.post("/new", newPost);

// - /api/post/:id
router.delete("/:id", deletePosts);

export default router;

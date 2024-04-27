import express from "express";
import { displayPosts, newPost } from "../controllers/postController.js";

const router = express.Router();

// - /api/post/
router.get("/", displayPosts);

// - /api/post/new
router.post("/new", newPost);

export default router;

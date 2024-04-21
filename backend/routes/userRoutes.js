import express from "express";
import { signUpUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// - /api/users/signup
router.post("/signup", signUpUser);

// - /api/users/login
router.post("/login", loginUser);

export default router;

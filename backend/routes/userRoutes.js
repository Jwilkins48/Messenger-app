import express from "express";
import { signUpUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// - /api/users/signup
router.get("/signup", signUpUser);

// - /api/users/login
router.get("/login", loginUser);

export default router;

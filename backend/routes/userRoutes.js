import express from "express";
import {
  signUpUser,
  loginUser,
  uploadImage,
} from "../controllers/userController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Upload Image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// - /api/users/signup
router.post("/signup", signUpUser);

// - /api/users/login
router.post("/login", loginUser);

// - /api/users/uploads
router.post("/uploads", upload.single("file"), uploadImage);

export default router;

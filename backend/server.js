import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

const app = express();
const db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoDB"));

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

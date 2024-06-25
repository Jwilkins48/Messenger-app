import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Method from model
    const user = await User.signup(name, email, password);

    // Create Token
    const token = createToken(user.id);

    const timeStamp = user.createdAt;

    res.status(201).json({ name, email, timeStamp, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Method from model
    const user = await User.login(email, password);

    // Create Token
    const token = createToken(user.id);

    const name = user.name;
    const timeStamp = user.createdAt;

    res.status(201).json({ name, email, timeStamp, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const uploadImage = async (req, res) => {
  console.log(req.file);
};

export { signUpUser, loginUser, uploadImage };

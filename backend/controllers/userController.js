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

    res.status(201).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Method from model
    const user = await User.login(email, password);
    const name = user.name;
    // Create Token
    const token = createToken(user.id);

    res.status(201).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signUpUser, loginUser };

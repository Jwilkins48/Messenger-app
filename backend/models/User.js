import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// signup method for user model
userSchema.statics.signup = async function (name, email, password) {
  // Check for user
  const exists = await this.findOne({ email });

  // Validation
  if (!email || !password) {
    throw Error("Enter all fields");
  }

  if (exists) {
    throw Error("Email already in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.create({ name, email, password: hashedPassword });

  return user;
};

// login method for user model
userSchema.statics.login = async function (email, password) {
  // Check for user
  const user = await this.findOne({ email });
  const match = await bcrypt.compare(password, user.password);

  // Validation
  if (!email || !password) {
    throw Error("Enter all fields");
  }

  if (!user) {
    throw Error("Invalid login");
  }

  if (!match) {
    throw Error("Invalid login");
  }

  return user;
};

export default mongoose.model("User", userSchema);

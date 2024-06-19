import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

// signup method for user model
userSchema.statics.signup = async function (name, email, password) {
  // Check for user
  const emailExists = await this.findOne({ email });
  const nameExists = await this.findOne({ name });

  // Validation
  if (!email || !password || !name) {
    throw Error("Enter all fields");
  }

  if (emailExists) {
    throw Error("Email already in use");
  }

  if (nameExists) {
    throw Error("Username already exists");
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
  if (!email || !password || null) {
    throw Error("Enter all fields");
  }

  if (!user || !match || null) {
    throw Error("Invalid login");
  }

  return user;
};

export default mongoose.model("User", userSchema);

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  if (password.length < 6) {
    next(errorHandler(400, "Password must be at least 6 characters long"));
  }

  const hashedPassword = await bcryptjs.hashSync(password, 12);

  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    return res.status(201).json({ message: "SignUp successful" });
  } catch (err) {
    next(err);
  }
};

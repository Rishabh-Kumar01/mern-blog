import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const hashedPassword = await bcryptjs.hashSync(password, 12);

  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    return res.status(201).json({ message: "SignUp successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

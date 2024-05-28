import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    return next(errorHandler(400, "All fields are required"));
  }

  if (password.length < 6) {
    return next(
      errorHandler(400, "Password must be at least 6 characters long")
    );
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

export const signin = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  if (
    !usernameOrEmail ||
    !password ||
    usernameOrEmail === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Check if the input is an email or username
    const isEmail = usernameOrEmail.includes("@");

    // Find the user by email or username
    const validUser = isEmail
      ? await User.findOne({ email: usernameOrEmail })
      : await User.findOne({ username: usernameOrEmail });

    if (!validUser) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const isValidPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );

    if (!isValidPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Destructure to exclude the password from the user object
    const { password: pass, ...restUser } = validUser._doc;

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(restUser);
  } catch (error) {
    next(error);
  }
};

import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return errorHandler(401, "Unauthorized");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return errorHandler(403, "Invalid token");

    req.user = user;
    next();
  });
};

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the database!!!!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const app = express();
app.use(express.json())

app.listen(3000, () => {
  console.log("Server is running on port 3000!!!!");
});

// User
app.use("/api/user", userRoutes);

// Auth
app.use("/api/auth", authRoutes);

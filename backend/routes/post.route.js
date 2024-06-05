import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getposts", getPosts);
router.delete("/delete/:postId/:userId", verifyUser, deletePost);
router.put("/update/:postId/:userId", verifyUser, updatePost);

export default router;

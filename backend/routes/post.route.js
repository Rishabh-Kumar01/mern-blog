import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);

export default router;
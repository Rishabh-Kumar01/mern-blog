import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);

export default router;

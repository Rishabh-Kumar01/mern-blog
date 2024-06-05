import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signoutUser,
  getUsers
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/VerifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signoutUser);
router.get("/getusers", verifyUser, getUsers)

export default router;

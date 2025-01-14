import express from "express";
import { authUser, createUser, logout, updateUserProfile } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route("/").post(createUser);
router.route("/auth").post(authUser);
router.route("/profile").put(protect,updateUserProfile);
router.route("/logout").post(logout);

export default router

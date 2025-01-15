import express from "express";
import { authUser, createUser, deleteUser, getAllUserProfile, logout, updateUserProfile, updateUserProfileAdmin } from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route("/").post(createUser).get(protect,admin,getAllUserProfile)
router.route("/auth").post(authUser);
router.route("/profile").put(protect,updateUserProfile);
router.route("/logout").post(logout);
router.route("/:id").put(protect,admin,updateUserProfileAdmin).delete(protect,admin,deleteUser)

export default router

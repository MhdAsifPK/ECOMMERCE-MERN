import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { productReview } from "../controllers/reviewControllers.js";


const router = express.Router();

router.route("/").get(getProduct).post(protect,admin, createProduct);
router.route("/:id").get(getProductById).put(protect,admin, updateProduct).delete(protect,admin,deleteProduct)
router.route("/:id/review").post(protect,productReview)
export default router;

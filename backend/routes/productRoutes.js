import express from "express";
import {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route("/").get(getProduct).post(protect,admin, createProduct);
router.route("/:id").get(getProductById).put(protect,admin, updateProduct);

export default router;

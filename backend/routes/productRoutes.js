import express from "express";
import {
  createProduct,
  getProduct,
  getProductById,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProduct).post(createProduct);
router.route("/:id").get(getProductById);

export default router;

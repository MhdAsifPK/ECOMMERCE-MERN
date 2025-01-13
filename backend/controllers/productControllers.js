import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
  console.log("products");
});
const createProduct = async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
    reviews,
  } = req.body;
  const product = await Product.create({
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
    reviews,
  });
  res.json(product);
};
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

export { createProduct, getProduct, getProductById };

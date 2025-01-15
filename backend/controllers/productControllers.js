import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
  console.log("products");
});
// ==============================================================
const createProduct = async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/uload/sample.jpg",
    brand: "sample brand",
    category: "samplecatogery",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
    rating: 0,
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
};
// ============================================================================
const updateProduct = asyncHandler(async (req, res) => {
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
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.user = req.user._id;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.numReviews = numReviews || product.numReviews;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// =============================================
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// =============================================================
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

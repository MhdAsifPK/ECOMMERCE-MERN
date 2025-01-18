import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProduct = asyncHandler(async (req, res) => {
  // hpow many product scrreen in the display
  const pageSize = 1;
  const page = Number(req.query.pageNumber || 1);

  // for ssearch
  const keywordConditon= req.query.keyword ? {name:{$regex:req.query.keyword, $options:"i"}}:{};
  // product collection n  akatth ethra count undennu ariyaan
  const count = await Product.countDocuments({...keywordConditon});

  // for limiting screen display at a time screen dispaly

  const products = await Product.find({...keywordConditon})
    .limit(pageSize)
    // skip used for skipping products and screen the next product on the screen
    .skip(pageSize * (page - 1));
// total eathra page varunnundennu frontent kk ayakkan
  res.json({products,page,pages:Math.ceil(count/pageSize)});
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
// product review
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (item) => item.user.toString() === req.user._id.toString()
//     );
//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error("Product already reviewed");
//     }
//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     };
//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
//       product.reviews.length;
//     await product.save();
//     res.json({ message: "Review added successfully" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });
// // =============================================================

export {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

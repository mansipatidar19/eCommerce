const express = require("express");
const upload = require("../config/multer");
const {
  addProduct,
  productDetails,
  searchProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/product.controller");
const authorization = require("../middlewares/user.security");
const isAdmin = require("../middlewares/admin.security");

const productRouter = express.Router();

// Route to get all products
productRouter.get("/getAllProducts", getAllProducts);

// Route to add a new product
productRouter.post(
  "/addProduct",
  authorization,
  isAdmin,
  upload.single("image"),
  addProduct
);

// Route to get details of a product
productRouter.get("/productDetails/:id", productDetails);

// Route to search for products
productRouter.get("/searchProduct", searchProduct);

// Route to update a product
productRouter.patch(
  "/updateProduct/:id",
  authorization,
  isAdmin,
  updateProduct
);

// Route to delete a product
productRouter.delete(
  "/deleteProduct/:id",
  authorization,
  isAdmin,
  deleteProduct
);

module.exports = productRouter;

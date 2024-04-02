// Import mongoose library for MongoDB interactions.
const mongoose = require("mongoose");

// Define schema for product data.
const productSchema = new mongoose.Schema(
  {
    // Title of the product.
    title: {
      type: String,
      required: true,
    },
    // Description of the product.
    description: {
      type: String,
      required: true,
    },
    // Quantity of the product available.
    quantity: {
      type: Number,
      required: true,
    },
    // Price of the product.
    price: {
      type: Number,
      required: true,
    },
    // Image URL of the product.
    image: {
      type: String,
      required: true,
    },
  },
  // Automatically add timestamps for product creation and modification.
  { timestamps: true }
);

// Create model from product schema.
const ProductModel = mongoose.model("ProductModel", productSchema);

// Export product model.
module.exports = ProductModel;

// Import mongoose library for MongoDB interactions.
const mongoose = require("mongoose");

// Define schema for order data.
const orderSchema = new mongoose.Schema(
  {
    // Reference to the user who placed the order.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    // Information about the products in the order.
    products: {
      // Reference to the product in the order.
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModel",
      },
      // Quantity of the product in the order.
      quantity: {
        type: Number,
        required: true,
      },
    },
    // Total amount of the order.
    totalamount: {
      type: Number,
      required: true,
    },
    // Status of the order (e.g., Pending, Processing, Shipped).
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Rejected"],
      default: "Pending",
    },
    // Payment method used for the order (e.g., Cash on Delivery, PayPal).
    paymentMethod: {
      type: String,
      enum: ["COD", "PayPal"],
      default: "PayPal",
    },
  },
  // Automatically add timestamps for order creation and modification.
  { timestamps: true }
);

// Create model from order schema.
const OrderModel = mongoose.model("OrderModel", orderSchema);

// Export order model.
module.exports = OrderModel;

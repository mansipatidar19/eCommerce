// Import mongoose library for MongoDB interactions.
const mongoose = require("mongoose");

// Define schema for user data.
const userSchema = new mongoose.Schema({
  // Name of the user.
  name: {
    type: String,
    required: true,
  },
  // Email of the user (unique).
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password of the user.
  password: {
    type: String,
    required: true,
  },
  // Address of the user.
  address: {
    type: String,
    required: true,
  },
  // Boolean flag indicating if the user is an admin.
  isAdmin: {
    type: Boolean,
    required: true,
  },
  // Array of orders associated with the user.
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderModel",
    },
  ],
});

// Create model from user schema.
const UserModel = mongoose.model("UserModel", userSchema);

// Export user model.
module.exports = UserModel;

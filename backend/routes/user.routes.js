const express = require("express");
const {
  register,
  login,
  myProfile,
  updateProfile,
  orderProduct,
  cancelOrder,
  myOrders,
} = require("../controllers/user.controller");
const authorization = require("../middlewares/user.security");

const userRouter = express.Router();

// Route to register a new user
userRouter.post("/register", register);

// Route to login an existing user
userRouter.post("/login", login);

// Route to get user's own profile
userRouter.get("/myProfile", authorization, myProfile);

// Route to update user's profile
userRouter.patch("/updateProfile", authorization, updateProfile);

// Route to order a product
userRouter.post("/orderProduct/:id", authorization, orderProduct);

// Route to cancel an order
userRouter.delete("/cancelOrder/:id", authorization, cancelOrder);

// Route to get user's orders
userRouter.get("/myOrders", authorization, myOrders);

module.exports = userRouter;
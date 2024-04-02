const express = require("express");
const isAdmin = require("../middlewares/admin.security");
const {
  getAllUsers,
  updateUser,
  getAllOrders,
  getUserById,
  updateOrderStatus,
} = require("../controllers/admin.controller");
const authorization = require("../middlewares/user.security");

// Create express router for admin routes.
const adminRouter = express.Router();

// Apply user authentication and admin authorization middleware to all routes.
adminRouter.use(authorization, isAdmin);

// Define routes for admin operations.
adminRouter.get("/getAllUsers", getAllUsers);
adminRouter.get("/getUserById/:userId", getUserById);
adminRouter.patch("/updateUser/:id", updateUser);
adminRouter.get("/getAllOrders", getAllOrders);
adminRouter.patch("/updateOrderStatus/:id", updateOrderStatus);

// Export admin router.
module.exports = adminRouter;

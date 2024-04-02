const UserModel = require("../models/user.model");

// Check if user is admin
const isAdmin = async (req, res, next) => {
  const adminId = req.user._id;
  // Getting user details
  const admin = await UserModel.findById(adminId);
  if (!admin) {
    return res.status(404).json({ Message: "User not found" });
  }
  // If user is admin then, direct to next middleware
  if (admin.isAdmin === true) {
    next();
  } else {
    res
      .status(400)
      .json({ Message: "You are not authorized to access this page!" });
  }
};

module.exports = isAdmin;

// Import required modules and models.
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const UserModel = require("../models/user.model");

// User Authorization Middleware
const authorization = async (req, res, next) => {
  try {
    // Retrieve authorization header from request.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // Check if authorization header is missing, return error response.
      return res.status(400).json({ Message: "Please log-in first!" });
    }

    // Extract token from authorization header.
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      // Check if token is missing, return error response.
      return res.status(400).json({ Message: "Please log-in first!" });
    }

    // Verify token and decode user information.
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user from database based on decoded user ID.
    const user = await UserModel.findById({ _id: decoded.id }, { password: 0 });
    
    // Attach user information to request object.
    req.user = user;
    
    // Proceed to next middleware.
    next();
  } catch (error) {
    // Handle errors and send appropriate response.
    console.log("Error occured in authorization:", error);
    res.send(500).json({ Message: "Internal Server Error", error });
  }
};

module.exports = authorization;

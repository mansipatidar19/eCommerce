// Import mongoose library for MongoDB interactions.
const mongoose = require("mongoose");

// Import MongoDB URI from environment variables.
const { MONGO_URI } = require("./env");

// Function to configure database connection.
const dbConfig = () => {
  // Connect to MongoDB using the provided URI.
  mongoose.connect(MONGO_URI);

  // Event listeners for successful connection and errors.
  mongoose.connection.on("connected", () => {
    console.log("Server connected with database!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occured while connecting with database!");
  });
};

module.exports = dbConfig;

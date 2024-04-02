const express = require("express");
const cors = require("cors");
const path = require("path");

// Import database configuration
const dbConfig = require("./config/db");

// Import routers
const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const productRouter = require("./routes/product.routes");
const seedRouter = require("./routes/seed.routes");

// Import PORT from environment variables
const { PORT } = require("./config/env");

const app = express();

// Connect to the database
dbConfig();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for enabling CORS
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/files", express.static(path.join(__dirname, "uploads")));

// Define routes 
app.use("/api/seed", seedRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);

// Start server
app.listen(PORT, () => {
  console.log("Server started at", PORT);
});

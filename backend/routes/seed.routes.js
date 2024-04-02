const express = require("express");
const { seedProducts, seedUsers } = require("../controllers/sample.controller");

const seedRouter = express.Router();

// Route to seed products data
seedRouter.post("/seedProducts", seedProducts);

// Route to seed users data
seedRouter.post("/seedUsers", seedUsers);

module.exports = seedRouter;

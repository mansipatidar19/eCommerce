const env = require("dotenv");
// Configuration of env file
env.config();

// Retriving constants and exporting them
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { PORT, MONGO_URI, JWT_SECRET };

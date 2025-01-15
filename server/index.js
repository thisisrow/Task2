//index.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./connection/db");
const cryptoRoutes = require("./routes/cryptoRoutes");

const alertRoutes = require("./routes/alertRoutes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Connect to Database
connectDB();

//Routes
app.use("/api/crypto", cryptoRoutes);
app.use("/api/alerts", alertRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

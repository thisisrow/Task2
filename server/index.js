const express = require('express');
const morgan = require("morgan");
const connectDB = require('./connection/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
// Connect to Database
connectDB();


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
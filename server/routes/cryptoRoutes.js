const express = require("express");
const { getCryptoData } = require("../controllers/cryptoController");

const router = express.Router();

// Route to fetch cryptocurrency data
router.get("/markets", getCryptoData);

module.exports = router;

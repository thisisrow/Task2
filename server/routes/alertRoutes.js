// routes/alertRoutes.js
const express = require("express");
const { createAlert, getAlerts, deleteAlert } = require("../controllers/alertController");

const router = express.Router();

router.post("/", createAlert); // Add a new alert
router.get("/", getAlerts);    // Get all alerts
router.delete("/:id", deleteAlert); // Delete an alert

module.exports = router;

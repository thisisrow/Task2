const express = require('express');
const { createAlert, getAlerts, getCryptoPrice } = require('../controller/alertController');

const router = express.Router();

router.post('/alerts', createAlert);
router.get('/alerts', getAlerts);
router.get('/price/:cryptoId', getCryptoPrice); // Define the price route

module.exports = router;

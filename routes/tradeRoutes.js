
const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.get('/historical-trades/:symbol', tradeController.getHistoricalTrades);

module.exports = router;

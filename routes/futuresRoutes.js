const express = require('express');
const router = express.Router();

const {
    getFuturesBalance,
    placeFuturesOrder,
    cancelFuturesOrder,
    getOpenOrders,
    getAllOrders
} = require('../controllers/futuresController');

router.get('/balance', getFuturesBalance);
router.post('/order', placeFuturesOrder);
router.delete('/cancel/:symbol/:orderId', cancelFuturesOrder);
router.get('/open-orders/:symbol', getOpenOrders);
router.get('/all-orders/:symbol', getAllOrders);

module.exports = router;

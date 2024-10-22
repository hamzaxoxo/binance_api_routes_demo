const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/ticker/:symbol', orderController.getTicker);
router.post('/new-order', orderController.newLimitOrder);
router.post('/new-market-order', orderController.newMarketOrder);
router.get('/order-status/:symbol/:orderId', orderController.getOrderStatus);
router.delete('/cancel-order/:symbol/:orderId', orderController.cancelOrder);
router.get('/all-orders/:symbol', orderController.getAllOrders);
router.get('/all-open-orders', orderController.getAllOpenOrders);

module.exports = router;

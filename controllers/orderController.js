const { Spot } = require('@binance/connector');
require('dotenv').config();
const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' });

exports.getTicker = async (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    try {
        const ticker = await client.tickerPrice(symbol);
        res.json(ticker.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.newLimitOrder = async (req, res) => {
    const { symbol, side, type, price, quantity, timeInForce } = req.body;
    if (!symbol || !side || !type || !price || !quantity) {
        return res.status(400).json({ error: 'Symbol, side, type, price, and quantity are required' });
    }
    try {
        const order = await client.newOrder(symbol, side, type, {
            price: price,
            quantity: quantity,
            timeInForce: timeInForce || 'GTC'
        });
        res.json(order.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.newMarketOrder = async (req, res) => {
    const { symbol, side, quantity } = req.body;
    if (!symbol || !side || !quantity) {
        return res.status(400).json({ error: 'Symbol, side, and quantity are required' });
    }
    try {
        const order = await client.newOrder(symbol, side, 'MARKET', {
            quantity: quantity
        });
        res.json(order.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderStatus = async (req, res) => {
    const { symbol, orderId } = req.params;
    try {
        const orders = await client.allOrders(symbol.toUpperCase());
        const order = orders.data.find(o => o.orderId == orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    const { symbol, orderId } = req.params;
    try {
        if (!symbol || !orderId) {
            return res.status(400).json({ error: 'Symbol and orderId are required' });
        }
        const cancelResponse = await client.cancelOrder(symbol.toUpperCase(), { orderId: orderId, recvWindow: 60000 });
        res.json(cancelResponse.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    const { symbol } = req.params;
    try {
        const openOrders = await client.openOrders(symbol.toUpperCase());
        res.json(openOrders.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOpenOrders = async (req, res) => {
    try {
        const openOrders = await client.openOrders();
        res.json(openOrders.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

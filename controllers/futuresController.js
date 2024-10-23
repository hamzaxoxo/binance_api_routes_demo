const { Futures, Spot } = require('@binance/connector');
require('dotenv').config();

// Initialize Binance Futures Testnet client
const apiKey = process.env.BINANCE_FUTURE_API_KEY;
const apiSecret = process.env.BINANCE_FUTURE_API_SECRET;
const client = new Spot(apiKey, apiSecret, {
    baseURL: 'https://testnet.binancefuture.com'
});

const getFuturesBalance = async (req, res) => {
    try {
        const balance = await client.balance();
        res.json(balance.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const placeFuturesOrder = async (req, res) => {
    const { symbol, side, quantity, price, type = 'LIMIT' } = req.body;
    try {
        const order = await client.newOrder(symbol, side, type, {
            price: price,
            quantity: quantity,
            timeInForce: 'GTC'
        });
        res.json(order.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cancelFuturesOrder = async (req, res) => {
    const { symbol, orderId } = req.params;
    try {
        const result = await client.cancelOrder(symbol.toUpperCase(), { orderId });
        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOpenOrders = async (req, res) => {
    const { symbol } = req.params;
    try {
        const openOrders = await client.openOrders(symbol.toUpperCase());
        res.json(openOrders.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    const { symbol } = req.params;
    try {
        const orders = await client.allOrders(symbol.toUpperCase());
        res.json(orders.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFuturesBalance,
    placeFuturesOrder,
    cancelFuturesOrder,
    getOpenOrders,
    getAllOrders
};

const { Spot } = require('@binance/connector');
require('dotenv').config();
const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' });

exports.getHistoricalTrades = async (req, res) => {
    const { symbol } = req.params;
    try {
        const trades = await client.myTrades(symbol);
        res.json(trades.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

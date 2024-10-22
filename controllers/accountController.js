const { Spot } = require('@binance/connector');
require('dotenv').config();
const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' });

exports.getAccount = async (req, res) => {
    try {
        const account = await client.account();
        res.json(account.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

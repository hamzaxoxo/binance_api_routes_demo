const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const accountRoutes = require('./routes/accountRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const futuresRoutes = require('./routes/futuresRoutes');

app.use(accountRoutes);
app.use(orderRoutes);
app.use(tradeRoutes);   
app.use('/futures', futuresRoutes);

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/account', accountController.getAccount);

module.exports = router;

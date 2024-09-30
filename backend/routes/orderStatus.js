const express = require('express');
const { getAllOrderStatus } = require('../controllers/orderStatusController');
const router = express.Router();

router.get('/get', getAllOrderStatus);

module.exports = router
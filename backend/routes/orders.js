const express = require('express');
const { getAllOrders, getUserOrders, placeOrder, updateOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/get', getAllOrders);
router.get('/get/:id', getUserOrders);
router.post('/place-order', placeOrder);
router.put('/update-order/:id', updateOrder);

module.exports = router
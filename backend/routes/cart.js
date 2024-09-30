const express = require('express');
const { addToCart, updateCartItem, getUserCart, deleteProductFromCart, removeAllItemsFromCart } = require('../controllers/cartController');
const router = express.Router();

router.get("/get/:user_id", getUserCart)
router.post("/add", addToCart)
router.put('/update', updateCartItem);
router.delete('/delete-single-cart', deleteProductFromCart);
router.delete('/delete-all-cart', removeAllItemsFromCart);

module.exports = router
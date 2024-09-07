const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts } = require('../controllers/productController');
const { upload } = require('../middleware');

router.get('/get', getAllProducts);
router.post('/add', upload.array('images'), addProduct);

module.exports = router
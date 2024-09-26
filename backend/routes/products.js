const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getSingleProduct, deleteProduct } = require('../controllers/productController');
const { upload } = require('../middleware');

router.get('/get', getAllProducts);
router.get('/get/:id', getSingleProduct);
router.delete('/delete/:id', deleteProduct);
router.post('/add', upload.array('images'), addProduct);

module.exports = router
const express = require('express');
const { getAllBrands, addBrand } = require('../controllers/brandController');
const router = express.Router();

router.get('/get', getAllBrands);
router.post('/add', addBrand);

module.exports = router
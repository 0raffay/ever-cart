const express = require('express');
const { getAllCategories, addCategory } = require('../controllers/categoryController');
const router = express.Router();

router.get('/get', getAllCategories);
router.post('/add', addCategory);

module.exports = router
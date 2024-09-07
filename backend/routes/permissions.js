const express = require('express');
const { getAllPermissions, addPermission } = require('../controllers/permissionController');
const router = express.Router();

router.get('/get', getAllPermissions);
router.post('/add', addPermission);

module.exports = router
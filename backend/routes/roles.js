const express = require('express');
const { getAllRoles, addRoles, assignPermissionToRole } = require('../controllers/roleController');
const router = express.Router();

router.get('/get', getAllRoles);
router.post('/add', addRoles);
router.post('/assign-permission-to-role', assignPermissionToRole);

module.exports = router
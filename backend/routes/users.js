const express = require('express');
const { getAllUsers, assignRoleToUser } = require('../controllers/userController');
const router = express.Router();

router.get('/get', getAllUsers);
router.post('/assign-role-to-user', assignRoleToUser);

module.exports = router
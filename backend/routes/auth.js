const express = require('express');
const router = express.Router();
const path = require('path');
const { login, register, refreshToken, revokeToken } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', revokeToken);

module.exports = router
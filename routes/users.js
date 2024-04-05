const express = require('express');
const router = express.Router();
const AuthFunction = require('../function/auth.function');
const { authenticateToken } = require('../middleware/auth.middleware');
router.post('/register', AuthFunction.register);

router.post('/login', AuthFunction.login);

router.post('/get-all', authenticateToken, AuthFunction.getAllUser);
router.post('/refresh-token', AuthFunction.refreshToken);

module.exports = router;
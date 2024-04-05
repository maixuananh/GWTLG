const userRoute = require('./users');
const classRoute = require('./classes');
const testRoute = require('./tests');
const testedRoute = require('./tested');
const gradeRoute = require('./grade');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
//http://localhost:3567/api/classes
router.use('/users', userRoute);
router.use('/classes', authenticateToken, classRoute);
router.use('/tests', authenticateToken, testRoute);
router.use('/tested', authenticateToken, testedRoute);
router.use('/grade', authenticateToken, gradeRoute);

module.exports = router;
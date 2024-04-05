const express = require('express');
const router = express.Router();
const TestFunction = require('../function/tests.function');

router.post('/get-by-class', TestFunction.getTestsByClassId);
router.get('/get-by-admin-id', TestFunction.getTestByAdminId);

router.post('/get-detail-test', TestFunction.getDetailTest);
router.post('/create-test', TestFunction.createTest);

module.exports = router;
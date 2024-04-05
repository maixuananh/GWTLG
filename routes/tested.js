const express = require('express');
const router = express.Router();
const TestedFunction = require('../function/tested.function');

router.get('/get-tested-ids', TestedFunction.getTestedIdsByUserId);
router.post('/get-by-test-id', TestedFunction.getTestedByTestId);

router.post('/send-test', TestedFunction.sendTested)

module.exports = router;
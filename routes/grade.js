const express = require('express');
const router = express.Router();
const ClassFunction = require('../function/classes.function');
const GradeFunction = require('../function/grade.function');
//GET http://localhost:3567/api/classes/get-all
router.post('/create-grade-by-test-id', GradeFunction.createGradeByTestId);
router.post('/get-grade-by-test-id', GradeFunction.getGradeByTest);

module.exports = router;
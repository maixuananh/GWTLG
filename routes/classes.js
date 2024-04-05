const express = require('express');
const router = express.Router();
const ClassFunction = require('../function/classes.function');
//GET http://localhost:3567/api/classes/get-all
router.get('/get-all', ClassFunction.getAllClass);

router.post('/search', ClassFunction.search);

router.get('/get-by-admin-id', ClassFunction.getByAdmin);

router.post('/create', ClassFunction.createClass);

router.post('/join-classroom', ClassFunction.joinClass);

module.exports = router;
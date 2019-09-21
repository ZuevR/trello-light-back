const express = require('express');
const router = express.Router();
const BoardController = require('../../../controllers').board;
// const { FormHelper } = require('../../../helpers');

router.get('/', BoardController.getBoards);

module.exports = router;

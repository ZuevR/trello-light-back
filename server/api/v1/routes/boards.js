const express = require('express');
const router = express.Router();
const SecureHelper = require('../../../helpers/string');
const BoardController = require('../../../controllers').board;

router.get('/', SecureHelper.verifyToken, BoardController.getBoards);

router.get('/:id', SecureHelper.verifyToken, BoardController.getBoard);

router.post('/', SecureHelper.verifyToken, BoardController.createBoard);

module.exports = router;

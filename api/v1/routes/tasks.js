const express = require('express');
const router = express.Router();
const TaskController = require('../../../controllers').task;
const SecureHelper = require('../../../helpers/string');

router.post('/', SecureHelper.verifyToken, TaskController.addNewTask);

router.post('/moved', SecureHelper.verifyToken, TaskController.moveTask);

router.post('/rename', SecureHelper.verifyToken, TaskController.renameTask);

router.delete('/:id', SecureHelper.verifyToken, TaskController.removeTask);

router.patch('/description', SecureHelper.verifyToken, TaskController.changeTaskDescription);

module.exports = router;

const express = require('express');
const router = express.Router();
const TaskController = require('../../../controllers').task;

router.get('/', TaskController.getAllTasks);

module.exports = router;

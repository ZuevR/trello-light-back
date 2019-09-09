const express = require('express');
const router = express.Router();
const UserController = require('../controllers').user;

router.post('/signup', UserController.signup);

module.exports = router;

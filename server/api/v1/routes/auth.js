const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers').user;

router.post('/signup', UserController.signup);

router.get('/confirm', UserController.confirm);

module.exports = router;

const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers').user;
const { FormHelper } = require('../../../helpers');

router.post('/signup', UserController.signup);

router.post('/signin', FormHelper.processForm, UserController.signin);

router.get('/confirm', UserController.confirm);

module.exports = router;

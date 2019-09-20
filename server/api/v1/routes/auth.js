const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers').user;
const { FormHelper } = require('../../../helpers');

router.post('/signup', UserController.signup);

router.post('/signin', FormHelper.processForm, UserController.signin);

router.get('/confirm', UserController.confirm);

router.post('/new-email', UserController.sendNewVerificationEmail);

router.get('/test', UserController.test);

module.exports = router;

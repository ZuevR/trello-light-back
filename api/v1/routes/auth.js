const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers').user;
const { FormHelper, SecureHelper } = require('../../../helpers');

router.post('/signup', UserController.signup);

router.post('/signin', FormHelper.processForm, UserController.signin);

router.get('/confirm', UserController.confirm);

router.get('/logout', SecureHelper.verifyToken, UserController.logout);

router.post('/new-email', UserController.sendNewVerificationEmail);

router.post('/social-auth', UserController.socialAuth);

router.get('/user', SecureHelper.verifyToken, UserController.getIdentity);

module.exports = router;

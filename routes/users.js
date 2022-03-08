const express = require('express');
const auth = require('../controllers/auth')

const router = express.Router();

router.post('/users/login', auth.login);
router.post('/users/signup', auth.signUp);
router.post('/users/forgot-password', auth.resetPassword);

module.exports = router;
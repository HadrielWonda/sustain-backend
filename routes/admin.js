const express = require('express');
const auth = require('../controllers/user/auth')
const { body } = require('express-validator')

const router = express.Router();

router.post('/admin/login', [body('email').trim().isEmail(), body('password').trim().isLength({ min: 6})], auth.login);
router.post('/admin/signup', auth.signUp);

module.exports = router;
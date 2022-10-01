const express = require('express');
const auth = require('../controllers/auth')
const { body } = require('express-validator')

const router = express.Router();

router.post('/provider/login', body('email').trim().isEmail().withMessage('please enter a valid email').normalizeEmail(), body('password', 'please enter a password with at least 5 characters').trim().isLength({ min: 6 }), auth.login);
router.post('/provider/forgot-password', auth.resetPassword);

module.exports = router;
const express = require('express');
const auth = require('../controllers/auth')
const User = require('../models/user')
const webhook = require('../controllers/webhook')
const { body } = require('express-validator')

const router = express.Router();

router.post('/user/login', body('email').trim().isEmail().withMessage('please enter a valid email').normalizeEmail(), body('password', 'please enter a password with at least 5 characters').trim().isLength({ min: 6 }), auth.login);
router.post('/user/signup', body('email').trim().isEmail().withMessage('please enter a valid email').custom((value) => {
    return User.findOne({
        email: value
    }).then((user) => {
        if (!user) {
            return Promise.reject('a user with this email already exists');
        }
    }).normalizeEmail()
}), body('password', 'please enter a password with at least 5 characters').trim().isLength({ min: 6 }), body('first_name', 'first name field should not be empty').trim().not().isEmpty(), body('last_name', 'first name field should not be empty').trim().not().isEmpty(), auth.signUp);
router.post('/user/forgot-password', auth.resetPassword);
router.post('/user/webhook-payments', webhook.payments);

module.exports = router;
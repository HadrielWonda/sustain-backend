const express = require('express');
const auth = require('../controllers/auth')
const User = require('../models/user')
const webhook = require('../controllers/webhook')
const { body } = require('express-validator')
const user = require('../controllers/user')
const authorization = require('../middlewares/is_auth')

const router = express.Router();

router.post('/users/login', body('email').trim().isEmail().withMessage('please enter a valid email').normalizeEmail(), body('password', 'please enter a password with at least 5 characters').trim().isLength({ min: 6 }), auth.login);
router.post('/users/signup', body('email').trim().isEmail().withMessage('please enter a valid email').custom((value) => {
    return User.findOne({
        email: value
    }).then((user) => {
        if (user) {
            return Promise.reject('a user with this email already exists');
        }
    })
}).normalizeEmail(), body('password', 'please enter a password with at least 5 characters').trim().isLength({ min: 6 }), body('first_name', 'first name field should not be empty').trim().not().isEmpty(), body('last_name', 'first name field should not be empty').trim().not().isEmpty(), auth.signUp);
router.post('/users/forgot-password', auth.resetPassword);
router.post('/users/new-password', auth.setNewPassword);

router.post('/users/webhook-payments', webhook.payments);

router.get('/users/:userID', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getUser);

router.get('/users/:userID/blood-glucose-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getBloodGlucoseLogs);
router.get('/users/:userID/blood-pressure-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getBloodPressureLogs);
router.get('/users/:userID/weight-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getWeightLogs);
router.get('/users/:userID/food-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getFoodLogs);

router.post('/users/:userID/blood-pressure-log', body('systolic_blood_pressure', 'systolic blood pressure field should not be empty').trim().not().isEmpty(), body('diastolic_blood_pressure', 'diastolic blood pressure field should not be empty').trim().not().isEmpty(), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveBloodPressureLog);
router.post('/users/:userID/blood-glucose-log', body('blood_glucose', 'blood glucose field should not be empty').trim().not().isEmpty(), body('context', 'context field should not be empty').trim().not().isEmpty(), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveBloodGlucoseLog);
router.post('/users/:userID/weight-log', body('weight', 'weight field should not be empty').trim().not().isEmpty(), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveWeightLog);
router.post('/users/:userID/food-log', body('food', 'food field should not be empty').trim().not().isEmpty(), body('meal_type', 'meal type field should not be empty').trim().not().isEmpty(), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveFoodLog);

module.exports = router;
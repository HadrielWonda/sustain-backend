const { body } = require('express-validator')
const User = require('../models/user')

exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email').trim().isEmail().withMessage('please enter a valid email').normalizeEmail(),
                body('password', 'please enter a password with at least 5 characters').trim().isLength({ min: 6 }),
            ]
        }
        case 'signUp': {
            return [
                body('email').trim().isEmail().withMessage('please enter a valid email').custom((value) => {
                    return User.findOne({
                        email: value
                    }).then((user) => {
                        if (user) {
                            return Promise.reject('a user with this email already exists');
                        }
                    })
                }).normalizeEmail(),
                body('password', 'please enter a password with at least 5 characters').trim().isLength({ min: 6 }),
                body('first_name', 'first name field should not be empty').trim().not().isEmpty(),
                body('last_name', 'first name field should not be empty').trim().not().isEmpty()
            ]
        }
        case 'saveBloodPressureLog': {
            return [
                body('systolic_blood_pressure', 'systolic blood pressure field should not be empty').trim().not().isEmpty(),
                body('diastolic_blood_pressure', 'diastolic blood pressure field should not be empty').trim().not().isEmpty()
            ]
        }
        case 'saveBloodGlucoseLog': {
            return [
                body('blood_glucose', 'blood glucose field should not be empty').trim().not().isEmpty(),
                body('context', 'context field should not be empty').trim().not().isEmpty()
            ]
        }
        case 'saveWeightLog': {
            return [
                body('weight', 'weight field should not be empty').trim().not().isEmpty()
            ]
        }
        case 'saveFoodLog': {
            return [
                body('food', 'food field should not be empty').trim().not().isEmpty(),
                body('meal_type', 'meal type field should not be empty').trim().not().isEmpty()
            ]
        }
    }
}


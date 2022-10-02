const express = require('express');
const auth = require('../controllers/auth')
const webhook = require('../controllers/webhook')
const user = require('../controllers/user')
const authorization = require('../middlewares/is_auth')
const validator = require('../middlewares/validation')

const router = express.Router();

router.post('/users/login', validator.validate('login'), auth.login);
router.post('/users/signup', validator.validate('signUp'), auth.signUp);
router.post('/users/forgot-password', auth.resetPassword);
router.post('/users/new-password', auth.setNewPassword);

router.post('/users/webhook-payments', webhook.payments);

router.get('/users/:userID', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getUser);

router.get('/users/:userID/blood-glucose-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getBloodGlucoseLogs);
router.get('/users/:userID/blood-pressure-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getBloodPressureLogs);
router.get('/users/:userID/weight-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getWeightLogs);
router.get('/users/:userID/food-log', authorization.hasValidToken, authorization.tokenMatchesUserID, user.getFoodLogs);

router.post('/users/:userID/blood-pressure-log', validator.validate('saveBloodPressureLog'), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveBloodPressureLog);
router.post('/users/:userID/blood-glucose-log', validator.validate('saveBloodGlucoseLog'), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveBloodGlucoseLog);
router.post('/users/:userID/weight-log', validator.validate('saveWeightLog'), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveWeightLog);
router.post('/users/:userID/food-log', validator.validate('saveFoodLog'), authorization.hasValidToken, authorization.tokenMatchesUserID, user.saveFoodLog);

module.exports = router;
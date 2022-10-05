const express = require('express');
const auth = require('../controllers/user/auth')
const webhook = require('../controllers/user/webhook')
const user = require('../controllers/user/user')
const biomarkers = require('../controllers/user/biomarkers')
const authorization = require('../middlewares/is_auth')
const validator = require('../middlewares/validation')
const permission = require('../middlewares/permission')

const router = express.Router();

router.post('/login', validator.validate('login'), auth.login);
router.post('/signup', validator.validate('signUp'), auth.signUp);
router.post('/forgot-password', auth.resetPassword);
router.post('/new-password', auth.setNewPassword);

router.post('/webhook-payments', webhook.payments);

router.get('/patients/:patientID', authorization.hasValidToken, user.getPatient);

router.put('/patients/:patientID', authorization.hasValidToken, user.editProfile);

router.get('/patients/:patientID/blood-glucose-log', authorization.hasValidToken, biomarkers.getBloodGlucoseLogs);
router.get('/patients/:patientID/blood-pressure-log', authorization.hasValidToken, biomarkers.getBloodPressureLogs);
router.get('/patients/:patientID/weight-log', authorization.hasValidToken, biomarkers.getWeightLogs);
router.get('/patients/:patientID/food-log', authorization.hasValidToken, biomarkers.getFoodLogs);

router.post('/patients/blood-pressure', validator.validate('saveBloodPressureLog'), authorization.hasValidToken, biomarkers.saveBloodPressure);
router.post('/patients/blood-glucose', validator.validate('saveBloodGlucoseLog'), authorization.hasValidToken, biomarkers.saveBloodGlucose);
router.post('/patients/weight', validator.validate('saveWeightLog'), authorization.hasValidToken, biomarkers.saveWeight);
router.post('/patients/food', validator.validate('saveFoodLog'), authorization.hasValidToken, biomarkers.saveFood);

router.get('/provider/:providerID/patients', authorization.hasValidToken, user.getPatientList);
router.put('/provider/:providerID', authorization.hasValidToken, user.editProfile);

module.exports = router;
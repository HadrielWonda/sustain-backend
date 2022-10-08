const express = require('express');
const { login, signUp, resetPassword, setNewPassword, logout } = require('../controllers/user/auth');
const { webhook } = require('../controllers/user/payments');
const { getPatientList, editProfile, getSinglePatient } = require('../controllers/user/user');
const { getFoodLogs, getBloodGlucoseLogs, getBloodPressureLogs, getWeightLogs, saveBloodGlucose, saveBloodPressure, saveFood, saveWeight, getBiomarkersSummary } = require('../controllers/user/biomarkers');
const { hasValidToken } = require('../middlewares/is_auth');
const validator = require('../middlewares/validation');
const permission = require('../middlewares/permission');
const { getRecipeList, getSingleRecipe, getMealPlan } = require('../controllers/user/eat');

const router = express.Router();

router.post('/auth/login', validator.validate('login'), login);
router.post('/auth/signup', validator.validate('signUp'), signUp);
router.post('/auth/forgot-password', resetPassword);
router.post('/auth/new-password', validator.validate('newPass'), setNewPassword);
router.post('/auth/logout', hasValidToken, logout);

router.post('/payments/webhook', webhook);
router.post('/payments/intialize', webhook);

router.get('/patients/:userID', hasValidToken, getSinglePatient);

router.put('/patients/:patientID', hasValidToken, editProfile);

router.get('/patients/:patientID/biomarker/blood-glucose', hasValidToken, getBloodGlucoseLogs);
router.get('/patients/:patientID/biomarker/blood-pressure', hasValidToken, getBloodPressureLogs);
router.get('/patients/:patientID/biomarker/weight', hasValidToken, getWeightLogs);
router.get('/patients/:patientID/biomarker/food', hasValidToken, getFoodLogs);
router.get('/patients/:patientID/biomarker/summary', hasValidToken, getBiomarkersSummary);

router.post('/patients/biomarker/blood-pressure', validator.validate('saveBloodPressureLog'), hasValidToken, saveBloodPressure);
router.post('/patients/biomarker/blood-glucose', validator.validate('saveBloodGlucoseLog'), hasValidToken, saveBloodGlucose);
router.post('/patients/biomarker/weight', validator.validate('saveWeightLog'), hasValidToken, saveWeight);
router.post('/patients/biomarker/food', validator.validate('saveFoodLog'), hasValidToken, saveFood);

router.get('/providers/:userID', hasValidToken, getSinglePatient);
router.get('/providers/:providerID/patients', hasValidToken, getPatientList);
router.put('/providers/:providerID', hasValidToken, editProfile);

router.get('/recipes/:recipeID', hasValidToken, getSingleRecipe);
router.get('/recipes', hasValidToken, getRecipeList);

router.get('/meal-plan/:userID', hasValidToken, getMealPlan);

module.exports = router;
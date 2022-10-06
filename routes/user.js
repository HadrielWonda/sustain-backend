const express = require('express');
const { login, signUp, resetPassword, setNewPassword } = require('../controllers/user/auth');
const { processPayments } = require('../controllers/user/webhook');
const { getPatientList, editProfile, getSinglePatient } = require('../controllers/user/user');
const { getFoodLogs, getBloodGlucoseLogs, getBloodPressureLogs, getWeightLogs, saveBloodGlucose, saveBloodPressure, saveFood, saveWeight } = require('../controllers/user/biomarkers');
const { hasValidToken } = require('../middlewares/is_auth');
const validator = require('../middlewares/validation');
const permission = require('../middlewares/permission');
const { getRecipeList, getSingleRecipe, getMealPlan } = require('../controllers/user/eat');

const router = express.Router();

router.post('/login', validator.validate('login'), login);
router.post('/signup', validator.validate('signUp'), signUp);
router.post('/forgot-password', resetPassword);
router.post('/new-password', setNewPassword);

router.post('/webhook-payments', processPayments);

router.get('/patients/:userID', hasValidToken, getSinglePatient);

router.put('/patients/:patientID', hasValidToken, editProfile);

router.get('/patients/:patientID/blood-glucose-log', hasValidToken, getBloodGlucoseLogs);
router.get('/patients/:patientID/blood-pressure-log', hasValidToken, getBloodPressureLogs);
router.get('/patients/:patientID/weight-log', hasValidToken, getWeightLogs);
router.get('/patients/:patientID/food-log', hasValidToken, getFoodLogs);

router.post('/patients/blood-pressure', validator.validate('saveBloodPressureLog'), hasValidToken, saveBloodPressure);
router.post('/patients/blood-glucose', validator.validate('saveBloodGlucoseLog'), hasValidToken, saveBloodGlucose);
router.post('/patients/weight', validator.validate('saveWeightLog'), hasValidToken, saveWeight);
router.post('/patients/food', validator.validate('saveFoodLog'), hasValidToken, saveFood);

router.get('/providers/:userID', hasValidToken, getSinglePatient);
router.get('/providers/:providerID/patients', hasValidToken, getPatientList);
router.put('/providers/:providerID', hasValidToken, editProfile);

router.get('/recipes/:recipeID', hasValidToken, getSingleRecipe);
router.get('/recipes', hasValidToken, getRecipeList);

router.get('/meal-plan/:userID', hasValidToken, getMealPlan);

module.exports = router;
const BloodGlucose = require('../../models/blood_glucose');
const BloodPressure = require('../../models/blood_pressure');
const Weight = require('../../models/weight');
const Food = require('../../models/food');
const { validationResult } = require('express-validator')

exports.getBloodGlucoseLogs = async (req, res, next) => {
    try {
        const result = await BloodGlucose.find({ userID: req.params.patientID });
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
};

exports.getBloodPressureLogs = (req, res, next) => {
    try {
        const result = BloodPressure.find({ userID: req.params.patientID });
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
};

exports.getWeightLogs = (req, res, next) => {
    try {
        const result =  Weight.find({ userID: req.params.patientID });
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
};

exports.getFoodLogs = (req, res, next) => {
    try {
        const result =  Food.find({ userID: req.params.patientID });
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
};

exports.saveBloodPressure = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    try {
        const log = new BloodPressure({
            userID: req.userID,
            systolicBloodPressure: req.body.systolic_blood_pressure,
            diastolicBloodPressure: req.body.diastolic_blood_pressure,
        });
        const result = await log.save();
        res.status(201).json({
            message: 'blood pressure logged successfully',
            data: {
                log: {
                    systolic_blood_pressure: result.systolicBloodPressure,
                    diastolic_blood_pressure: result.diastolicBloodPressure,
                }
            }
        });
    } catch (e) {
        next(e);
    }
};

exports.saveBloodGlucose = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    try {
        const log = new BloodGlucose({
            userID: req.userID,
            bloodGlucose: req.body.blood_glucose,
            context: req.body.context,
        });
        const result = await log.save();
        res.status(201).json({
            message: 'blood glucose logged successfully',
            data: {
                log: {
                    blood_glucose: result.bloodGlucose,
                    context: result.context,
                }
            }
        });
    } catch (e) {
        next(e);
    }
};

exports.saveWeight = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    try {
        const log = new Weight({
            userID: req.userID,
            weight: req.body.weight,
        });
        const result = await log.save();
        res.status(201).json({
            message: 'weight logged successfully',
            data: {
                log: {
                    weight: result.weight,
                }
            }
        });
    } catch (e) {
        next(e);
    }
};

exports.saveFood = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        });
    }
    try {
        const log = new Food({
            userID: req.userID,
            food: req.body.food,
            mealType: req.body.meal_type,
            imageURL: req.body.image_url,
        });
        const result = await log.save();
        res.status(201).json({
            message: 'food logged successfully',
            data: {
                log: {
                    food: result.food,
                    meal_type: result.mealType,
                    image_url: result.imageURL,
                }
            }
        });
    } catch (e) {
        next(e);
    }
};


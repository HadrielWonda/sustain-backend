const BloodGlucose = require('../../models/blood_glucose');
const BloodPressure = require('../../models/blood_pressure');
const Weight = require('../../models/weight');
const Food = require('../../models/food');
const { validationResult } = require('express-validator');
const file = require('../../utils/file');

exports.getBloodGlucoseLogs = async (req, res, next) => {
    try {
        const result = await BloodGlucose.find({ userID: req.params.patientID }).sort({_id: -1});
        res.status(200).send({result});
    } catch (e) {
        next(e);
    }
};

exports.getBloodPressureLogs = async (req, res, next) => {
    try {
        const result = await BloodPressure.find({ userID: req.params.patientID }).sort({_id: -1});
        res.status(200).send({result});
    } catch (e) {
        next(e);
    }
};

exports.getWeightLogs = async (req, res, next) => {
    try {
        const result = await Weight.find({ userID: req.params.patientID }).sort({_id: -1});
        res.status(200).send({result});
    } catch (e) {
        next(e);
    }
};

exports.getFoodLogs = async (req, res, next) => {
    try {
        const result = await Food.find({ userID: req.params.patientID }).sort({_id: -1});
        res.status(200).send({result});
    } catch (e) {
        next(e);
    }
};

exports.getBiomarkersSummary = async (req, res, next) => {
    try {
        const bg = await BloodGlucose.find({ userID: req.params.patientID }).sort({_id: -1}).limit(1);
        const bp = await BloodPressure.find({ userID: req.params.patientID }).sort({_id: -1}).limit(1);
        const weight = await Weight.find({ userID: req.params.patientID }).sort({_id: -1}).limit(1);
        const food = await Food.find({ userID: req.params.patientID }).sort({_id: -1}).limit(1);
        result = {
            "blood_glucose" : bg,
            "blood_pressure": bp,
            "weight" : weight,
            "food": food,
        }
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
        // TODO: check for attached image, save to s3 buckets, and get image link

        // save link in database
        const log = new Food({
            userID: req.userID,
            food: req.body.food,
            mealType: req.body.meal_type,
            imageURL: req.file,
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

        // delete image from tmp folder
        file.deleteFromTmp(req.file.filename)
    } catch (e) {
        next(e);
    }
};


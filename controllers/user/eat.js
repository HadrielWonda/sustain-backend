const Recipe = require("../../models/recipe");

exports.getRecipeList = async (req, res, next) => {
    try {
        const result = await Recipe.find();
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
};

exports.getSingleRecipe = async (req, res, next) => {
    try {
        const result = await BloodGlucose.find({ _id: req.recipeID });
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
};

exports.getMealPlan = async (req, res, next) => {
    try {
        const result = await BloodGlucose.find({ userID: req.patientID });
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
};
const User = require("../models/user");

exports.coachPermission = async (req, res, next) => {
    try {
        const result = await User.findById(req.userID);
        if (result.role === 'coach') {
            return next();
        }
        const error = new Error('user not authorized');
        error.status(403);
        throw error;
    } catch (e) {
        next(e)
    }
}

exports.doctorPermission = async (req, res, next) => {
    try {
        const result = await User.findById(req.userID);
        if (result.role === 'doctor') {
            return next();
        }
        const error = new Error('user not authorized');
        error.status(403);
        throw error;
    } catch (e) {
        next(e)
    }
}
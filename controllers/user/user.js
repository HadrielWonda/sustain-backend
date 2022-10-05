const User = require('../../models/user')

exports.getPatient = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userID);
        res.status(200).send(user);
    } catch (e) {
        e.message = 'invalid userID'
        next(e);
    }
};

exports.getPatientList = async (req, res, next) => {
    try {
        const patients = await User.findById(req.params.providerID).populate('patients');
        res.status(200).send(patients);
    } catch (e) {
        next(e);
    }
};

exports.editProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userID);
        user.bio = req.body.bio;
        await user.save();
    } catch (e) {
        e.message = 'invalid userID'
        next(e);
    }
};


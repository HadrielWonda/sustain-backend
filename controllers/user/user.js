const User = require('../../models/user')
const file = require('../../utils/file')

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
        // check for attached image, save to s3 buckets, and get image link

        // save link in database
        const user = await User.findById(req.userID);
        user.bio = req.body.bio;
        await user.save();

        // delete image from tmp folder
        file.deleteFromTmp(req.file.filename)
    } catch (e) {
        e.message = 'invalid userID'
        next(e);
    }
};


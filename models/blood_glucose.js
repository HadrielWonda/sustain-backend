const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodGlucoseSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bloodGlucose: {
        type: String,
        required: true
    }, 
    context: {
        type: String,
        required: true
    },
}, { timestamps: true });

const BloodGlucose = mongoose.model('blood_glucose_log', bloodGlucoseSchema);

module.exports = BloodGlucose;

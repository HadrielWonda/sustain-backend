const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodPressureSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    systolicBloodPressure: {
        type: String,
        required: true
    }, 
    diastolicBloodPressure: {
        type: String,
        required: true
    }, 
}, { timestamps: true });

const BloodPressure = mongoose.model('blood_pressure_log', bloodPressureSchema);

module.exports = BloodPressure;

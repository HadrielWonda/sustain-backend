const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodPressureSchema = new Schema({
    patientID: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    }, type: Date 
}, { timestamps: true });

const BloodPressure = mongoose.model('BloodPressure', bloodPressureSchema);

module.exports = BloodPressure;

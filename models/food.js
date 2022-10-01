const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    patientID: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    }, type: Date 
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

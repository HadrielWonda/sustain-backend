const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    patientID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: Object
    },
    emmergencyContact: {
        type: Object
    },
    payer: {
        type: String,
    },
    isActive: {
        type: Boolean
    },
    hasPaid: {
        type: Boolean
    },
    resetToken: {
        type: String 
    },
    resetTokenExpiration: {
        type: Date 
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

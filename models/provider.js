const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    providerID: {
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
    isActive: {
        type: Boolean
    },
    resetToken: {
        type: String 
    },
    resetTokenExpiration: {
        type: Date 
    },
}, { timestamps: true });

const Provider = mongoose.model('User', providerSchema);

module.exports = Provider;

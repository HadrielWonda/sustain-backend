const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    username: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImageURL: {
        type: String,
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
    pushToken: {
        type: String 
    },
    resetToken: {
        type: String 
    },
    resetTokenExpiration: {
        type: Date 
    },
    role: {
        type: String,
        default: 'patient',
        enum: ['patient', 'coach', 'doctor'],
        required: true 
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

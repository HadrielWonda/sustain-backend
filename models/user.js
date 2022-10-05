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
    role: {
        type: String,
        default: 'patient',
        enum: ['patient', 'coach', 'doctor'],
        required: true
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    pushToken: {
        type: String
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

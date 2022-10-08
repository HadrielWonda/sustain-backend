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
        type: Date
    },
    phone: {
        countryCode: {
            type: String
        },
        phoneNumber: {
            type: String
        },
    },
    address: {
        state: {
            type: String
        },
        country: {
            type: String
        },
    },
    diagnosis: [{
        type: String
    }],
    referrer: {
        type: String
    },
    referralID: {
        type: String
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
    hasCurrentSubscription: {
        type: Boolean,
        required: true
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
    authToken: {
        type: String,
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
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

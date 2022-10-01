const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }, 
    plan: {
        type: String,
        required: true
    }, 
    paidAt: {
        type: String,
        required: true
    }, 
    paymentMethod: {
        type: String,
        required: true
    },   
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

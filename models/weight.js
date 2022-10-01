const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weight: {
        type: String,
        required: true
    }, 
}, { timestamps: true });

const Weight = mongoose.model('weight_log', weightSchema);

module.exports = Weight;

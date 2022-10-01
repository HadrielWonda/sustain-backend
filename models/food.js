const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    food: {
        type: String,
        required: true
    }, 
    mealType: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    },
}, { timestamps: true });

const Food = mongoose.model('food_log', foodSchema);

module.exports = Food;

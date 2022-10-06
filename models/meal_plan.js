const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    days: [{
        day: {
            type: String,
            required: true
        },
        meals: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Recipe',
                required: true
            },
            mealType: {
                type: String,
                required: true
            }
        }],
    }],
}, { timestamps: true });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;

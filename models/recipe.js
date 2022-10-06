const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    mealType: [{
        type: String,
        required: true
    }],
    prepTime: {
        type: String,
        required: true
    },
    prepTimeInSeconds: {
        type: Number,
        required: true
    },
    cookTime: {
        type: String,
        required: true
    },
    cookTimeInSeconds: {
        type: Number,
        required: true
    },
    totalTime: {
        type: String,
        required: true
    },
    totalTimeInSeconds: {
        type: Number,
        required: true
    },
    numberOfServings: {
        type: Number,
        required: true
    },
    ingredients: [{
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        fullIngredient: {
            type: String,
            required: true
        }
    }],
    ingredientsCount: {
        type: Number,
        required: true
    },
    instructions: [{
        type: String,
        required: true
    }],
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

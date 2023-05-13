const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    directions: String,
    prepTime: {
        type: Number,
        min: 0
    },
    cookTime: {
        type: Number,
        min: 0
    },
    reviews: [reviewSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
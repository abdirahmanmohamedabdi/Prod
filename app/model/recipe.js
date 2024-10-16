import mongoose, { Schema } from 'mongoose';

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

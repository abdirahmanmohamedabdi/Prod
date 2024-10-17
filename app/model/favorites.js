import mongoose, { Schema } from 'mongoose';

const favoriteSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },
    recipeId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);

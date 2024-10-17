import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        required: true,
        type: String, 
    },
    email: {
        required: true,
        type: String,
        unique: true, // Ensure unique emails
    },
    password: {
        required: true,
        type: String,
    },
    favorites: {
        type: [String], // Array of recipe IDs or URIs
        default: [], // Default to an empty array
    },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);

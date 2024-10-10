import mongoose from "mongoose";

export async function connectDB() {
    try {
        let conn = await mongoose.connect(String(process.env.MONGO_DB_CONNECTION_STRING));
        return conn;
    } catch (e) {
        throw new Error(e);
    }
}
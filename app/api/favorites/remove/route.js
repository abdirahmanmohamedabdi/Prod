import { connectDB } from "@/app/lib/mongo";
import { User } from "@/app/model/user";

export const POST = async (req) => {
    const { userId, recipeId } = await req.json(); // Get userId and recipeId from request

    try {
        await connectDB(); // Connect to MongoDB

        // Update user by removing recipeId from their favorites
        await User.updateOne(
            { _id: userId },
            { $pull: { favorites: recipeId } } // Remove from favorites
        );

        return new Response(JSON.stringify({ message: 'Recipe removed from favorites' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
};

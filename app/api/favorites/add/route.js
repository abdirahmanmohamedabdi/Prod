import { connectDB } from "@/app/lib/mongo";
import { User } from "@/app/model/user";

export const POST = async (req) => {
    const { userId, recipeId } = await req.json(); 

    try {
        await connectDB(); 

    
        await User.updateOne(
            { _id: userId },
            { $addToSet: { favorites: recipeId } } 
        );

        return new Response(JSON.stringify({ message: 'Recipe added to favorites' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
};

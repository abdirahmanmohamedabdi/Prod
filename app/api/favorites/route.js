import { connectDB } from '@/app/lib/mongo';
import { User } from '@/app/model/user-model';

export async function POST(req) {
    const { userId, recipeId } = await req.json(); 

    try {
        await connectDB(); 
        
        
        await User.updateOne(
            { _id: userId },
            { $addToSet: { favorites: recipeId } } 
        );

        return new Response(JSON.stringify({ message: 'Recipe added to favorites' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to add to favorites' }), { status: 500 });
    }
}

export async function DELETE(req) {
    const { userId, recipeId } = await req.json(); 

    try {
        await connectDB(); 
        
       
        await User.updateOne(
            { _id: userId },
            { $pull: { favorites: recipeId } } 
        );

        return new Response(JSON.stringify({ message: 'Recipe removed from favorites' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to remove from favorites' }), { status: 500 });
    }
}

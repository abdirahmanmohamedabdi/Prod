import { connectDB } from '@/app/lib/mongo';
import { Favorite } from '@/app/model/favorites';

export async function POST(req) {
    const { email, recipeId } = await req.json(); 
    await connectDB();

    try {
       
        const favorite = new Favorite({ userEmail: email, recipeId });
        await favorite.save(); 

        return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (error) {
        console.error('Error adding favorite:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function DELETE(req) {
    const { email, recipeId } = await req.json();
    await connectDB();

    try {
        
        const result = await Favorite.findOneAndDelete({ userEmail: email, recipeId }); 

        if (!result) {
            return new Response(JSON.stringify({ error: 'Favorite not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error removing favorite:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email'); 

    try {
        await connectDB(); // Connect to MongoDB
        const favorites = await Favorite.find({ userEmail }); // Find all favorites for the user

        return new Response(JSON.stringify(favorites), { status: 200 });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch favorites' }), { status: 500 });
    }
}

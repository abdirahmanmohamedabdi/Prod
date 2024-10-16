import { connectDB } from "@/app/lib/mongo";
import { Recipe } from "@/app/models/recipe";

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const { id } = params; // Get the recipe ID from the URL parameters

        // Find the recipe by its ID
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return new Response(JSON.stringify({ message: 'Recipe not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(recipe), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
        });
    }
};

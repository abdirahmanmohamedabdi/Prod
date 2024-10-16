import { connectDB } from "@/app/lib/mongo";
import { Recipe } from "@/app/model/recipe";
export const POST = async (req) => {
    try {
        // Connect to the database
        await connectDB();

        // Parse form data
        const formData = await req.formData();
        const title = formData.get('title');
        const ingredients = formData.get('ingredients');
        const steps = formData.get('steps');

        // Create a new recipe
        const newRecipe = new Recipe({
            title,
            ingredients,
            steps,
        });

        // Save to the database
        await newRecipe.save();

        return new Response(JSON.stringify({ message: 'Recipe uploaded successfully' }), {
            status: 201,
        });
    } catch (error) {
        console.error('Error creating recipe:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
        });
    }
};
export const GET = async (req) => {
    try {
        await connectDB(); // Connect to MongoDB

        // Fetch all recipes from the database
        const recipes = await Recipe.find(); 

        console.log('Retrieved recipes:', recipes); // Log the retrieved recipes

        return new Response(JSON.stringify(recipes), {
            status: 200, // Return successful response
            headers: {
                'Content-Type': 'application/json', // Ensure response is JSON
            }
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json', // Ensure response is JSON
            }
        });
    }
};
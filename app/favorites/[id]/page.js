'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function FavoriteRecipeDetailPage() {
    const { id } = useParams(); // Get the dynamic recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const { data: session } = useSession(); // Get user session data

    // Fetch the recipe details when the ID is available
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log(`Fetching recipe with ID: ${id}`);
                const res = await fetch(`/api/recipes/${id}`); // Ensure you're fetching only the recipe with the specific ID
                if (!res.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await res.json();
                setRecipe(data); // Set only the fetched recipe
            } catch (error) {
                setError(error.message);
                console.error('Fetch error:', error);
            }
        };

        if (id) {
            fetchRecipe(); // Only fetch when the ID exists
        } else {
            console.log('No recipe ID found in URL');
        }
    }, [id]); // Depend on ID, so it updates correctly when the ID changes

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-font font-bold mb-4">{recipe.title}</h1>
            <img
                src={recipe.image || '/logo2.png'} // Show recipe image or fallback image
                alt={recipe.title}
                className="w-full h-48 object-contain mb-4"
            />
          <strong className='font-font'>Ingredients:</strong>
    <ul>
        {recipe.ingredients.split(',').map((ingredient, index) => (
            <li className='font-font' key={index}>{ingredient.trim()}</li>
        ))}
    </ul>
    <strong className='font-font'>Steps:</strong>
    <ol>
        {recipe.steps.split(',').map((step, index) => (
            <li className='font-font' key={index}>{step.trim()}</li>
        ))}
    </ol>
        </div>
    );
}

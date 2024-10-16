'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeDetailPage() {
    const router = useRouter();
    const [id, setId] = useState(null); // State to store the recipe ID
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    // Fetch the recipe ID from the URL query parameters
    useEffect(() => {
        if (router.isReady) {
            const queryId = router.query.id;
            console.log('Router is ready:', router.isReady); // Log router readiness
            console.log('Query ID:', queryId); // Debugging statement
            if (queryId) {
                setId(queryId);
            }
        }
    }, [router.isReady, router.query]);

    // Fetch the recipe details when the ID is available
    useEffect(() => {
        if (id) {
            console.log('ID state changed:', id); // Log ID state change
            const fetchRecipe = async () => {
                try {
                    const res = await fetch(`/api/recipes/${id}`);
                    console.log('Response Status:', res.status); // Log response status
                    if (!res.ok) {
                        throw new Error('Failed to fetch recipe');
                    }
                    const data = await res.json();
                    console.log('Fetched Recipe:', data); // Log fetched recipe data
                    setRecipe(data); // Set the recipe details
                } catch (error) {
                    console.error('Fetch Error:', error); // Log any errors
                    setError(error.message);
                }
            };

            fetchRecipe(); // Call the fetch function
        }
    }, [id]); // Run effect whenever 'id' changes

    if (error) {
        return <p className="text-red-500 font-font">Error: {error}</p>;
    }

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
            <img
                src={recipe.image || '/logo2.png'} // Show recipe image or fallback image
                alt={recipe.title}
                className="w-full h-48 object-cover mb-4"
            />
            <p className="mb-4"><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Steps:</strong> {recipe.steps}</p>
        </div>
    );
}
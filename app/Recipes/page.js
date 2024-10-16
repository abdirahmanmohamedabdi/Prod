"use client";

import { useEffect, useState } from 'react';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('/api/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();
                setRecipes(data); // Set the recipes state with the fetched data
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRecipes(); // Call the fetch function
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold font-font mb-4">Recipes</h1>
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className="border p-4 rounded shadow">
                            <a href={`/recipes/${recipe._id}`}>
                                <h2 className="text-xl font-font font-bold mb-2">{recipe.title}</h2>
                                <img
                                    src={recipe.image || '/logo2.png'} // Show recipe image or fallback image
                                    alt={recipe.title}
                                    className="w-full h-38 object-cover mb-4"
                                />
                                <p className='font-font'><strong>Ingredients:</strong> {recipe.ingredients.substring(0, 50)}...</p>
                                <p className='font-font'><strong>Steps:</strong> {recipe.steps.substring(0, 50)}...</p>
                            </a>
                            <p className="text-sm text-gray-500 font-font mt-2">Uploaded on: {new Date(recipe.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}

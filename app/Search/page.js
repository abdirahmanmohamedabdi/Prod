'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecipeSearchPage() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setRecipes([]);

        const appId = '13684d21'; 
        const appKey = 'fe7633addac715f1fac840686ec51843';
        const url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${appId}&app_key=${appKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }
            const result = await response.json();
            setRecipes(result.hits || []); 
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFavorite = async (recipeId) => {
        try {
            const res = await fetch(`/api/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId }),
            });
            if (!res.ok) {
                throw new Error('Failed to add favorite');
            }
            alert('Recipe added to favorites!');
        } catch (error) {
            console.error('Error adding favorite:', error);
            alert('Failed to add favorite');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Recipes</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.length > 0 ? (
                    recipes.map((recipeData, index) => {
                        const recipe = recipeData.recipe;
                        const recipeId = encodeURIComponent(recipe.uri);
                        return (
                            <div key={index} className="border p-4 rounded shadow">
                                <h2 className="text-xl font-bold mb-2">{recipe.label}</h2>
                                <img
                                    src={recipe.image}
                                    alt={recipe.label}
                                    className="w-full h-48 object-cover mb-4"
                                />
                                <p><strong>Ingredients:</strong> {recipe.ingredientLines.join(', ')}</p>
                                
                            </div>
                        );
                    })
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}
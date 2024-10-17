'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function FavoritesPage() {
    const { data: session } = useSession(); // Get the session data (logged-in user)
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user's favorites
    useEffect(() => {
        if (session?.user?.id) {
            const fetchFavorites = async () => {
                console.log('Fetching favorites for user ID:', session.user.id);
                
                try {
                    const response = await fetch(`/api/favorites/list?userId=${session.user.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch favorites');
                    }
                    const favoriteRecipeURIs = await response.json();
                    console.log('Favorite recipe URIs:', favoriteRecipeURIs);

                    // Check if there are any favorite URIs to fetch
                    if (favoriteRecipeURIs.length === 0) {
                        setFavorites([]); // No favorites, set an empty array
                        setLoading(false);
                        return;
                    }

                    // Fetch recipe details from Edamam API for each favorite recipe URI
                    const appId = '13684d21'; // Your Edamam Application ID
                    const appKey = 'fe7633addac715f1fac840686ec51843'; // Your Edamam Application Key

                    const recipeDetails = await Promise.all(favoriteRecipeURIs.map(async (uri) => {
                        const response = await fetch(`https://api.edamam.com/search?r=${encodeURIComponent(uri)}&app_id=${appId}&app_key=${appKey}`);
                        console.log('Fetching recipe for URI:', uri, 'Response status:', response.status);
                        if (!response.ok) {
                            throw new Error('Failed to fetch recipe details for URI: ' + uri);
                        }
                        const data = await response.json();
                        console.log('Recipe details for URI:', uri, data);
                        return data[0]; // Edamam API returns an array with one item
                    }));

                    setFavorites(recipeDetails); // Set user's favorite recipes with full details
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchFavorites(); // Fetch user's favorite recipes
        }
    }, [session?.user?.id]);

    if (loading) {
        return <p>Loading your favorite recipes...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Recipes</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((recipe, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            <Link href={`/search/${encodeURIComponent(recipe.uri)}`}>
                                <h2 className="text-xl font-bold mb-2 cursor-pointer">{recipe.label}</h2>
                            </Link>
                            <img src={recipe.image} alt={recipe.label} className="w-full h-48 object-cover mb-4" />
                            <p><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
                            <p><strong>Diet Labels:</strong> {recipe.dietLabels.join(', ') || 'N/A'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no favorite recipes yet.</p>
            )}
        </div>
    );
}

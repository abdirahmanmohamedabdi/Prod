'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function FavoriteRecipesPage() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!session?.user?.email) return;

            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/favorites?email=${session.user.email}`); 
                if (!res.ok) {
                    throw new Error('Failed to fetch favorite recipes');
                }
                const data = await res.json();
                setFavorites(data);

                
                const recipePromises = data.map(favorite => 
                    fetch(`/api/recipes/${favorite.recipeId}`)
                );
                const recipeResponses = await Promise.all(recipePromises);

               
                const detailedRecipes = await Promise.all(
                    recipeResponses.map(res => {
                        if (!res.ok) {
                            throw new Error('Failed to fetch recipe details');
                        }
                        return res.json();
                    })
                );

                setRecipeDetails(detailedRecipes);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites(); 
    }, [session]);

    if (loading) {
        return <p>Loading your favorite recipes...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold font-font mb-4">Your Favorite Recipes</h1>
            {recipeDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipeDetails.map((recipe) => (
                        <div key={recipe._id} className="border p-4 rounded shadow">
                            <Link href={`/favorites/${encodeURIComponent(recipe._id)}`}>
                                <h2 className="text-xl font-bold mb-2 font-font cursor-pointer">{recipe.title}</h2>
                            </Link>
                            <img src={recipe.image || '/logo2.png'} alt={recipe.title} className="w-full h-48 object-fit mb-4" />
                            
                           
                            <div className="flex justify-center items-center mt-4">
                            <Link
                                href={`/favorites/${encodeURIComponent(recipe._id)}`}
                                className="px-4 py-2 bg-one font-font text-white rounded"
                            >
                                View Full Recipe
                            </Link>
                        </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no favorite recipes yet.</p>
            )}
        </div>
    );
}
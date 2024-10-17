'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
export default function RecipeDetailPage() {
    const { id } = useParams(); // Get the dynamic recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession(); // Get user session data


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log(`Fetching recipe with ID: ${id}`);
                const res = await fetch(`/api/recipes/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await res.json();
                setRecipe(data);

               
                if (session?.user?.email && data && data._id) {
                    const favoriteRes = await fetch(`/api/favorites?email=${session.user.email}`);
                    const favorites = await favoriteRes.json();
                    setIsFavorited(favorites.some(favorite => favorite.recipeId === data._id));
                }
            } catch (error) {
                setError(error.message);
                console.error('Fetch error:', error);
            }
        };

        if (id) {
            fetchRecipe();
        } else {
            console.log('No recipe ID found in URL');
        }
    }, [id, session]);

 
    const toggleFavorite = async () => {
        if (!session) {
            alert('You need to be logged in to favorite recipes.');
            return;
        }

        try {
            const method = isFavorited ? 'DELETE' : 'POST'; // Add or remove favorite
            const response = await fetch(`/api/favorites`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: session.user.email, recipeId: recipe._id }), // Use email instead of userId
            });

            if (!response.ok) {
                throw new Error('Failed to update favorites');
            }

            setIsFavorited(!isFavorited); // Toggle favorite state
        } catch (error) {
            setError(error.message);
            console.error('Error updating favorite status:', error);
        }
    };

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
            <p className="mb-4 font-font"><strong >Ingredients:</strong>  <ul>
        {recipe.ingredients.split(',').map((ingredient, index) => (
            <li className='font-font' key={index}>{ingredient.trim()}</li>
        ))}
    </ul></p>
            <p className='font-font'><strong>Steps:</strong>  <ul>
        {recipe.steps.split(',').map((ingredient, index) => (
            <li className='font-font' key={index}>{ingredient.trim()}</li>
        ))}
    </ul></p>

            {/* Favorite Button */}
            

            <div className="flex justify-center items-center mt-4">
                            <button
                            onClick={toggleFavorite} 
                                href={`/favorites/${encodeURIComponent(recipe._id)}`}
                                className={`mt-4 font-font px-4 py-2 rounded ${isFavorited ? 'bg-one' : 'bg-three'} text-white`}
                            >
                                 {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                               
                            </button>
                        </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession for authentication

export default function RecipeDetailPage() {
    const { id } = useParams(); // Get the dynamic recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false); // State to track if the recipe is favorited
    const { data: session } = useSession(); // Get user session

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const appId = '13684d21'; // Your Edamam Application ID
            const appKey = 'fe7633addac715f1fac840686ec51843'; // Your Edamam Application Key
            const decodedId = decodeURIComponent(id); // Decode the recipe ID back to its original form

            const url = `https://api.edamam.com/search?r=${decodedId}&app_id=${appId}&app_key=${appKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }
                const result = await response.json();
                setRecipe(result[0]); // Set the first result as the recipe
                checkIfFavorited(result[0].uri); // Check if this recipe is favorited
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipeDetails(); // Fetch recipe details when ID is available
        }
    }, [id]);

    const checkIfFavorited = (recipeId) => {
        if (session && session.user && session.user.favorites) {
            setIsFavorited(session.user.favorites.includes(recipeId));
        }
    };

    const toggleFavorite = async () => {
        if (!session) {
            alert('You must be logged in to favorite recipes.');
            return;
        }

        const userId = session.user.id; // Assuming the user ID is stored in the session

        try {
            const response = await fetch(isFavorited ? '/api/favorites/remove' : '/api/favorites/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, recipeId: recipe.uri }),
            });

            if (!response.ok) {
                throw new Error('Failed to update favorites');
            }

            setIsFavorited(!isFavorited); // Toggle the favorite state
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!recipe) {
        return <p>No recipe found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{recipe.label}</h1>
            <img
                src={recipe.image || '/logo2.png'}
                alt={recipe.label}
                className="w-full h-64 object-cover mb-4"
            />
            <p className="mb-4"><strong>Description:</strong> {recipe.description || 'No description available'}</p>
            <p className="mb-4"><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
            <p className="mb-4"><strong>Diet Labels:</strong> {recipe.dietLabels.join(', ') || 'N/A'}</p>
            <p className="mb-4"><strong>Health Labels:</strong> {recipe.healthLabels.join(', ')}</p>
            <p className="mb-4"><strong>Ingredients:</strong> {recipe.ingredientLines.join(', ')}</p>

            {/* Favorite button */}
            <button 
                onClick={toggleFavorite} 
                className={`mt-4 px-4 py-2 rounded ${isFavorited ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
                {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View Full Instructions
            </a>
        </div>
    );
}

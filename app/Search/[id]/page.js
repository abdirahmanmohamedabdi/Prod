"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RecipeDetailPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [id, setId] = useState(null); // State to store the recipe ID
    const [recipe, setRecipe] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setLoading(true);
            setError(null);

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

        try {
            const res = await fetch(`/api/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId: recipe.uri }),
            });
            if (!res.ok) {
                throw new Error('Failed to update favorite status');
            }
            const data = await res.json();
            setIsFavorited(data.isFavorited);
        } catch (error) {
            console.error('Error updating favorite status:', error);
            alert('Failed to update favorite status');
        }
    };

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipe) {
        return <p>No recipe found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{recipe.label}</h1>
            <img
                src={recipe.image || '/logo2.png'} // Show recipe image or fallback image
                alt={recipe.label}
                className="w-full h-48 object-cover mb-4"
            />
            <p className="mb-4"><strong>Ingredients:</strong> {recipe.ingredientLines.join(', ')}</p>
            <p><strong>Steps:</strong> {recipe.steps}</p>
            <button
                onClick={toggleFavorite}
                className={`p-2 rounded mt-2 ${isFavorited ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
            >
                {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
}
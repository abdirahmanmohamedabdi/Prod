'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (session) {
                setFavorites(session.user.favorites || []);
            }
        };

        fetchFavorites();
    }, [session]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Recipes</h1>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((recipeId) => (
                        <li key={recipeId}>
                            <a href={`/search/${recipeId}`} className="text-blue-500">
                                {recipeId} {/* You can replace this with actual recipe details if available */}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no favorite recipes.</p>
            )}
        </div>
    );
}

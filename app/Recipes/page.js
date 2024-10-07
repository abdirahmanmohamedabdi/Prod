import Link from 'next/link';

const fetchRecipes = async () => {
  const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'b927733739mshbab0909e1347b4ep1c1a2fjsn652f8f4dff61', // Replace with your API key
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Fetched recipes:", data); // Log the fetched data
    return data.results; // Return the recipes
  } catch (error) {
    console.error("Error fetching recipes:", error); // Log any errors
    return [];
  }
};

export default async function RecipesPage() {
  const recipes = await fetchRecipes();

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Popular Recipes</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                  src={recipe.thumbnail_url} // Use the recipe thumbnail URL
                  alt={recipe.name} // Use the recipe name for alt text
                  className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
              </div>
              <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/recipes/${recipe.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {recipe.name} {/* Display recipe name */}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">{recipe.description || 'No description available.'}</p>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="text-sm italic text-gray-500">Preparation time: {recipe.cook_time || 'N/A'}</p> {/* Example option */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

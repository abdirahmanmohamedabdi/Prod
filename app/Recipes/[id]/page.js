// app/recipes/[id]/page.js

import { notFound } from 'next/navigation';

const fetchRecipe = async (id) => {
  const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'b927733739mshbab0909e1347b4ep1c1a2fjsn652f8f4dff61', // Replace with your API key
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
    },
  };

  try {
    console.log("Fetching recipe details from API with id:", id); // Log the id
    const res = await fetch(url, options);
    if (!res.ok) {
      console.log(`Failed to fetch recipe with id ${id}:`, res.status); // Log the response status
      return null; // Return null instead of calling notFound() here
    }

    const data = await res.json();
    console.log("Fetched recipe details:", data); // Log the fetched recipe details
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error); // Log any errors
    return null; // Return null instead of calling notFound() here
  }
};

export default async function RecipeDetail({ params }) {
  const { id } = params; // Get the dynamic id from the URL
  console.log("Fetching recipe with id:", id); // Log the id

  const recipe = await fetchRecipe(id);
  console.log("Fetched recipe:", recipe); // Log the fetched recipe

  if (!recipe) {
    console.log("Recipe not found, showing 404"); // Log if the recipe is not found
    notFound(); // Show 404 if the recipe is not found
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <img src={recipe.thumbnail_url} alt={recipe.name} className="mb-4 rounded" />
      <p>{recipe.description}</p>
      <h2 className="mt-6 text-xl font-semibold">Ingredients</h2>
      <ul className="list-disc pl-5">
        {recipe.sections[0]?.components?.map((ingredient, index) => (
          <li key={index}>{ingredient.raw_text}</li>
        ))}
      </ul>
      <h2 className="mt-6 text-xl font-semibold">Instructions</h2>
      <ol className="list-decimal pl-5">
        {recipe.instructions?.map((instruction, index) => (
          <li key={index}>{instruction.display_text}</li>
        ))}
      </ol>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: [''],
        steps: [''],
        
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    // Handle title change
    const handleTitleChange = (e) => {
        setRecipeData(prevState => ({ ...prevState, title: e.target.value }));
    };

    // Handle image file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setRecipeData(prevState => ({ ...prevState, image: file }));
    };

    // Handle ingredient change
    const handleIngredientChange = (index, value) => {
        const newIngredients = [...recipeData.ingredients];
        newIngredients[index] = value;
        setRecipeData(prevState => ({ ...prevState, ingredients: newIngredients }));
    };

    // Handle step change
    const handleStepChange = (index, value) => {
        const newSteps = [...recipeData.steps];
        newSteps[index] = value;
        setRecipeData(prevState => ({ ...prevState, steps: newSteps }));
    };

    // Add new ingredient field
    const addIngredientField = () => {
        setRecipeData(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, '']
        }));
    };

    // Remove ingredient field
    const removeIngredientField = (index) => {
        const newIngredients = [...recipeData.ingredients];
        newIngredients.splice(index, 1);
        setRecipeData(prevState => ({ ...prevState, ingredients: newIngredients }));
    };

    // Add new step field
    const addStepField = () => {
        setRecipeData(prevState => ({
            ...prevState,
            steps: [...prevState.steps, '']
        }));
    };

    // Remove step field
    const removeStepField = (index) => {
        const newSteps = [...recipeData.steps];
        newSteps.splice(index, 1);
        setRecipeData(prevState => ({ ...prevState, steps: newSteps }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', recipeData.title);
        formData.append('ingredients', recipeData.ingredients.join(', '));
        formData.append('steps', recipeData.steps.join(', '));
        
        if (recipeData.image) {
            formData.append('image', recipeData.image); // Appending the image file
        }

        try {
            const res = await fetch('/api/recipes', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || 'Failed to upload recipe');
            }

            setSuccess('Recipe uploaded successfully!');
            router.push('/recipes');
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-font font-bold mb-4">Upload a Recipe</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-font">Title</label>
                    <input
                        type="text"
                        value={recipeData.title}
                        onChange={handleTitleChange}
                        className="border font-font p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block font-font">Ingredients</label>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                className="border font-font p-2 w-full"
                                required
                            />
                            <button type="button" onClick={() => removeIngredientField(index)} className="bg-red-500 font-font text-white p-2 rounded">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredientField} className="bg-two text-white font-font p-2 rounded">Add Ingredient</button>
                </div>

                <div>
                    <label className="block font-font">Steps</label>
                    {recipeData.steps.map((step, index) => (
                        <div key={index} className="flex space-x-2 font-font mb-2">
                            <input
                                type="text"
                                value={step}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                                className="border font-font p-2 w-full"
                                required
                            />
                            <button type="button" onClick={() => removeStepField(index)} className="bg-red-500 font-font text-white p-2 rounded">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addStepField} className="bg-two text-white p-2 font-font rounded">Add Step</button>
                </div>

<div className="flex justify-center mt-4">
                <button type="submit" className="bg-one text-white  font-font p-2 rounded">Submit</button>
                </div>
            </form>
        </div>
    );
}

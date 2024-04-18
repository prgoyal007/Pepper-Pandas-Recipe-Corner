import './saved-recipes.css';
import '../components/Modals/recipeModal.css'
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import React, { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID.js';
import axios from 'axios';
import { RecipeModalLocal } from '../components/Modals/recipeModalLocal.js';
import { RecipeEditModal } from '../components/Modals/recipeEditModal.js';
import GroceryList from '../components/grocerylist';


export const SavedRecipes = () => {
    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
                </div>
                <h1> Pepper's Favorite </h1>
            </header>

            <section className="my-recipes">
                <GroceryList />
                <SavedRecipesForm />
            </section>

            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>    
        </div>
    );
};

const SavedRecipesForm = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);    
    const [isUpdating, setIsUpdating] = useState(null); 
    const [updatedData, setUpdatedData] = useState({ 
        title: '' ,
        image: '',
        servings: 0,
        readyInMinutes: 0,
        sourceURL:'',
        cuisines: [],
        diets: [],
        instructions: '',
        extendedIngredients: [],
    });

    const userID = userGetUserID();

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSavedRecipe();
    }, [userID]);

    const startUpdating = (recipe) => {
        setIsUpdating(recipe._id);
        setUpdatedData({
            title: recipe.title,
            image: recipe.image,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            sourceURL: recipe.sourceURL,
            cuisines: [...recipe.cuisines],
            diets: [...recipe.diets],
            instructions: [...recipe.instructions],
            extendedIngredients: [...recipe.extendedIngredients],
        });
    };

    const deleteRecipe = async (recipeID) => {
        try {
            await axios.delete("http://localhost:3000/recipes/deletedRecipes", { data: { recipeID, userID } });
            setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeID));
            alert("Recipe Successfully Deleted!"); 
        } catch (err) {
            console.log(err);
        }
    };
      
    const updateRecipe = async (recipeID, updatedData) => {
        try {
            const response = await axios.patch("http://localhost:3000/recipes/updatedRecipes", { 
                recipeID: recipeID, 
                userID: userID, 
                updatedData: updatedData 
            });
            
            const updatedRecipes = savedRecipes.map(
                recipe => recipe._id === recipeID ? response.data.recipe : recipe
            );
    
            setSavedRecipes(updatedRecipes);
            setIsUpdating(null);
            alert("Recipe Updated!");
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setIsUpdating(null);
    }

    //checks if user is owner of recipe
    const isOwner = (recipe) => recipe.userOwner === userID;

    return (
        <ul>
            {savedRecipes.map((recipe) => (
                <li key={recipe._id}>
                    <div className="front-recipe-display">
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title}></img>
                    </div>

                    <div className="buttons">
                        <RecipeModalLocal
                            recipeKey = {recipe}
                        />

                        {isOwner(recipe) && (
                            <button className='auth-button' onClick={() => startUpdating(recipe)}>Edit Recipe</button>
                        )}

                        <button className='auth-button' onClick={() => deleteRecipe(recipe._id)}>Delete Recipe</button>
                    </div>

                    {isUpdating === recipe._id && (
                        <RecipeEditModal
                            recipe = {recipe}
                            onUpdate = {(updatedRecipeData) => updateRecipe(recipe._id, updatedRecipeData)}
                            onClose = {handleClose}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SavedRecipes;
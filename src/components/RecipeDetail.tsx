import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { Recipe } from "../types/types"
import axios from 'axios'
import "../styles/recipeDetail.css"

export default function RecipeDetail() {

    const params = useParams();
    const [recipe, setRecipe] = useState<Recipe>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");

    const url = "https://dummyjson.com/recipes/" + params.id;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setRecipe(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setLoading(false);
            }) 
    }, [])

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {recipe &&
                <>
                    <h2 className="page-header">{recipe.name}</h2>
                    <div className="recipe-detail-wrapper">
                        <div className="recipe-details">
                            <div className="meta-card-wrapper">
                                <div className="meta-card">
                                    <span className="meta-title">Servings</span>
                                    <span className="meta-value">{recipe.servings}</span>
                                </div>
                                <div className="meta-card">
                                    <span className="meta-title">Prep Time</span>
                                    <span className="meta-value">{recipe.prepTimeMinutes} minutes</span>
                                </div>
                                <div className="meta-card">
                                    <span className="meta-title">Cook Time</span>
                                    <span className="meta-value">{recipe.cookTimeMinutes} minutes</span>
                                </div>
                                <div className="meta-card">
                                    <span className="meta-title">Calories/Serving</span>
                                    <span className="meta-value">{recipe.caloriesPerServing} kcal</span>
                                </div>
                                <div className="meta-card">
                                    <span className="meta-title">Cuisine</span>
                                    <span className="meta-value">{recipe.cuisine}</span>
                                </div>
                                <div className="meta-card">
                                    <span className="meta-title">Difficulty</span>
                                    <span className="meta-value">{recipe.difficulty}</span>
                                </div>
                            </div>
                            <div className="ingredients-wrapper">
                                <h3>Ingredients:</h3>
                                <ol>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className="instructions-wrapper">
                                <h3>Instructions:</h3>
                                <ol>
                                    {recipe.instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        <img className="recipe-image" src={recipe.image}/>
                    </div>
                </>
            }
        </>
    )
}
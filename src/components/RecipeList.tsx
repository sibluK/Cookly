import useRecipeApi from "../hooks/useRecipeApi";
import { Recipe, FavoriteEntry } from "../types/types";
import RecipeCard from "./RecipeCard";
import "../styles/recipeList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserProvider";

export default function RecipeList() {

    const [limit, setLimit] = useState<number>(10);
    const { data, loading, error } = useRecipeApi({ limit });
    const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteEntry[]>([]);

    const { user } = useUser();

    useEffect(() => {
        if (user?.id) {
            axios.get(`http://localhost:3000/favorite-recipes`, {
                params: {
                    userId: user.id
                }
            })
            .then(response => {
                setFavoriteRecipes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [user, limit]);

    function LoadMoreRecipes() {
        setLimit(limit + 10);
    }

    return (
        <>
            <h2 className="page-header">Recipes</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error...</p>}
            <div className="recipe-list">
                {!loading
                ? data?.map((recipe: Recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} favoriteRecipes={favoriteRecipes} setFavoriteRecipes={setFavoriteRecipes}/>
                ))
                : null}
            </div>
            <div className="load-more-button" onClick={LoadMoreRecipes}>Load More</div>
        </>
    );
}

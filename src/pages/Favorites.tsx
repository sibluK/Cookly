import axios from "axios";
import { useState, useEffect } from "react";
import { FavoriteEntry } from "../types/types";
import RecipeCard from "../components/RecipeCard";
import '../styles/recipeList.css';
import { useUser } from "../context/UserProvider";

export default function Favorites() {

    const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

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
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        }
    }, [user]);


    return (
        <>
            <h2 className="page-header">Favorite Recipes</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error...</p>}
            <div className="recipe-list">
                {favoriteRecipes.map((recipe: FavoriteEntry) => (
                    <RecipeCard key={recipe.id} recipe={recipe.recipe} favoriteRecipes={favoriteRecipes} setFavoriteRecipes={setFavoriteRecipes}></RecipeCard>
                )
                )}
            </div>
        </>
    )
}
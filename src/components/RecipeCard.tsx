import { Recipe, FavoriteEntry } from "../types/types";
import '../styles/recipeCard.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useUser } from "../context/UserProvider";

export default function RecipeCard({recipe, favoriteRecipes, setFavoriteRecipes} : {recipe: Recipe, favoriteRecipes: FavoriteEntry[], setFavoriteRecipes: React.Dispatch<React.SetStateAction<FavoriteEntry[]>>}) {

    const navigate = useNavigate();
    const { user } = useUser()

    function HandleRecipeClick() {
        navigate(`/recipe/${recipe.id}`);
    }

    function HandleFavoriteButton() {

        if (!isFavorited()) {
            axios.post('http://localhost:3000/favorite-recipes', {userId: user?.id, recipe: recipe })
            .then((response) => {
                const newFavorite = response.data;
                setFavoriteRecipes([...favoriteRecipes, newFavorite]);
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            const favorite = favoriteRecipes.find(fav => fav.recipe.id === recipe.id && fav.userId === user?.id);
            axios.delete(`http://localhost:3000/favorite-recipes/${favorite?.id}`)
            .then(() => {
                setFavoriteRecipes(favoriteRecipes.filter(fav => fav.recipe.id !== recipe.id));
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    function isFavorited() {
        return favoriteRecipes.some(fav => fav.recipe.id === recipe.id && fav.userId === user?.id);
    }

    return (
        <div className="recipe-card" >
            <img src={recipe.image} onClick={HandleRecipeClick}/>
            <div className="recipe-information">
                <div className="recipe-tags">
                    {recipe.tags.map((tag, index) => (
                        <span className="tag" key={index}>{tag}</span>
                    ))}
                </div>
                <span className="name" onClick={HandleRecipeClick}>{recipe.name}</span>
                <div className="recipe-feedback">
                    <span className="rating">{recipe.rating}</span>
                    <span className="review-count">{recipe.reviewCount} ratings</span>
                </div>
            </div>
            <div className={`favorite-button-wrapper ${isFavorited() ? "favorited" : ""}`} onClick={HandleFavoriteButton}>
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#FFA500"/> </g>
                    </svg>
            </div>
        </div>
    )
}
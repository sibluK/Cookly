import { useState, useEffect } from 'react';
import axios from 'axios';
import { Recipe } from '../types/types';

interface RecipeApiProps {
    limit: number;
}

export default function useRecipeApi({limit} : RecipeApiProps) {
    const [data, setData] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const url = "https://dummyjson.com/recipes?limit=" + limit;

    useEffect(() => {
        axios.get(url)
            .then(respose => {
                setData(respose.data.recipes);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            }
    )}, [limit]);


    return { data, loading, error };

}


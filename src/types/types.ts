export type Recipe = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
};

export type User = {
    id: string;
    username: string;
} | null;

export type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    logout: () => void;
    isAuthenticated: boolean;
};

export type FavoriteEntry = {
    id: string; 
    userId: string
    recipe: Recipe;
};

// src/pages/SavedRecipes.js
import RecipeCardAll from "../components/RecipeCardAll";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SavedRecipes() {

    const [recipes, setRecipes] = useState([]);
    //const location = useLocation();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log("Fetching recipes");
                const response = await axios.get(`http://locahost:5000/api/recipes/saved`);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="bg-[#C3B9AB]">
            <div className="animate-fade-in">
                <Navbar />
                <div className="flex flex-row justify-evenly items-center flex-wrap gap-x-1 gap-y-4 mt-16 mx-16">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe, i) => <RecipeCardAll key={i} recipe={recipe} />)
                ) : (
                    <p>No recipes found</p>
                )}
                </div>
            </div>
        </div>
    );
}

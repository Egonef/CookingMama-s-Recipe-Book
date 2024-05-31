// src/pages/SearchResults.js
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
    const query = useQuery();
    const searchTerm = query.get('ingredients');
   // const searchTerm =query;
   console.log(searchTerm); 
    const [recipes, setRecipes] = useState([]);
    //const location = useLocation();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/ingredients?ingredients=${searchTerm}`);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, [searchTerm]);

    return (
        <div className="bg-[#C3B9AB]">
            <div className="animate-fade-in">
                <Navbar />
                <div className="flex flex-row justify-evenly items-center flex-wrap gap-x-1 gap-y-4 mt-16 mx-16">
                    {recipes.length > 0 ? (
                        recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)
                    ) : (
                        <p>No recipes found</p>
                    )}
                </div>
            </div>
        </div>
    );
}


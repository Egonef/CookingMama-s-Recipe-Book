import Navbar from "./../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import Searchbar from "../components/Searchbar";
import recipeData from "../components/dabate.json";
import { useState , useEffect } from "react";
import axios from 'axios';


export default function RecipesHome() {

    const [numRecipes , setNumRecipes] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/ingredients?ingredients=${searchTerm}`);
                setFilteredRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
    
        if (searchTerm) {
            fetchRecipes();
        } else {
            // Si no hay término de búsqueda, puedes mostrar todas las recetas o limpiar la lista
            setFilteredRecipes([]);
        }
    }, [searchTerm]);

    return (
        <div className="bg-[#C3B9AB]">
            <div className=" animate-fade-in">
                <Navbar />
                <div className="flex flex-row items-center justify-left mx-16">
                <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className="flex flex-row justify-evenly items-center flex-wrap gap-x-1 gap-y-4 mt-16 mx-16">
                    {filteredRecipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)}
                </div>
            </div>
        </div>
    );
}